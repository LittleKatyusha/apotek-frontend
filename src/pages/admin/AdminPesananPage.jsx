import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axios.js';
import Modal from '../../components/admin/Modal.jsx';
import './AdminPages.css';
// 1. Import ikon baru
import { FaEye, FaTrash } from 'react-icons/fa';

const AdminPesananPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    setError(null);
    try {
      const response = await apiClient.get('/admin/pesanan');
      setOrders(response.data);
    } catch (err) {
      setError("Gagal memuat data pesanan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewDetail = async (orderId) => {
    try {
        const response = await apiClient.get(`/admin/pesanan/${orderId}`);
        setSelectedOrder(response.data);
        setIsDetailModalOpen(true);
    } catch (error) {
        alert("Gagal memuat detail pesanan.");
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedOrder(null);
  };
  
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus Pesanan #${orderId}? Tindakan ini tidak bisa dibatalkan.`)) {
        return;
    }
    try {
        await apiClient.delete(`/admin/pesanan/${orderId}`);
        alert(`Pesanan #${orderId} berhasil dihapus.`);
        handleCloseDetailModal();
        fetchOrders();
    } catch (error) {
        alert("Gagal menghapus pesanan.");
    }
  };

  if (loading) return <p>Memuat data pesanan...</p>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-page-content">
      <div className="page-header">
        <h1>Manajemen Pesanan</h1>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID Pesanan</th>
              <th>Nama Pelanggan</th>
              <th>Tanggal</th>
              <th>Total Harga</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.user.name}</td>
                <td>{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                <td>Rp {new Intl.NumberFormat('id-ID').format(order.total_harga)}</td>
                <td>
                  <span className={`status-badge status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {order.status}
                  </span>
                </td>
                <td className="action-buttons">
                  {/* 2. Tambahkan ikon ke tombol detail */}
                  <button onClick={() => handleViewDetail(order.id)} className="btn-detail">
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        show={isDetailModalOpen} 
        onClose={handleCloseDetailModal} 
        title={`Detail Pesanan #${selectedOrder?.id}`}
      >
        {selectedOrder && (
          <div className="order-detail-content">
            <div className="order-detail-grid">
                <div className="detail-section">
                    <span className="detail-label">Info Pelanggan</span>
                    <p className="detail-value">
                        {selectedOrder.user.name}<br/>
                        {selectedOrder.user.email}
                    </p>
                </div>
                <div className="detail-section">
                    <span className="detail-label">Info Pengiriman</span>
                    <p className="detail-value">
                        {selectedOrder.nama_penerima}<br/>
                        {selectedOrder.telepon}<br/>
                        {selectedOrder.alamat_pengiriman}
                    </p>
                </div>
            </div>

            <div className="order-detail-items">
              <h4>Barang Pesanan</h4>
              <ul>
                {selectedOrder.items.map(item => (
                  <li key={item.id}>
                    <img src={item.obat.gambar_url ? `http://127.0.0.1:8000${item.obat.gambar_url}` : 'https://placehold.co/50'} alt={item.obat.nama_obat} />
                    <div className="item-info">
                      <span>{item.obat.nama_obat}</span>
                      <small>{item.kuantitas} x Rp {new Intl.NumberFormat('id-ID').format(item.harga)}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal-footer-actions">
                <button 
                    onClick={() => handleDeleteOrder(selectedOrder.id)} 
                    className="btn-delete-modal">
                    <FaTrash /> Hapus Pesanan Ini
                </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminPesananPage;
