import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import AdPanel from '../../components/AdPanel';
import SectionHeader from '../components/SectionHeader';
// import SearchBar from '../SearchResult/components/SearchBar';
import CategoriesBox from './components/CategoriesBox';
import DisplayCategoryProducts from './components/DisplayCategoryProducts';
import CategoryInfoBox from './components/CategoryInfoBox';
import CategoryFilterCard from './components/CategoryFilterCard';
import { setCategoryFilter } from '../../../redux/slice/productsSlice';
import SellNowButtonBoxMobile from '../../WishList/components/SellNowButtonBoxMobile';
import Hero from '../components/Hero';

export default function Main() {
  const { vehicleType, make } = useParams();
  const dispatch = useDispatch();

  const initialFilter = {
    maxPrice: 10000,
    minPrice: 0,
    location: 'all',
    brand: 'all',
    category: 'all',
    condition: 'all',
    vehicleType: 'all',
    make: 'all',
    model: 'all',
  };

  useEffect(() => () => {
    dispatch(setCategoryFilter(initialFilter));
  }, [vehicleType]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [vehicleType]);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <SectionHeader>Filter</SectionHeader>
          <CategoryFilterCard vehicleType={vehicleType} make={make} />
          {/* <AdPanel /> */}
        </div>
        <div className="main-section__right-div main-section__right-div__category-alt">
          <SellNowButtonBoxMobile />
          <CategoryInfoBox />
          <CategoriesBox />
          {/* <SearchBar /> */}
          <Hero />
        </div>
      </main>
      <main className="main-section">
        <div>
          <SectionHeader>{`All ${vehicleType}`}</SectionHeader>
          <DisplayCategoryProducts />
        </div>
      </main>
    </div>
  );
}
// *920*456#
