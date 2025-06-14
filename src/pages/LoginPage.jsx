// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = { email, password };

    try {
      // 1. Kirim request login ke backend
      const response = await axios.post('http://127.0.0.1:8000/api/login', loginData);

      // 2. Jika berhasil, SIMPAN TOKEN di Local Storage browser
      // Local Storage adalah penyimpanan kecil di browser yang tidak akan hilang saat di-refresh
      localStorage.setItem('auth_token', response.data.access_token);

      // Opsional: Simpan juga data user untuk ditampilkan nanti
      localStorage.setItem('auth_user', JSON.stringify(response.data.user));

      // 3. Beri notifikasi dan arahkan ke halaman utama
      alert('Login berhasil!');
      navigate('/');
      window.location.reload(); // Reload halaman agar status login di header bisa diperbarui

    } catch (error) {
      // 4. Jika gagal, tampilkan pesan error
      if (error.response && (error.response.status === 401 || error.response.status === 422)) {
        alert(error.response.data.message);
      } else {
        alert('Terjadi kesalahan pada server.');
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="auth-page">
        <div className="auth-form">
          <h2>Login ke Akun Anda</h2>
          <form onSubmit={handleSubmit}>
             <div className="form-group">
                <label htmlFor="email">Alamat Email</label>
                <input
                    type="email" id="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} required
                />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password" id="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} required
                />
            </div>
            <button type="submit" className="btn-auth">Login</button>
          </form>
          <p className="auth-switch">
            Belum punya akun? <Link to="/register">Daftar di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;