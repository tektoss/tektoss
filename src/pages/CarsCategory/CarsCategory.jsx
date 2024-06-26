import React from 'react';
import { Helmet } from 'react-helmet-async';
// import Footer from '../../sections/Footer';
import Main from './Main';
import Navbar from '../../components/Navbar';
import appName from '../../Constants/constantVariables';
import NavbarBottom from '../../components/NavbarBottom';
import AuthFooter from '../../auth/components/AuthFooter';

export default function CarsCategory() {
  return (
    <>
      <Helmet>
        <title>{`Category| ${appName}`}</title>
        <meta
          name="description"
          content={`A Multi-purpose Place.
          Discover the Best Deals, Connect with Sellers and Jobs, and Trade Gadgets , Vehicles, and otheres with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/#page-top" />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main />
      {/* <Footer /> */}
      <AuthFooter />
    </>
  );
}
