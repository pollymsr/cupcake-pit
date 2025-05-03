
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';

const HomePage = () => {
  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <img  alt="Unicorn cupcake mascot" className="w-64 h-64 mx-auto" src="https://images.unsplash.com/photo-1672442258320-e13f96dd190d" />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-2 text-pink-500">Polly's</h1>
          <h2 className="text-3xl font-bold mb-8 text-amber-500">Sweet Cupcakes</h2>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/menu">
              <Button className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-900 font-bold text-lg px-8 py-6 rounded-full shadow-lg">
                Ver Cardápio
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-0 left-0 w-full overflow-hidden"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="w-full h-24 bg-gradient-to-t from-pink-200/50 to-transparent" />
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default HomePage;
