/* eslint-disable react/jsx-filename-extension */
import { React } from 'react';
// import Footer from '../sections/Footer';
import { Helmet } from 'react-helmet-async';
import Main from './Main';
import Navbar from '../components/Navbar';
import NavbarBottom from '../components/NavbarBottom';

export default function Vehicles() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="/vehicles" />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main />
      {/* <Footer /> */}
    </>
  );
}
