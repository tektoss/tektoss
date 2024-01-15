import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../../components/Navbar';
import Footer from '../../../sections/Footer';
import Main from './Main';
// eslint-disable-next-line import/no-named-as-default
import appName from '../../../Constants/constantVariables';
import NavbarBottom from '../../../components/NavbarBottom';

export default function EditItem() {
  return (
    <>
      <Helmet>
        <title>{`Edit Item | ${appName}`}</title>
        <meta
          name="description"
          content={`Your One-Stop Electronic Gadget Marketplace.
          Discover the Best Deals, Connect with Sellers, and Trade Gadgets with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/vehicles/CarNewItem" />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main />
      <Footer />
    </>
  );
}
