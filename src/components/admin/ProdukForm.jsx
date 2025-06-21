import React, { useState, useEffect } from 'react';

const ProdukForm = ({ produkToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nama_obat: '',
    deskripsi: '',
    kategori: '',
    harga: '',
    stok: '',
  });
  // State baru untuk menampung file gambar yang dipilih
  const [gambarFile, setGambarFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (produkToEdit) {
      setFormData({
          nama_obat: produkToEdit.nama_obat,
          deskripsi: produkToEdit.deskripsi,
          kategori: produkToEdit.kategori,
          harga: produkToEdit.harga,
          stok: produkToEdit.stok,
      });
      // Tampilkan gambar yang ada dari server
      setPreview(produkToEdit.gambar_url ? `https://romanesco.it.com/apotek-backend${produkToEdit.gambar_url}` : null);
    } else {
      // Reset form jika dalam mode tambah
      setFormData({
        nama_obat: '', deskripsi: '', kategori: '', harga: '', stok: '',
      });
      setPreview(null);
    }
    setGambarFile(null); // Selalu reset file input
  }, [produkToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambarFile(file);
      // Buat preview sementara dari file yang dipilih di komputer
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim formData dan file gambar secara terpisah ke parent
    onSave(formData, gambarFile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nama Produk</label>
        <input type="text" name="nama_obat" value={formData.nama_obat} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Deskripsi</label>
        <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} rows="4" required></textarea>
      </div>
      <div className="form-group">
        <label>Kategori</label>
        <input type="text" name="kategori" value={formData.kategori} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Harga (Rp)</label>
        <input type="number" name="harga" value={formData.harga} onChange={handleChange} min="0" required />
      </div>
      <div className="form-group">
        <label>Stok</label>
        <input type="number" name="stok" value={formData.stok} onChange={handleChange} min="0" required />
      </div>
      <div className="form-group">
        <label>Gambar Produk</label>
        {preview && <img src={preview} alt="Preview" className="image-preview"/>}
        <input type="file" name="gambar" onChange={handleFileChange} accept="image/*" />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-secondary">Batal</button>
        <button type="submit" className="btn-primary">Simpan</button>
      </div>
    </form>
  );
};

export default ProdukForm;
