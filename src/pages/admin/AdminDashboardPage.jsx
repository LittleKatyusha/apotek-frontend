import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axios.js';
import StatCard from '../../components/admin/StatCard.jsx';
import { FaMoneyBillWave, FaBoxOpen, FaUsers, FaCapsules } from 'react-icons/fa';
import './AdminPages.css';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/admin/dashboard-stats');
        setStats(response.data);
      } catch (error) {
        console.error("Gagal mengambil data statistik:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <p>Memuat data dasbor...</p>;
  }

  return (
    <div className="admin-page-content">
      <div className="page-header">
        <h1>Dasbor</h1>
      </div>
      
      <div className="stats-grid">
        <StatCard 
          icon={<FaMoneyBillWave />}
          title="Total Pendapatan"
          value={`Rp ${new Intl.NumberFormat('id-ID').format(stats?.total_pendapatan || 0)}`}
          color="#198754"
        />
        <StatCard 
          icon={<FaBoxOpen />}
          title="Pesanan Baru"
          value={stats?.pesanan_baru || 0}
          color="#0d6efd"
        />
        <StatCard 
          icon={<FaUsers />}
          title="Jumlah Pelanggan"
          value={stats?.jumlah_pelanggan || 0}
          color="#ffc107"
        />
        <StatCard 
          icon={<FaCapsules />}
          title="Jumlah Produk"
          value={stats?.jumlah_produk || 0}
          color="#dc3545"
        />
      </div>

      {/* Anda bisa menambahkan komponen lain di sini, misal tabel pesanan terbaru */}
    </div>
  );
};

export default AdminDashboardPage;
