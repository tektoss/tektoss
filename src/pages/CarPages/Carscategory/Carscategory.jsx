import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { setFilter } from '../../../redux/slice/productsSlice';
import Navbar from '../components/Navbar';
import Main from './Main';
// import Footer from '../../../sections/Footer';
// eslint-disable-next-line import/no-named-as-default
import appName from '../../../Constants/constantVariables';
import NavbarBottom from '../components/NavbarBottom';

export default function Carscategory() {
  const { vehicleType, make } = useParams();

  const dispatch = useDispatch();

  const initialFilter = {
    maxPrice: 10000,
    minPrice: 0,
    location: 'all',
    make: 'all',
    model: 'all',
    minYear: 2000,
    maxYear: 2024,
    condition: 'all',
    mainCat: 'vehicle',
  };

  useEffect(() => () => {
    dispatch(setFilter(initialFilter));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Categories - ${vehicleType} | ${appName}`}</title>
        <meta
          name="description"
          content={`Find the latest ${vehicleType} and get the best prices and deals right here at Cirloz`}
        />
        <link rel="canonical" href={`vehicles/${vehicleType}/${make}#page-top`} />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main />
      {/* <Footer /> */}
    </>
  );
}
