import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import apiClient from '../api/axios.js';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // --- PENTING: GANTI DENGAN ACCESS TOKEN MAPBOX ANDA ---
  const mapboxAccessToken = 'pk.eyJ1Ijoic2hhZG93cm9zZTA5IiwiYSI6ImNtYzFreWhjejBka2sybXEzcXk3a3FmMm0ifQ.xS60OZyqPZZ30EamSwGQvQ'; 

  const [formData, setFormData] = useState({
    nama_penerima: '',
    telepon: '',
    alamat_pengiriman: '', // Akan diisi otomatis oleh peta
  });
  
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isAddressFound, setIsAddressFound] = useState(false);
  
  const apotekLocation = [106.8385, -6.3703]; // [lng, lat] untuk Mapbox

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    // Akses library dari window object, bukan dari import
    window.mapboxgl.accessToken = mapboxAccessToken;
    map.current = new window.mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: apotekLocation,
      zoom: 14
    });

    new window.mapboxgl.Marker({ color: '#0D6EFD' })
      .setLngLat(apotekLocation)
      .setPopup(new window.mapboxgl.Popup().setHTML("<b>ApotekSehat</b>"))
      .addTo(map.current);

    const geocoder = new window.MapboxGeocoder({
        accessToken: window.mapboxgl.accessToken,
        mapboxgl: window.mapboxgl,
        marker: false,
        placeholder: 'Ketik alamat atau nama tempat...',
        countries: 'id'
    });

    document.getElementById('geocoder').appendChild(geocoder.onAdd(map.current));

    geocoder.on('result', (e) => {
        const coords = e.result.center;
        const placeName = e.result.place_name;

        if (marker.current) {
            marker.current.remove();
        }

        const newMarker = new window.mapboxgl.Marker({ color: '#dc3545', draggable: true })
            .setLngLat(coords)
            .setPopup(new window.mapboxgl.Popup().setHTML("Lokasi Anda"))
            .addTo(map.current)
            .togglePopup();
        
        marker.current = newMarker;
        calculateShipping(coords);
        setFormData(prev => ({...prev, alamat_pengiriman: placeName}));
        setIsAddressFound(true);
        
        newMarker.on('dragend', () => {
            const newCoords = newMarker.getLngLat();
            calculateShipping([newCoords.lng, newCoords.lat]);
        });
    });
  }, []);

  const calculateShipping = (userCoords) => {
    const from = window.turf.point(apotekLocation);
    const to = window.turf.point(userCoords);
    const dist = window.turf.distance(from, to, { units: 'kilometers' });

    setDistance(dist);
    const cost = 10000 + (Math.floor(dist) * 2500);
    setShippingCost(cost);
  };

  const subTotal = cartItems.reduce((total, item) => total + item.harga * item.quantity, 0);
  const totalHarga = subTotal + shippingCost;

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!isAddressFound) {
      alert("Silakan cari dan tentukan alamat pengiriman Anda di peta terlebih dahulu.");
      return;
    }
    
    const orderData = {
      ...formData,
      ongkir: shippingCost,
      items: cartItems.map(item => ({ id: item.id, quantity: item.quantity })),
    };

    try {
      const response = await apiClient.post('/checkout', orderData);
      const newOrderId = response.data.order_id;
      alert('Pesanan berhasil dibuat!');
      clearCart();
      navigate(`/pembayaran/${newOrderId}`);
    } catch (error) {
      console.error('Gagal membuat pesanan:', error);
      alert('Terjadi kesalahan saat memproses pesanan Anda.');
    }
  };

  return (
    <div className="container checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <div className="checkout-form">
          <h2>1. Detail Pengiriman & Lokasi</h2>
          <form onSubmit={handleCheckout}>
            <div className="form-group">
              <label>Nama Penerima</label>
              <input type="text" value={formData.nama_penerima} onChange={(e) => setFormData({...formData, nama_penerima: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Nomor Telepon</label>
              <input type="tel" value={formData.telepon} onChange={(e) => setFormData({...formData, telepon: e.target.value})} required />
            </div>
            <p>Gunakan kotak pencarian di bawah untuk menemukan alamat Anda. Anda juga bisa menggeser penanda merah jika perlu.</p>
            <div id="geocoder" className="geocoder-container"></div>
            <div ref={mapContainer} id="map" />
            <div className="form-group">
              <label>Detail Alamat Lengkap</label>
              <textarea name="alamat_pengiriman" value={formData.alamat_pengiriman} onChange={(e) => setFormData({...formData, alamat_pengiriman: e.target.value})} rows="3" required placeholder="Alamat akan terisi otomatis dari pencarian peta..."></textarea>
            </div>
          </form>
        </div>

        <div className="order-summary">
          <h2>Ringkasan Pesanan</h2>
          {cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <span className="summary-item-name">{item.nama_obat} (x{item.quantity})</span>
              <span className="summary-item-price">Rp {new Intl.NumberFormat('id-ID').format(item.harga * item.quantity)}</span>
            </div>
          ))}
          <hr/>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>Rp {new Intl.NumberFormat('id-ID').format(subTotal)}</span>
          </div>
          <div className="summary-item">
            <span>Ongkos Kirim ({distance.toFixed(2)} km)</span>
            <span>Rp {new Intl.NumberFormat('id-ID').format(shippingCost)}</span>
          </div>
          <hr/>
          <div className="summary-total">
            <strong>Total Pembayaran</strong>
            <strong>Rp {new Intl.NumberFormat('id-ID').format(totalHarga)}</strong>
          </div>
          <button onClick={handleCheckout} className="btn-submit-order" disabled={!isAddressFound || cartItems.length === 0}>
            Buat Pesanan
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
