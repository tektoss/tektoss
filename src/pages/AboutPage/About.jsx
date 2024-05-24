import React from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '../../sections/Footer';
import Main from './Main';
import Navbar from '../../components/Navbar';
import appName from '../../Constants/constantVariables';
import NavbarBottom from '../../components/NavbarBottom';
// import AuthFooter from '../../auth/components/AuthFooter';

export default function About() {
  return (
    <>
      <Helmet>
        <title>{`About | ${appName}`}</title>
        <meta
          name="description"
          content={`A Multi-purpose Place.
          Discover the Best Deals, Connect with Sellers, and Trade Gadgets with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/#page-top" />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main />
      <Footer />
      {/* <AuthFooter /> */}
    </>
  );
}
