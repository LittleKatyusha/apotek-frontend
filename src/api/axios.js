// src/api/axios.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://romanesco.it.com/apotek-backend/api', // Alamat dasar API kita
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Menambahkan token ke setiap request jika ada
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;