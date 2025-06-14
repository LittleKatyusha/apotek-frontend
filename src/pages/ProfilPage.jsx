// src/pages/ProfilPage.jsx
import React, { useState, useEffect } from 'react';

const ProfilPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Ambil data user yang sudah kita simpan saat login
    const userData = JSON.parse(localStorage.getItem('auth_user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  // Tampilkan pesan loading jika data belum siap
  if (!user) {
    return <div className="container">Memuat data profil...</div>;
  }

  return (
    <div className="container">
      <h1>Profil Saya</h1>
      <div className="profile-card">
        <p><strong>Nama:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default ProfilPage;