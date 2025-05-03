
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';

// Pages
import HomePage from '@/pages/HomePage';
import MenuPage from '@/pages/MenuPage';
import CheckoutPage from '@/pages/CheckoutPage';
import TrackingPage from '@/pages/TrackingPage';

// Context
import { CartProvider } from '@/context/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
          </Routes>
        </AnimatePresence>
        <Toaster />
      </CartProvider>
    </Router>
  );
}

export default App;
