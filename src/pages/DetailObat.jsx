// src/pages/DetailObat.jsx
import React, { useContext } from 'react'; // <-- Import useContext
import { useParams, Link } from 'react-router-dom';
import { getObatById } from '../mockData';
import { CartContext } from '../context/CartContext'; // <-- Import CartContext

function DetailObat() {
  const { id } = useParams();
  const obat = getObatById(id);
  const { addToCart } = useContext(CartContext); // <-- Ambil fungsi addToCart dari context

  if (!obat) {
    return <div className="container"><h1>Obat Tidak Ditemukan</h1></div>;
  }

  return (
    <div className="container">
      {/* ... kode lainnya ... */}
      <div className="detail-info">
        {/* ... kode lainnya ... */}

        {/* UBAH TOMBOL INI */}
        <button className="btn-beli" onClick={() => addToCart(obat)}>
          Tambah ke Keranjang
        </button>

      </div>
    </div>
  );
}
export default DetailObat;