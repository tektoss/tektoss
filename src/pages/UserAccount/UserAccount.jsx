import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import appName from '../../Constants/constantVariables';
import Footer from '../../sections/Footer';
import Main from './Main';
import NavbarBottom from '../../components/NavbarBottom';

export default function UserAccount() {
  return (
    <>
      <Helmet>
        <title>{`Terms & Condition | ${appName}`}</title>
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
    </>
  );
}
