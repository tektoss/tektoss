import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../../components/Navbar';
import Main from './Main';
import Footer from '../../../sections/Footer';
// eslint-disable-next-line import/no-named-as-default
import appName from '../../../Constants/constantVariables';
import NavbarBottom from '../../../components/NavbarBottom';

export default function FindCloserItems() {
  return (
    <>
      <Helmet>
        <title>{`Find Close Items | ${appName}`}</title>
        <meta
          name="description"
          content={`Your One-Stop Electronic Gadget Marketplace.
          Discover the Best Deals, Connect with Sellers, and Trade Gadgets with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/find-closer-items" />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main />
      <Footer />
    </>
  );
}
