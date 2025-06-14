import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCheck, FaShieldAlt, FaTruck, FaStethoscope } from 'react-icons/fa';

import { mockObatData } from '../mockData.js';
import { CartContext } from '../context/CartContext.jsx';

function DaftarObat() {
  const obats = mockObatData;
  const { addToCart } = useContext(CartContext);
  const [justAdded, setJustAdded] = useState(null);

  const handleAddToCart = (item) => {
    addToCart(item);
    setJustAdded(item.id);

    setTimeout(() => {
      setJustAdded(null);
    }, 2000);
  };

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <h1>Solusi Kesehatan Terlengkap</h1>
          <p>Cari & beli obat, vitamin, dan kebutuhan kesehatan lainnya dengan mudah.</p>
          
          <div className="search-bar-wrapper">
            <FaSearch className="search-bar-icon" />
            <input type="text" placeholder="Contoh: Paracetamol, Batuk, Vitamin C..." />
            <button>Cari</button>
          </div>

          <div className="trust-badges">
            <div className="badge">
              <FaShieldAlt /> <span>Produk 100% Asli</span>
            </div>
            <div className="badge">
              <FaTruck /> <span>Pengiriman Cepat</span>
            </div>
            <div className="badge">
              <FaStethoscope /> <span>Konsultasi Ahli</span>
            </div>
          </div>
        </div>
      </section>

      <section className="product-section">
        <div className="container">
          <h2>Produk Terlaris</h2>
          <div className="obat-list">
            {obats.map(obat => (
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
          </div>
        </div>
      </section>
    </>
  );
}

export default DaftarObat;