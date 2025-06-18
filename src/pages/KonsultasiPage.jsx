import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './KonsultasiPage.css'; // Kita akan buat file CSS baru untuk styling

const KonsultasiPage = () => {
  // --- PENTING: Ganti dengan nomor WhatsApp Anda ---
  // Gunakan format internasional tanpa tanda '+' atau spasi. Contoh: 6281234567890
  const nomorWhatsApp = '6281317210456'; 

  // Pesan default yang akan muncul di WhatsApp saat pengguna mengklik tombol
  const pesanDefault = encodeURIComponent("Halo ApotekSehat, saya ingin berkonsultasi mengenai produk/kesehatan.");

  // Membuat URL lengkap untuk WhatsApp
  const whatsappUrl = `https://wa.me/${nomorWhatsApp}?text=${pesanDefault}`;

  return (
    <div className="container">
      <div className="consultation-page-content">
        <FaWhatsapp className="whatsapp-icon-large" />
        <h1>Butuh Bantuan atau Saran?</h1>
        <p>
          Tim apoteker dan konsultan kesehatan kami siap membantu Anda. Jangan ragu untuk bertanya mengenai produk, dosis, keluhan, atau rekomendasi kesehatan lainnya.
        </p>
        <p>
          Klik tombol di bawah ini untuk memulai chat langsung dengan kami melalui WhatsApp. Layanan tersedia selama jam kerja.
        </p>
        
        <a 
          href={whatsappUrl} 
          className="btn-whatsapp" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaWhatsapp /> Hubungi Kami di WhatsApp
        </a>
      </div>
    </div>
  );
};

export default KonsultasiPage;
