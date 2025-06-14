// File: src/pages/DaftarObat.jsx
// Pastikan file Anda berisi kode ini.

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCheck, FaShieldAlt, FaTruck, FaStethoscope } from 'react-icons/fa';
import apiClient from '../api/axios.js';
import { CartContext } from '../context/CartContext.jsx';

function DaftarObat() {
  const { addToCart } = useContext(CartContext);
  
  const [obats, setObats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [justAdded, setJustAdded] = useState(null);

  // useEffect ini akan menangani pengambilan data dan pencarian
  useEffect(() => {
    // Terapkan logika Debouncing
    const delayDebounceFn = setTimeout(() => {
      setLoading(true);
      
      // Kirim permintaan API dengan parameter search ke backend
      apiClient.get('/obat', {
        params: { search: searchTerm }
      })
      .then(response => {
        setObats(response.data); // State 'obats' akan berisi hasil yang sudah difilter oleh backend
      })
      .catch(error => {
        console.error("Gagal melakukan pencarian:", error);
      })
      .finally(() => {
        setLoading(false);
      });
    }, 300); // Tunggu 300ms setelah user berhenti mengetik

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]); // Jalankan kembali efek ini setiap kali 'searchTerm' berubah


  const handleAddToCart = (item) => {
    addToCart(item);
    setJustAdded(item.id);
    setTimeout(() => {
      setJustAdded(null);
    }, 2000);
  };

  // TIDAK ADA LAGI LOGIKA .filter() DI SINI

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <h1>Solusi Kesehatan Terlengkap</h1>
          <p>Cari & beli obat, vitamin, dan kebutuhan kesehatan lainnya dengan mudah.</p>
          <div className="search-bar-wrapper">
            <FaSearch className="search-bar-icon" />
            <input
              type="text"
              placeholder="Cari obat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="trust-badges">
            <div className="badge"><FaShieldAlt /> <span>Produk 100% Asli</span></div>
            <div className="badge"><FaTruck /> <span>Pengiriman Cepat</span></div>
            <div className="badge"><FaStethoscope /> <span>Konsultasi Ahli</span></div>
          </div>
        </div>
      </section>

      <section className="product-section">
        <div className="container">
          {/* Judul dinamis berdasarkan pencarian */}
          <h2>{searchTerm ? `Hasil Pencarian untuk "${searchTerm}"` : 'Produk Terlaris'}</h2>
          
          <div className="obat-list">
            {loading && <p>Mencari produk...</p>}
            
            {/* Tampilkan 'obats' langsung karena sudah difilter oleh backend */}
            {!loading && obats.map(obat => (
              <div key={obat.id} className="obat-card">
                <Link to={`/obat/${obat.id}`}>
                  <img src={obat.gambar_url} alt={obat.nama_obat} />
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
              <p>Produk yang Anda cari tidak ditemukan.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default DaftarObat;