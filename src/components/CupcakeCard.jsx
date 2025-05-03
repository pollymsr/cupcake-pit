
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

const CupcakeCard = ({ cupcake }) => {
  const { addToCart } = useCart();
  
  return (
    <motion.div 
      className="cupcake-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 flex flex-col items-center">
        <div className="w-32 h-32 mb-2">
          {cupcake.image === "vanilla" && (
            <img  alt="Vanilla cupcake" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1687541127352-7744573b5483" />
          )}
          {cupcake.image === "chocolate" && (
            <img  alt="Chocolate cupcake" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1631297585783-0175a449184a" />
          )}
          {cupcake.image === "berry" && (
            <img  alt="Berry cupcake" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1494380400276-236635e500c5" />
          )}
          {cupcake.image === "rainbow" && (
            <img  alt="Rainbow cupcake" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1572451479139-6a308211d8be" />
          )}
          {cupcake.image === "lemon" && (
            <img  alt="Lemon cupcake" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1585419960184-2bb0a62a6c36" />
          )}
          {cupcake.image === "caramel" && (
            <img  alt="Caramel cupcake" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1698126216566-8fff1a16c742" />
          )}
        </div>
        
        <h3 className="text-lg font-bold text-center">{cupcake.name}</h3>
        <p className="text-pink-600 font-bold mb-2">R$ {cupcake.price.toFixed(2)}</p>
        
        <Button 
          onClick={() => addToCart(cupcake)}
          className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-full px-4 py-2 text-sm"
        >
          Adicionar ao carrinho
        </Button>
      </div>
    </motion.div>
  );
};

export default CupcakeCard;
