// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. Import axios

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // 2. Hook untuk mengarahkan pengguna

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({}); // Bersihkan error lama

    // 3. Siapkan data untuk dikirim
    const registerData = {
        name: name,
        email: email,
        password: password
    };

    try {
      // 4. Kirim request POST ke backend Laravel
      await axios.post('https://romanesco.it.com/apotek-backend/api/register', registerData);

      // 5. Jika berhasil, beri notifikasi dan arahkan ke halaman login
      alert('Registrasi berhasil! Silakan login dengan akun Anda.');
      navigate('/login');

    } catch (error) {
      // 6. Jika gagal, tangkap dan tampilkan error dari backend
      if (error.response && error.response.status === 422) {
        // Ini adalah error validasi dari Laravel
        console.error("Validation errors:", error.response.data);
        setErrors(error.response.data.errors); // Simpan error untuk ditampilkan di form
        alert('Registrasi gagal. Periksa kembali data yang Anda masukkan.');
      } else {
        // Error lainnya (misal: server mati)
        console.error("An unexpected error occurred:", error);
        alert('Terjadi kesalahan pada server. Coba lagi nanti.');
      }
    }
  };

  return (
    <div className="container">
      <div className="auth-page">
        <div className="auth-form">
          <h2>Buat Akun Baru</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nama Lengkap</label>
              <input
                type="text" id="name" value={name}
                onChange={(e) => setName(e.target.value)} required
              />
              {errors.name && <small style={{color: 'red'}}>{errors.name[0]}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Alamat Email</label>
              <input
                type="email" id="email" value={email}
                onChange={(e) => setEmail(e.target.value)} required
              />
              {errors.email && <small style={{color: 'red'}}>{errors.email[0]}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password" id="password" value={password}
                onChange={(e) => setPassword(e.target.value)} required
              />
              {errors.password && <small style={{color: 'red'}}>{errors.password[0]}</small>}
            </div>

            <button type="submit" className="btn-auth">Daftar</button>
          </form>
          <p className="auth-switch">
            Sudah punya akun? <Link to="/login">Login di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;