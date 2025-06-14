import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios.js';

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

  const handleCancelOrder = async (orderId) => {
    // Tampilkan konfirmasi sebelum membatalkan
    if (!window.confirm("Apakah Anda yakin ingin membatalkan pesanan ini?")) {
        return;
    }

    try {
        const response = await apiClient.post(`/orders/${orderId}/cancel`);
        alert(response.data.message);

        // Perbarui status pesanan di state agar tampilan langsung berubah tanpa reload
        setOrders(currentOrders =>
            currentOrders.map(order =>
                order.id === orderId ? { ...order, status: 'Dibatalkan' } : order
            )
        );

    } catch (error) {
        console.error("Gagal membatalkan pesanan:", error);
        alert(error.response?.data?.message || "Gagal membatalkan pesanan.");
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'menunggu pembayaran':
        return 'status-menunggu';
      case 'diproses':
        return 'status-diproses';
      case 'dikirim':
        return 'status-dikirim';
      case 'selesai':
        return 'status-selesai';
      case 'dibatalkan':
        return 'status-dibatalkan';
      default:
        return '';
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
                  <p>Tanggal: {new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className={`order-status ${getStatusClass(order.status)}`}>
                  <span>{order.status}</span>
                </div>
              </div>
              <div className="order-body">
                <strong>Detail Produk:</strong>
                {order.items.map(item => (
                  <div key={item.id} className="order-item-detail">
                    <img src={item.obat.gambar_url} alt={item.obat.nama_obat} />
                    <div>
                      <strong>{item.obat.nama_obat}</strong>
                      <p>{item.kuantitas} x Rp {new Intl.NumberFormat('id-ID').format(item.harga)}</p>
                    </div>
                  </div>
                ))}
                 <hr/>
                <strong>Alamat Pengiriman:</strong>
                <p>{order.nama_penerima}<br/>{order.telepon}<br/>{order.alamat_pengiriman}</p>
              </div>
              <div className="order-footer">
                <strong>Total: Rp {new Intl.NumberFormat('id-ID').format(order.total_harga)}</strong>
                
                {order.status === 'Menunggu Pembayaran' && (
                    <button 
                        className="btn-batal" 
                        onClick={() => handleCancelOrder(order.id)}>
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