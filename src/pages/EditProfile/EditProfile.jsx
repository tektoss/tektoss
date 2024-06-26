import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import Main from './Main';
// import Footer from '../../sections/Footer';
import appName from '../../Constants/constantVariables';
import NavbarBottom from '../../components/NavbarBottom';
import AuthFooter from '../../auth/components/AuthFooter';

export default function EditProfile() {
  return (
    <>
      <Helmet>
        <title>{`Edit Profile | ${appName}`}</title>
        <meta
          name="description"
          content={`A Multi-purpose Place.
          Discover the Best Deals, Connect with Sellers, and Trade Gadgets with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/edit-profile" />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main />
      {/* <Footer /> */}
      <AuthFooter />
    </>
  );
}
