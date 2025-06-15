import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layouts
import AdminLayout from './layouts/AdminLayout.jsx';
import UserLayout from './layouts/UserLayout.jsx';

// Import Komponen Keamanan
import AdminRoute from './components/AdminRoute.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Import Semua Halaman
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
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx';
import AdminProdukPage from './pages/admin/AdminProdukPage.jsx';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* GRUP RUTE ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="produk" element={<AdminProdukPage />} />
          {/* Tambahkan rute admin lainnya di sini */}
        </Route>

        {/* GRUP RUTE PENGGUNA BIASA */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<DaftarObat />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="produk" element={<ProdukPage />} />
          <Route path="obat/:id" element={<DetailObat />} />
          <Route path="keranjang" element={<Keranjang />} />
          <Route path="konsultasi" element={<KonsultasiPage />} />
          <Route path="tentang-kami" element={<TentangKamiPage />} />
          <Route path="checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="profil" element={<ProtectedRoute><ProfilPage /></ProtectedRoute>} />
          <Route path="riwayat-pesanan" element={<ProtectedRoute><RiwayatPesananPage /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

// Pastikan baris ini ada di paling akhir file
export default App;
