
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import CupcakeCard from '@/components/CupcakeCard';
import PageTransition from '@/components/PageTransition';
import { useCart } from '@/context/CartContext';
import { cupcakes } from '@/data/cupcakes';

const MenuPage = () => {
  const { cart, total } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <PageTransition>
      <div className="pb-20">
        <header className="sticky top-0 z-10 bg-gradient-to-r from-pink-400 to-purple-400 text-white p-4 shadow-md">
          <div className="flex justify-between items-center">
            <Link to="/">
              <h1 className="text-2xl font-bold">Polly's Sweet Cupcakes</h1>
            </Link>
            <Link to="/checkout">
              <Button variant="secondary" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </header>
        
        <main className="p-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Nossos Cupcakes</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence>
              {cupcakes.map((cupcake) => (
                <CupcakeCard key={cupcake.id} cupcake={cupcake} />
              ))}
            </AnimatePresence>
          </div>
        </main>
        
        {totalItems > 0 && (
          <motion.div 
            className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg rounded-t-xl border-t border-pink-200"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">{totalItems} itens</p>
                <p className="font-bold text-pink-600">R$ {total.toFixed(2)}</p>
              </div>
              <Link to="/checkout">
                <Button className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600">
                  Finalizar Pedido
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
};

export default MenuPage;
