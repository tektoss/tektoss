import React from 'react';
import NavbarBottom from '../../components/NavbarBottom';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Main from './Main';

export default function SingleServicePosting() {
  return (
    <>
      <Navbar />
      <NavbarBottom />
      <Main />
      <Footer />
    </>
  );
}
