import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axios.js';
import Modal from '../../components/admin/Modal.jsx';
import ProdukForm from '../../components/admin/ProdukForm.jsx';
import './AdminPages.css';

const AdminProdukPage = () => {
  const [obats, setObats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduk, setEditingProduk] = useState(null);

  const fetchObats = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiClient.get('/admin/produk');
      if (Array.isArray(response.data)) {
        setObats(response.data);
      } else {
        setObats([]);
      }
    } catch (err) {
      console.error("Gagal mengambil data produk:", err);
      setError("Gagal memuat data. Pastikan server backend dan database berjalan, dan Anda login sebagai admin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObats();
  }, []);

  const handleOpenModal = (produk = null) => {
    setEditingProduk(produk);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduk(null);
  };

  // --- FUNGSI INI BERUBAH TOTAL ---
  const handleSaveProduk = async (formData, gambarFile) => {
    const data = new FormData();
    // Tambahkan semua field teks ke FormData
    Object.keys(formData).forEach(key => {
      // Jangan tambahkan gambar_url dari form lama
      if (key !== 'gambar_url') {
        data.append(key, formData[key]);
      }
    });

    // Tambahkan file gambar jika ada yang dipilih
    if (gambarFile) {
      data.append('gambar', gambarFile);
    }

    const isEditing = !!editingProduk;
    // Untuk update dengan file, kita "memalsukan" metode PUT dengan POST
    if (isEditing) {
      data.append('_method', 'PUT');
    }

    const url = isEditing ? `/admin/produk/${editingProduk.id}` : '/admin/produk';
    
    try {
      // Selalu gunakan POST saat mengirim FormData dengan file
      await apiClient.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(`Produk berhasil ${isEditing ? 'diperbarui' : 'ditambahkan'}!`);
      handleCloseModal();
      fetchObats();
    } catch (error) {
      console.error('Gagal menyimpan produk:', error.response?.data);
      alert('Gagal menyimpan produk. Periksa kembali data yang Anda masukkan.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;
    try {
      await apiClient.delete(`/admin/produk/${id}`);
      alert('Produk berhasil dihapus!');
      fetchObats();
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
      alert('Gagal menghapus produk.');
    }
  };

  if (loading) return <p>Memuat data produk...</p>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-page-content">
      <div className="page-header">
        <h1>Manajemen Produk</h1>
        <button onClick={() => handleOpenModal()} className="btn-add">
          Tambah Produk Baru
        </button>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Gambar</th>
              <th>Nama Produk</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {obats.map(obat => (
              <tr key={obat.id}>
                <td>{obat.id}</td>
                <td>
                  <img 
                    src={obat.gambar_url ? `http://127.0.0.1:8000${obat.gambar_url}` : 'https://placehold.co/60'} 
                    alt={obat.nama_obat} 
                    className="table-img" 
                  />
                </td>
                <td>{obat.nama_obat}</td>
                <td>Rp {new Intl.NumberFormat('id-ID').format(obat.harga)}</td>
                <td>{obat.stok}</td>
                <td className="action-buttons">
                  <button onClick={() => handleOpenModal(obat)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(obat.id)} className="btn-delete">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        show={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingProduk ? 'Edit Produk' : 'Tambah Produk Baru'}
      >
        <ProdukForm
          produkToEdit={editingProduk}
          onSave={handleSaveProduk}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default AdminProdukPage;
