import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getObatById } from '../mockData.js';
import { CartContext } from '../context/CartContext.jsx';

function DetailObat() {
  const { id } = useParams();
  const obat = getObatById(id);
  const { addToCart } = useContext(CartContext);

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