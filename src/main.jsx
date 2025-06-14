// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartContext'; // <-- IMPORT PROVIDER

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>  {/* BUNGKUS APLIKASI DI SINI */}
      <App />
    </CartProvider>
  </React.StrictMode>,
);