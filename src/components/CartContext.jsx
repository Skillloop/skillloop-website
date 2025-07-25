import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

const addToCart = (item) => {
  const cartItemWithUniqueId = { ...item, cartItemId: Date.now() + Math.random() };
  setCartItems((prev) => [...prev, cartItemWithUniqueId]);
};


 const removeFromCart = (cartItemId) => {
  setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
};


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
