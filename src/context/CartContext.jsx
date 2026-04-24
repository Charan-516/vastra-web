import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('vastra_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('vastra_cart', JSON.stringify(cart));
  }, [cart]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product, size) => {
    if (!size) {
      toast.error("Please select a size");
      return false;
    }
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => item.id === product.id && item.size === size 
          ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
    toast.success("Added to bag");
    openCart(); // Auto open cart on add
    return true;
  };

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
    toast.success("Removed from bag");
  };

  const updateQuantity = (id, size, qty) => {
    if (qty < 1) return;
    setCart(prev => prev.map(item => (item.id === id && item.size === size) ? { ...item, quantity: qty } : item));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      cartTotal, cartCount, isCartOpen, openCart, closeCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
