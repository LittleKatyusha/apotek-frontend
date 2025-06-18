import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/axios.js';
import { CartContext } from '../context/CartContext.jsx';
import { FaCheck } from 'react-icons/fa';

const ProdukPage = () => {
  const [obats, setObats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const [justAdded, setJustAdded] = useState(null);

  useEffect(() => {
    // Fungsi untuk mengambil semua data obat dari backend
    const fetchAllObats = async () => {
      try {
        const response = await apiClient.get('/obat');
        setObats(response.data);
      } catch (error) {
        console.error("Gagal mengambil data katalog produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllObats();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    setJustAdded(item.id);
    setTimeout(() => {
      setJustAdded(null);
    }, 2000);
  };

  if (loading) {
    return <div className="container"><h2>Memuat katalog produk...</h2></div>;
  }

  return (
    <div className="container">
      <h1>Katalog Produk</h1>
      <p>Temukan semua kebutuhan kesehatan Anda di sini.</p>
      <hr style={{ margin: '30px 0' }} />

      <div className="obat-list">
        {obats.map(obat => (
          <div key={obat.id} className="obat-card">
            <Link to={`/obat/${obat.id}`}>
              {/* === PERBAIKAN DI SINI === */}
              {/* Tambahkan alamat lengkap backend ke URL gambar */}
              <img 
                src={obat.gambar_url ? `http://127.0.0.1:8000${obat.gambar_url}` : 'https://placehold.co/600x400/EEE/31343C?text=ApotekSehat'} 
                alt={obat.nama_obat}
              />
              <div className="obat-info">
                <span className="obat-kategori">{obat.kategori}</span>
                <h3>{obat.nama_obat}</h3>
                <p className="obat-harga">Rp {new Intl.NumberFormat('id-ID').format(obat.harga)}</p>
              </div>
            </Link>
            <button
              className={`add-to-cart-btn ${justAdded === obat.id ? 'added' : ''}`}
              onClick={() => handleAddToCart(obat)}
              disabled={justAdded === obat.id}
            >
              {justAdded === obat.id ? (
                <><FaCheck style={{ marginRight: '5px' }} /> Ditambahkan</>
              ) : (
                ' + Keranjang'
              )}
            </button>
          </div>
        ))}
        {obats.length === 0 && !loading && (
          <p>Saat ini belum ada produk yang tersedia.</p>
        )}
      </div>
    </div>
  );
};

export default ProdukPage;
