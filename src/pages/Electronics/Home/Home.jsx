import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../../components/Navbar';
import Footer from '../../../sections/Footer';
import Main from '../../../sections/HomeMain';
// eslint-disable-next-line import/no-named-as-default
import appName from '../../../Constants/constantVariables';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{`Electronics Home | ${appName}`}</title>
        <meta
          name="description"
          content={`Your One-Stop Electronic Gadget Marketplace.
          Discover the Best Deals, Connect with Sellers, and Trade Gadgets with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/" />
      </Helmet>
      <Navbar />
      <Main />
      <Footer />
    </>
  );
}