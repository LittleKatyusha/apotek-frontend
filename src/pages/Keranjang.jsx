import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext.jsx';

function Keranjang() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalHarga = cartItems.reduce((total, item) => total + item.harga * item.quantity, 0);

  return (
    <div className="container">
      <h1>Keranjang Belanja Anda</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <FaShoppingCart className="empty-cart-icon" />
          <h2>Wah, keranjang Anda kosong!</h2>
          <p>Sepertinya Anda belum menambahkan produk apapun.</p>
          <Link to="/" className="btn-belanja">
            Cari Produk Sekarang
          </Link>
        </div>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.gambar_url} alt={item.nama_obat} />
              <div className="cart-item-info">
                <h2>{item.nama_obat}</h2>
                <p>Rp {new Intl.NumberFormat('id-ID').format(item.harga)} x {item.quantity}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="btn-hapus">Hapus</button>
            </div>
          ))}
          <hr />
          <div className="cart-total">
            <h2>Total: Rp {new Intl.NumberFormat('id-ID').format(totalHarga)}</h2>
            <button className="btn-checkout">Lanjut ke Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Keranjang;