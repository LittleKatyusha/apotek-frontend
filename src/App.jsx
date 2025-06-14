import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

import DaftarObat from './pages/DaftarObat';
import DetailObat from './pages/DetailObat';
import Keranjang from './pages/Keranjang';
import Footer from './components/Footer';
import { CartContext } from './context/CartContext';
import './App.css';

// src/App.jsx

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="app-header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">ApotekSehat</Link>

          {/* === UBAH BAGIAN INI === */}
          <nav className="nav-links">
            <Link to="/">Beranda</Link>
            <Link to="/produk">Produk</Link>
            <Link to="/konsultasi">Konsultasi</Link>
            <Link to="/tentang-kami">Tentang Kami</Link>
          </nav>

          <Link to="/keranjang" className="cart-button">
            <FaShoppingCart style={{ marginRight: '8px' }} />
            <span>{totalItems}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

// ... sisa kode App.jsx tetap sama

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<DaftarObat />} />
          <Route path="/obat/:id" element={<DetailObat />} />
          <Route path="/keranjang" element={<Keranjang />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;