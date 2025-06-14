// File: src/components/Header.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext.jsx';

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="app-header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">ApotekSehat</Link>

          <nav className="nav-links">
            <Link to="/">Beranda</Link>
            <Link to="/produk">Produk</Link>
            <Link to="/konsultasi">Konsultasi</Link>
            <Link to="/tentang-kami">Tentang Kami</Link>
          </nav>

          {/* === BAGIAN BARU UNTUK TOMBOL AKSI === */}
          <div className="header-actions">
            <Link to="/login" className="btn-login">Login</Link>
            <Link to="/register" className="btn-register">Daftar</Link>
            <Link to="/keranjang" className="cart-button">
              <FaShoppingCart />
              <span>{totalItems}</span>
            </Link>
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;