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

  useEffect(() => {
    const fetchObats = async () => {
      setLoading(true);
      try {
        // Sanitize: hanya huruf, angka, dan spasi
        const cleanSearchTerm = searchTerm.replace(/[^a-zA-Z0-9\s]/g, '');
        const response = await apiClient.get('/obat', {
          params: {
            search: cleanSearchTerm
          }
        });
        setObats(response.data);
      } catch (error) {
        console.error("Gagal mencari obat:", error);
        setObats([]);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm.trim() !== '') {
      fetchObats();
    } else {
      const fetchBestsellers = async () => {
        setLoading(true);
        try {
          const response = await apiClient.get('/produk/terlaris');
          setObats(response.data);
        } catch (error) {
          console.error("Gagal mengambil produk terlaris:", error);
          setObats([]);
        } finally {
          setLoading(false);
        }
      };
      fetchBestsellers();
    }
  }, [searchTerm]);

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
            <input
              type="text"
              placeholder="Cari obat di sini..."
              value={searchTerm}
              onChange={(e) => {
                const input = e.target.value;
                console.log("SearchTerm berubah:", input);
                setSearchTerm(input);
              }}
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
          <h2>{searchTerm.trim() === '' ? 'Produk Terlaris' : 'Hasil Pencarian'}</h2>

          {loading ? (
            <p>Memuat produk...</p>
          ) : (
            <div className="obat-list">
              {obats.length > 0 ? (
                obats.map(obat => (
                  <div key={obat.id} className="obat-card">
                    <Link to={`/obat/${obat.id}`}>
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
                ))
              ) : (
                <p>
                  {searchTerm.trim() === ''
                    ? 'Belum ada produk terlaris yang tersedia.'
                    : <>Tidak ditemukan hasil untuk pencarian: <strong>{searchTerm}</strong></>
                  }
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default DaftarObat;
