import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Main from './Main';
// import Footer from '../sections/Footer';
import appName from '../../../Constants/constantVariables';
import NavbarBottom from '../components/NavbarBottom';

export default function VehicleTypeCategory() {
  const { vehicleType } = useParams();

  return (
    <>
      <Helmet>
        <title>{`Categories - ${vehicleType} | ${appName}`}</title>
        <meta
          name="description"
          content={`Find the latest ${vehicleType} and get the best prices and deals right here at ${appName}`}
        />
        <link rel="canonical" href={`/CarWelcomePage/${vehicleType}#page-top`} />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main />
      {/* <Footer /> */}
    </>
  );
}
