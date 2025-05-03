
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cupcakeCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cupcakeCart', JSON.stringify(cart));
    
    // Calculate total
    const newTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
  }, [cart]);

  const addToCart = (cupcake) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(item => item.id === cupcake.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        return updatedCart;
      } else {
        // Item doesn't exist, add new item
        return [...prevCart, { ...cupcake, quantity: 1 }];
      }
    });
    
    toast({
      title: "Adicionado ao carrinho",
      description: `${cupcake.name} foi adicionado ao seu carrinho!`,
      duration: 2000,
    });
  };

  const removeFromCart = (cupcakeId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== cupcakeId));
    
    toast({
      title: "Item removido",
      description: "Item removido do carrinho",
      duration: 2000,
    });
  };

  const updateQuantity = (cupcakeId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cupcakeId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === cupcakeId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
