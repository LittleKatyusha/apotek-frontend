// src/mockData.js
export const mockObatData = [
  {
    id: 1,
    nama_obat: 'Paracetamol 500mg',
    deskripsi: 'Obat ini digunakan untuk meredakan demam dan nyeri ringan hingga sedang.',
    kategori: 'Demam & Nyeri',
    harga: 8000,
    stok: 150,
    gambar_url: 'https://d2qjkwm11akmwu.cloudfront.net/products/82354_27-10-2022_15-46-39.webp'
  },
  {
    id: 2,
    nama_obat: 'Bodrexin Tablet Anak',
    deskripsi: 'Tablet kunyah rasa jeruk untuk menurunkan demam dan meredakan nyeri pada anak-anak.',
    kategori: 'Obat Anak',
    harga: 3500,
    stok: 200,
    gambar_url: 'https://d2qjkwm11akmwu.cloudfront.net/products/16657_2-5-2023_14-25-33.webp'
  },
  {
    id: 3,
    nama_obat: 'Vitamin C IPI 50mg',
    deskripsi: 'Suplemen untuk membantu memenuhi kebutuhan Vitamin C harian dan menjaga daya tahan tubuh.',
    kategori: 'Vitamin & Suplemen',
    harga: 7500,
    stok: 300,
    gambar_url: 'https://d2qjkwm11akmwu.cloudfront.net/products/2633_29-3-2023_13-58-15.webp'
  }
];

export const getObatById = (id) => {
  const numericId = parseInt(id, 10);
  return mockObatData.find(obat => obat.id === numericId);
};