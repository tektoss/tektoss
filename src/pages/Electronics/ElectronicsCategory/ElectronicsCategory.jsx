import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Main from './Main';
// import Footer from '../sections/Footer';
// eslint-disable-next-line import/no-named-as-default
import appName from '../../../Constants/constantVariables';
import NavbarBottom from '../components/NavbarBottom';

export default function electronicsCategory() {
  const { category } = useParams();

  return (
    <>
      <Helmet>
        <title>{`Categories - ${category} | ${appName}`}</title>
        <meta
          name="description"
          content={`Find the latest ${category} and get the best prices and deals right here at ${appName}`}
        />
        <link rel="canonical" href={`/electronics/${category}#page-top`} />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main />
      {/* <Footer /> */}
    </>
  );
}
