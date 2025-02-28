import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Main from './Main';
import appName from '../../Constants/constantVariables';
import NavbarBottom from '../../components/NavbarBottom';

export default function NewShop() {
  return (
    <>
      <Helmet>
        <title>{`Create Shop | ${appName}`}</title>
        <meta
          name="description"
          content={`A Multi-purpose Place.
              Discover the Best Deals, Connect with Sellers, and Trade Gadgets with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/new-item" />

         <script async src="https://www.googletagmanager.com/gtag/js?id=G-7DH8N2G5K2"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7DH8N2G5K2');
          `}
        </script>
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main />
      <Footer />
    </>
  );
}
