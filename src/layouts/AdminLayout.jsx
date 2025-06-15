import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaShoppingCart, FaBars } from 'react-icons/fa';
import './AdminLayout.css';

const AdminLayout = () => {
  // State untuk melacak kondisi sidebar (terbuka atau tertutup)
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Fungsi untuk mengubah state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    // Tambahkan class 'collapsed' secara dinamis
    <div className={`admin-layout ${isCollapsed ? 'collapsed' : ''}`}>
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h3><span>Admin Panel</span></h3>
          <button onClick={toggleSidebar} className="toggle-btn">
            <FaBars />
          </button>
        </div>
        <nav>
          <NavLink to="/admin/dashboard">
            <FaTachometerAlt /> <span>Dasbor</span>
          </NavLink>
          <NavLink to="/admin/produk">
            <FaBox /> <span>Produk</span>
          </NavLink>
          <NavLink to="/admin/pesanan">
            <FaShoppingCart /> <span>Pesanan</span>
          </NavLink>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
