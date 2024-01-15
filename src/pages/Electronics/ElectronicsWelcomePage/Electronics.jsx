/* eslint-disable react/jsx-filename-extension */
import { React, useEffect } from 'react';

// import Footer from '../sections/Footer';
import { Helmet } from 'react-helmet-async';
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
        <meta
          name="description"
          content="Your One-Stop Electronic Gadget Marketplace."
        />
        <link rel="canonical" href="/electronics" />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main />
      {/* <Footer /> */}
    </>
  );
}
