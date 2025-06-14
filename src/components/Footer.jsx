import React from 'react';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} ApotekSehat. Semua Hak Cipta Dilindungi.</p>
        <p>Informasi di situs ini tidak dimaksudkan sebagai pengganti nasihat medis profesional.</p>
      </div>
    </footer>
  );
}

export default Footer;