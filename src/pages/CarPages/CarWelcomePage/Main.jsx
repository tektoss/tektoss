import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import VehicleDisplayCards from './components/VehicleDisplayCards';
// import AdPanel from '../../components/AdPanel';
import SectionHeader from '../components/SectionHeader';
import FilterCard from '../components/FilterCard';
import CategoriesBox from '../Carscategory/components/CategoriesBox';
// import SearchCategoriesBox from '../CarSearchResult/components/CategoriesBox';
import SearchBar from './components/SearchBar';
// import useTopScroll from '../../Hooks/useTopScroll';
import { setFilter } from '../../../redux/slice/productsSlice';
// import HorizontalAdPanel from '../../components/HorizontalAdPanel';
import SellNowButtonBoxMobile from '../../WishList/components/SellNowButtonBoxMobile';
import Hero from './components/Hero';
// import NewArrivalsButton from '../../components/NewArrivalsButton';

export default function Main() {
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

  // useTopScroll();

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          {/* <CategoriesBox /> */}
          {/* <NewArrivalsButton /> */}
          <SectionHeader>Filter</SectionHeader>
          <FilterCard />
          {/* <AdPanel /> */}
        </div>
        <div className="main-section__right-div welcome-page__right-div">
          <SellNowButtonBoxMobile />
          <CategoriesBox />
          <Hero />
          {/* <HorizontalAdPanel /> */}
          <div className="main-section__mobile-div">
            <SearchBar />
            {/* <NewArrivalsButton /> */}
          </div>
        </div>
      </main>
      <main className="main-section">
        <div>
          <SectionHeader>All Vehicles</SectionHeader>
          <VehicleDisplayCards />
        </div>
      </main>
    </div>
  );
}