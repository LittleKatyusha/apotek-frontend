// src/pages/DetailObat.jsx
import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
// import { getObatById } from '../mockData.js'; // HAPUS INI
import { CartContext } from '../context/CartContext.jsx';

function DetailObat() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  // State untuk menyimpan data obat tunggal dan status loading
  const [obat, setObat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObatDetail = async () => {
      try {
        // Ambil data dari API menggunakan ID dari URL
        const response = await axios.get(`http://127.0.0.1:8000/api/obat/${id}`);
        setObat(response.data);
      } catch (error) {
        console.error("Gagal mengambil detail obat:", error);
        // Jika error (misal: obat tidak ditemukan), set obat menjadi null
        setObat(null);
      } finally {
        setLoading(false);
      }
    };

    fetchObatDetail();
  }, [id]); // [id] berarti useEffect akan berjalan lagi jika ID di URL berubah

  if (loading) {
    return <div className="container"><h2>Memuat detail produk...</h2></div>;
  }

  if (!obat) {
    return (
      <div className="container">
        <h1>404 - Obat Tidak Ditemukan</h1>
        <Link to="/">Kembali ke beranda</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="detail-content">
        <img src={obat.gambar_url} alt={obat.nama_obat} />
        <div className="detail-info">
          <h1>{obat.nama_obat}</h1>
          <p className="obat-kategori">{obat.kategori}</p>
          <hr/>
          <p>{obat.deskripsi}</p>
          <p><strong>Stok Tersisa:</strong> {obat.stok}</p>
          <p className="harga">Rp {new Intl.NumberFormat('id-ID').format(obat.harga)}</p>
          <button className="btn-beli" onClick={() => addToCart(obat)}>
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailObat;