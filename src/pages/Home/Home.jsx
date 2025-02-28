import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
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
        {/* Google Analytics Tag */}
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
      <Main />
      <AuthFooter />
    </>
  );
}

