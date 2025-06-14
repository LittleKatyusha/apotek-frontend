// src/pages/CheckoutPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import apiClient from '../api/axios';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama_penerima: '',
    alamat_pengiriman: '',
    telepon: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const totalHarga = cartItems.reduce((total, item) => total + item.harga * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Keranjang Anda kosong!");
      return;
    }
    setIsProcessing(true);

    const orderData = {
      ...formData,
      items: cartItems.map(item => ({ id: item.id, quantity: item.quantity })),
    };

    try {
      await apiClient.post('/checkout', orderData);
      alert('Pesanan berhasil dibuat!');
      clearCart();
      navigate('/riwayat-pesanan');
    } catch (error) {
      console.error('Gagal membuat pesanan:', error);
      alert('Terjadi kesalahan saat memproses pesanan Anda. Pastikan semua kolom terisi.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <div className="checkout-form">
          <h2>Alamat Pengiriman</h2>
          <form onSubmit={handleCheckout}>
            <div className="form-group">
              <label htmlFor="nama_penerima">Nama Penerima</label>
              <input type="text" id="nama_penerima" name="nama_penerima" value={formData.nama_penerima} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="alamat_pengiriman">Alamat Lengkap</label>
              <textarea id="alamat_pengiriman" name="alamat_pengiriman" value={formData.alamat_pengiriman} onChange={handleInputChange} rows="4" required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="telepon">Nomor Telepon</label>
              <input type="tel" id="telepon" name="telepon" value={formData.telepon} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="btn-submit-order" disabled={isProcessing || cartItems.length === 0}>
              {isProcessing ? 'Memproses...' : 'Buat Pesanan'}
            </button>
          </form>
        </div>

        {/* BAGIAN BARU: RINGKASAN PESANAN */}
        <div className="order-summary">
          <h2>Ringkasan Pesanan</h2>
          {cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <span className="summary-item-name">{item.nama_obat} (x{item.quantity})</span>
              <span className="summary-item-price">Rp {new Intl.NumberFormat('id-ID').format(item.harga * item.quantity)}</span>
            </div>
          ))}
          <hr/>
          <div className="summary-total">
            <strong>Total</strong>
            <strong>Rp {new Intl.NumberFormat('id-ID').format(totalHarga)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;