import React from 'react';
import { FaHeartbeat, FaUserMd, FaShieldAlt } from 'react-icons/fa';
import './TentangKamiPage.css';

const TentangKamiPage = () => {
  return (
    <div className="about-us-container">
      <section className="about-hero">
        <div className="container">
          <h1>Tentang ApotekSehat</h1>
          <p>Melayani kebutuhan kesehatan Anda dengan hati, profesionalisme, dan integritas.</p>
        </div>
      </section>

      <section className="about-content container">
        <div className="content-section">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" 
            alt="Tim ApotekSehat" 
            className="content-image"
          />
          <div>
            <h2>Misi Kami</h2>
            <p>
              Misi kami adalah memberikan akses yang mudah, cepat, dan terpercaya terhadap produk-produk kesehatan berkualitas. Kami berkomitmen untuk menjadi mitra kesehatan terpercaya bagi Anda dan keluarga, menyediakan informasi yang akurat dan pelayanan yang tulus. Di ApotekSehat, kami percaya bahwa kesehatan adalah hak, dan kami berupaya untuk mewujudkannya bagi seluruh lapisan masyarakat.
            </p>
          </div>
        </div>

        <div className="values-section">
          <h2>Nilai-Nilai Kami</h2>
          <div className="values-grid">
            <div className="value-card">
              <FaHeartbeat />
              <h3>Pelayanan</h3>
              <p>Kami melayani dengan empati, memprioritaskan kebutuhan dan kenyamanan Anda di atas segalanya.</p>
            </div>
            <div className="value-card">
              <FaShieldAlt />
              <h3>Kepercayaan</h3>
              <p>Kami menjamin semua produk 100% asli, terdaftar, dan disimpan dengan standar tertinggi.</p>
            </div>
            <div className="value-card">
              <FaUserMd />
              <h3>Profesionalisme</h3>
              <p>Tim kami terdiri dari apoteker dan tenaga ahli berlisensi yang siap memberikan saran terbaik.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TentangKamiPage;
