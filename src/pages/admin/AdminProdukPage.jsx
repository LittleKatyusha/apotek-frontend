import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axios.js';
import Modal from '../../components/admin/Modal.jsx';
import ProdukForm from '../../components/admin/ProdukForm.jsx';
import './AdminPages.css';

const AdminProdukPage = () => {
  const [obats, setObats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State untuk mengontrol modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State untuk menyimpan data produk yang sedang diedit (null jika mode tambah)
  const [editingProduk, setEditingProduk] = useState(null); 

  const fetchObats = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiClient.get('/admin/produk');
      const data = response.data.data || response.data;
       console.log('Data produk terkini:', data);
      if (Array.isArray(data)) {
        setObats(data);
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

  // Fungsi untuk membuka modal.
  // Jika 'produk' ada, kita masuk mode edit. Jika tidak, mode tambah.
  const handleOpenModal = (produk = null) => {
    setEditingProduk(produk);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduk(null);
  };

  // Fungsi untuk menyimpan data (menangani Tambah dan Edit)
  const handleSaveProduk = async (formData, gambarFile) => {
    const dataForSubmit = new FormData();
    
    // Append semua field dari form
    Object.keys(formData).forEach(key => {
      if (key !== 'id' && key !== 'gambar_url' && key !== 'created_at' && key !== 'updated_at' && formData[key] !== null) {
        dataForSubmit.append(key, formData[key]);
      }
    });

    // Append file gambar jika ada
    if (gambarFile) {
      dataForSubmit.append('gambar', gambarFile);
    }

    const isEditing = !!editingProduk;
    // Untuk update dengan file, kita gunakan POST dan "memalsukan" metode PUT
    if (isEditing) {
      dataForSubmit.append('_method', 'PUT');
    }

    const url = isEditing ? `/admin/produk/${editingProduk.id}` : '/admin/produk';
    
    try {
      // Selalu gunakan metode POST saat mengirim FormData
      await apiClient.post(url, dataForSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(`Produk berhasil ${isEditing ? 'diperbarui' : 'ditambahkan'}!`);
      handleCloseModal();
      fetchObats(); // Refresh tabel
    } catch (error) {
      console.error('Gagal menyimpan produk:', error.response || error);
      alert(`Gagal menyimpan produk. Periksa console (F12) untuk detail.`);
    }
  };

  // Fungsi untuk menghapus produk
  const handleDelete = async (id) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus produk #${id}?`)) return;
    try {
      await apiClient.delete(`/admin/produk/${id}`);
      alert(`Produk #${id} berhasil dihapus!`);
      fetchObats(); // Refresh tabel
    } catch (error) {
      console.error("Gagal menghapus produk:", error.response || error);
      alert('Gagal menghapus produk. Periksa console (F12) untuk detail.');
    }
  };

  if (loading) return <p>Memuat data produk...</p>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-page-content">
      <div className="page-header">
        <h1>Manajemen Produk</h1>
        {/* Hubungkan tombol ini ke fungsi handleOpenModal */}
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
                  {/* Hubungkan tombol Edit ke fungsi handleOpenModal */}
                  <button onClick={() => handleOpenModal(obat)} className="btn-edit">Edit</button>
                  {/* Hubungkan tombol Hapus ke fungsi handleDelete */}
                  <button onClick={() => handleDelete(obat.id)} className="btn-delete">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Komponen Modal yang akan muncul/hilang berdasarkan state */}
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
