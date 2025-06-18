import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/axios.js';
import './PembayaranPage.css';

const PembayaranPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchOrderDetail = async () => {
      try {
        const response = await apiClient.get(`/orders`); // Ambil semua order
        const currentOrder = response.data.find(o => o.id === parseInt(orderId));
        setOrder(currentOrder);
      } catch (error) {
        console.error("Gagal mengambil detail pesanan:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetail();
  }, [orderId]);

  const handleConfirmPayment = async () => {
    try {
      await apiClient.post(`/orders/${orderId}/confirm-payment`);
      alert("Pembayaran berhasil dikonfirmasi!");
      navigate('/riwayat-pesanan');
    } catch (error) {
      console.error("Gagal konfirmasi pembayaran:", error);
      alert("Gagal mengonfirmasi pembayaran.");
    }
  };

  if (loading) return <div className="container"><h2>Memuat detail pembayaran...</h2></div>;
  if (!order) return <div className="container"><h2>Pesanan tidak ditemukan.</h2></div>;

  return (
    <div className="container">
      <div className="payment-card">
        <h1>Selesaikan Pembayaran</h1>
        <p>Segera selesaikan pembayaran untuk Pesanan <strong>#{order.id}</strong></p>
        <div className="payment-details">
          <span>Total Tagihan</span>
          <span className="total-amount">Rp {new Intl.NumberFormat('id-ID').format(order.total_harga)}</span>
        </div>
        <div className="payment-method">
          <p>Silakan transfer ke Nomor Virtual Account berikut:</p>
          <div className="va-number">
            <strong>BCA Virtual Account</strong>
            <p>8808 1234 5678 9012</p>
          </div>
          <small>*(Ini hanya simulasi, tidak ada transfer sungguhan yang diperlukan)*</small>
        </div>
        <button onClick={handleConfirmPayment} className="btn-confirm-payment">
          Saya Sudah Bayar
        </button>
      </div>
    </div>
  );
};

export default PembayaranPage;
