// src/components/Header.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { CartContext } from '../context/CartContext.jsx';

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('auth_user');
    if (userDataString) {
      setUser(JSON.parse(userDataString));
    }
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null); 
    navigate('/login');
  };

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
          <div className="header-actions">
            {user ? (
              <div className="user-menu">
                <Link to="/profil" className="user-profile-link">
                  <FaUserCircle />
                  <span>Halo, {user.name.split(' ')[0]}</span>
                </Link>
                <Link to="/riwayat-pesanan" className="nav-history">Riwayat</Link>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-login">Login</Link>
                <Link to="/register" className="btn-register">Daftar</Link>
              </>
            )}
            <Link to="/keranjang" className="cart-button">
              <FaShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;