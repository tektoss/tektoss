import React from 'react';
import Navbar from '../../components/Navbar';
import NavbarBottom from '../../components/NavbarBottom';
import Main from './Main';
import Footer from '../../sections/Footer';

export default function JobPostings() {
  return (
    <>
      <Navbar />
      <NavbarBottom />
      <Main />
      <Footer />
    </>
  );
}
