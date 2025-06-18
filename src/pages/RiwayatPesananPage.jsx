import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios.js';
import { Link } from 'react-router-dom';

const RiwayatPesananPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error("Gagal mengambil riwayat pesanan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    const konfirmasi = window.confirm('Yakin ingin membatalkan pesanan ini?');
    if (!konfirmasi) return;

    try {
      await apiClient.post(`/orders/${orderId}/cancel`);
      // Update status di frontend agar langsung berubah jadi "Dibatalkan"
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: 'Dibatalkan' } : order
        )
      );
    } catch (error) {
      console.error("Gagal membatalkan pesanan:", error);
      alert("Terjadi kesalahan saat membatalkan pesanan.");
    }
  };

  if (loading) {
    return <div className="container"><h2>Memuat riwayat pesanan...</h2></div>;
  }

  return (
    <div className="container">
      <h1>Riwayat Pesanan Saya</h1>
      {orders.length === 0 ? (
        <p>Anda belum memiliki riwayat pesanan.</p>
      ) : (
        <div className="order-history-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <strong>Pesanan #{order.id}</strong>
                  <p>Tanggal: {new Date(order.created_at).toLocaleDateString('id-ID')}</p>
                </div>
                <div className={`order-status status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span>{order.status}</span>
                </div>
              </div>
              <div className="order-body">
                {order.items.map(item => (
                  <div key={item.id} className="order-item-detail">
                    <img
                      src={item.obat.gambar_url ? `http://127.0.0.1:8000${item.obat.gambar_url}` : 'https://placehold.co/60'}
                      alt={item.obat.nama_obat}
                    />
                    <div>
                      <strong>{item.obat.nama_obat}</strong>
                      <p>{item.kuantitas} x Rp {new Intl.NumberFormat('id-ID').format(item.harga)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <strong>Total: Rp {new Intl.NumberFormat('id-ID').format(order.total_harga)}</strong>
                {order.status === 'Menunggu Pembayaran' && (
                  <button className="btn-batal" onClick={() => handleCancel(order.id)}>
                    Batalkan Pesanan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiwayatPesananPage;
