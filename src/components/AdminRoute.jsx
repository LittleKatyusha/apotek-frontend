// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('auth_token');
  const userString = localStorage.getItem('auth_user');
  const user = userString ? JSON.parse(userString) : null;

  // 1. Cek apakah ada token (sudah login)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Cek apakah role user adalah 'admin'
  if (user && user.role !== 'admin') {
    // Jika login tapi bukan admin, lempar ke halaman utama
    return <Navigate to="/" replace />;
  }

  // 3. Jika login dan role adalah admin, tampilkan halaman
  return children;
};

export default AdminRoute;