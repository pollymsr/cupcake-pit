
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  return (
    <motion.div 
      className="flex items-center justify-between p-3 mb-2 bg-white/80 backdrop-blur-sm rounded-lg shadow"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center">
        <div className="w-12 h-12 mr-3">
          {item.image === "vanilla" && (
            <img  alt="Vanilla cupcake" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1687541127352-7744573b5483" />
          )}
          {item.image === "chocolate" && (
            <img  alt="Chocolate cupcake" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1631297585783-0175a449184a" />
          )}
          {item.image === "berry" && (
            <img  alt="Berry cupcake" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e" />
          )}
          {item.image === "rainbow" && (
            <img  alt="Rainbow cupcake" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1572451479139-6a308211d8be" />
          )}
          {item.image === "lemon" && (
            <img  alt="Lemon cupcake" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1585419960184-2bb0a62a6c36" />
          )}
          {item.image === "caramel" && (
            <img  alt="Caramel cupcake" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1698126216566-8fff1a16c742" />
          )}
        </div>
        <div>
          <h3 className="font-bold text-sm">{item.name}</h3>
          <p className="text-pink-600 text-sm">R$ {item.price.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-7 w-7 rounded-full"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <span className="mx-2 font-bold">{item.quantity}</span>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-7 w-7 rounded-full"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 ml-2 text-red-500"
          onClick={() => removeFromCart(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default CartItem;
