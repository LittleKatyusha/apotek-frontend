// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import DaftarObat from './pages/DaftarObat.jsx';
import DetailObat from './pages/DetailObat.jsx';
import Keranjang from './pages/Keranjang.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilPage from './pages/ProfilPage.jsx';
import ProdukPage from './pages/ProdukPage.jsx';
import KonsultasiPage from './pages/KonsultasiPage.jsx';
import TentangKamiPage from './pages/TentangKamiPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import RiwayatPesananPage from './pages/RiwayatPesananPage.jsx';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Rute Publik */}
          <Route path="/" element={<DaftarObat />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/obat/:id" element={<DetailObat />} />
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/produk" element={<ProdukPage />} />
          <Route path="/konsultasi" element={<KonsultasiPage />} />
          <Route path="/tentang-kami" element={<TentangKamiPage />} />
          
          {/* Rute Terproteksi */}
          <Route path="/profil" element={<ProtectedRoute><ProfilPage /></ProtectedRoute>} />
          <Route path="/riwayat-pesanan" element={<ProtectedRoute><RiwayatPesananPage /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;