/* eslint-disable react/jsx-filename-extension */
import { React, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// import Footer from '../sections/Footer';
import Main from './Main';
import Navbar from '../components/Navbar';
import NavbarBottom from '../components/NavbarBottom';

export default function Electronics() {
  useEffect(() => {
    console.log('Electronics component mounted'); // Add this log statement
  }, []);
  return (
    <>
      <Helmet>
        <link rel="canonical" href="/electronics" />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main />
      {/* <Footer /> */}
    </>
  );
}
