import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
// import Footer from '../../sections/Footer';
import Main from '../../sections/HomeMain';
import appName from '../../Constants/constantVariables';
import AuthFooter from '../../auth/components/AuthFooter';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{`Home | ${appName}`}</title>
        <meta
          name="description"
          content={`A Multi-purpose Place.
          Discover the Best Deals, Connect with Sellers, and Trade Gadgets with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/" />
      </Helmet>
      <Navbar />
      <Main />
      {/* <Footer /> */}
      <AuthFooter />
    </>
  );
}
