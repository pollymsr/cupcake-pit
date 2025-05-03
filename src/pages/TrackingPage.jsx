
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

const TrackingPage = () => {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('baking');
  
  useEffect(() => {
    // Get the most recent order from localStorage
    const orders = JSON.parse(localStorage.getItem('cupcakeOrders') || '[]');
    if (orders.length > 0) {
      const latestOrder = orders[orders.length - 1];
      setOrder(latestOrder);
      setStatus(latestOrder.status);
      
      // Simulate order progress
      const timer1 = setTimeout(() => {
        setStatus('on-the-way');
        
        // Update in localStorage
        const updatedOrders = orders.map((o, index) => {
          if (index === orders.length - 1) {
            return { ...o, status: 'on-the-way' };
          }
          return o;
        });
        localStorage.setItem('cupcakeOrders', JSON.stringify(updatedOrders));
      }, 5000);
      
      const timer2 = setTimeout(() => {
        setStatus('delivered');
        
        // Update in localStorage
        const updatedOrders = orders.map((o, index) => {
          if (index === orders.length - 1) {
            return { ...o, status: 'delivered' };
          }
          return o;
        });
        localStorage.setItem('cupcakeOrders', JSON.stringify(updatedOrders));
      }, 10000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, []);
  
  return (
    <PageTransition>
      <header className="sticky top-0 z-10 bg-gradient-to-r from-pink-400 to-purple-400 text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/menu">
              <Button variant="ghost" size="icon" className="mr-2 text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Acompanhar Pedido</h1>
          </div>
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-white">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md mb-6">
          <div className="mb-8">
            <img  alt="Delivery truck with cupcakes" className="w-full h-48 object-contain" src="https://images.unsplash.com/photo-1563778084459-859099e48677" />
          </div>
          
          <h2 className="text-xl font-bold mb-6 text-center">Status do Pedido</h2>
          
          <div className="relative mb-8">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
            
            <div className="relative flex justify-between">
              <div className="flex flex-col items-center">
                <motion.div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                    status === 'baking' || status === 'on-the-way' || status === 'delivered'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-200'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: status === 'baking' ? [1, 1.2, 1] : 1 }}
                  transition={{ repeat: status === 'baking' ? Infinity : 0, duration: 1 }}
                >
                  <span className="text-sm">1</span>
                </motion.div>
                <span className="text-xs mt-1 font-medium">Preparando</span>
              </div>
              
              <div className="flex flex-col items-center">
                <motion.div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                    status === 'on-the-way' || status === 'delivered'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-200'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: status === 'on-the-way' ? [1, 1.2, 1] : 1 }}
                  transition={{ repeat: status === 'on-the-way' ? Infinity : 0, duration: 1 }}
                >
                  <span className="text-sm">2</span>
                </motion.div>
                <span className="text-xs mt-1 font-medium">A caminho</span>
              </div>
              
              <div className="flex flex-col items-center">
                <motion.div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                    status === 'delivered'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-200'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: status === 'delivered' ? [1, 1.2, 1] : 1 }}
                  transition={{ repeat: status === 'delivered' ? 3 : 0, duration: 0.5 }}
                >
                  <span className="text-sm">3</span>
                </motion.div>
                <span className="text-xs mt-1 font-medium">Entregue</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            {status === 'baking' && (
              <p className="text-gray-600">Seus cupcakes estão sendo preparados com muito carinho! 🧁</p>
            )}
            {status === 'on-the-way' && (
              <p className="text-gray-600">Seus cupcakes estão a caminho! Fique atento(a)! 🚚</p>
            )}
            {status === 'delivered' && (
              <p className="text-gray-600">Seus cupcakes foram entregues! Aproveite! 😋</p>
            )}
          </div>
        </div>
        
        {order && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
            <h3 className="font-bold mb-2">Detalhes do Pedido</h3>
            <p className="text-sm text-gray-600 mb-1">Pedido #{order.id.slice(-4)}</p>
            <p className="text-sm text-gray-600 mb-3">
              {new Date(order.date).toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            
            <div className="border-t border-gray-200 pt-3">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span className="text-sm">{item.quantity}x {item.name}</span>
                  <span className="text-sm">R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <div className="border-t border-gray-200 pt-2 mt-2 font-bold flex justify-between">
                <span>Total</span>
                <span>R$ {order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </PageTransition>
  );
};

export default TrackingPage;
