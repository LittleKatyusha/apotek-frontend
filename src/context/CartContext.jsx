// src/context/CartContext.jsx
import React, { createContext, useState } from 'react';

// 1. Membuat Context-nya
export const CartContext = createContext();

// 2. Membuat Provider (Penyedia Data)
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fungsi untuk menambah item ke keranjang
  const addToCart = (item) => {
    setCartItems(prevItems => {
      // Cek apakah item sudah ada di keranjang
      const isItemInCart = prevItems.find(cartItem => cartItem.id === item.id);

      if (isItemInCart) {
        // Jika sudah ada, tambah quantity-nya
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Jika belum ada, tambahkan item baru dengan quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    alert(`${item.nama_obat} telah ditambahkan ke keranjang!`);
  };

  // Fungsi untuk menghapus item dari keranjang
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };


  // 3. Menyediakan data dan fungsi ke seluruh aplikasi
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};