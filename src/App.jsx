import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import DaftarObat from './pages/DaftarObat.jsx';
import DetailObat from './pages/DetailObat.jsx';
import Keranjang from './pages/Keranjang.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<DaftarObat />} />
          <Route path="/obat/:id" element={<DetailObat />} />
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;