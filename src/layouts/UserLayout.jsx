import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <>
      <Header />
      <main>
        {/* Di sinilah semua halaman publik akan dirender */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
