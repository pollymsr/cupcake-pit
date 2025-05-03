
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard } from 'lucide-react';
import CartItem from '@/components/CartItem';
import PageTransition from '@/components/PageTransition';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';

const CheckoutPage = () => {
  const { cart, total, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  
  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione alguns cupcakes antes de finalizar o pedido",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate order processing
    toast({
      title: "Pedido recebido!",
      description: "Seu pedido está sendo preparado",
    });
    
    // Save order to localStorage
    const order = {
      id: Date.now().toString(),
      items: cart,
      total,
      status: "baking",
      date: new Date().toISOString(),
      paymentMethod
    };
    
    const orders = JSON.parse(localStorage.getItem('cupcakeOrders') || '[]');
    orders.push(order);
    localStorage.setItem('cupcakeOrders', JSON.stringify(orders));
    
    // Clear cart and redirect to tracking page
    clearCart();
    navigate('/tracking');
  };
  
  return (
    <PageTransition>
      <header className="sticky top-0 z-10 bg-gradient-to-r from-pink-400 to-purple-400 text-white p-4 shadow-md">
        <div className="flex items-center">
          <Link to="/menu">
            <Button variant="ghost" size="icon" className="mr-2 text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Checkout</h1>
        </div>
      </header>
      
      <main className="p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md mb-6">
          <h2 className="text-lg font-bold mb-4">Resumo do Pedido</h2>
          
          {cart.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
              <Link to="/menu">
                <Button>Ver Cardápio</Button>
              </Link>
            </div>
          ) : (
            <AnimatePresence>
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </AnimatePresence>
          )}
          
          {cart.length > 0 && (
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md mb-6">
              <h2 className="text-lg font-bold mb-4">Método de Pagamento</h2>
              
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  className={`p-3 rounded-xl border-2 flex items-center justify-center ${
                    paymentMethod === 'credit' 
                      ? 'border-pink-500 bg-pink-50' 
                      : 'border-gray-200'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentMethod('credit')}
                >
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-r from-pink-400 to-pink-600 text-white p-2 rounded-lg mb-2">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">Cartão de Crédito</span>
                  </div>
                </motion.button>
                
                <motion.button
                  className={`p-3 rounded-xl border-2 flex items-center justify-center ${
                    paymentMethod === 'pix' 
                      ? 'border-pink-500 bg-pink-50' 
                      : 'border-gray-200'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentMethod('pix')}
                >
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-2 rounded-lg mb-2">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4L4 12L12 20L20 12L12 4Z" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">PIX</span>
                  </div>
                </motion.button>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mb-6"
            >
              <Button 
                className="w-full bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white py-6 text-lg font-bold rounded-xl shadow-lg"
                onClick={handlePlaceOrder}
              >
                Finalizar Pedido
              </Button>
            </motion.div>
          </>
        )}
      </main>
    </PageTransition>
  );
};

export default CheckoutPage;
