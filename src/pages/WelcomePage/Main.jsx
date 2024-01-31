import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DisplayCards from './components/DisplayCards';
// import AdPanel from '../../components/AdPanel';
import SectionHeader from '../../components/SectionHeader';
// import FilterCard from '../../components/FilterCard';
// import SearchCategoriesBox from '../SearchResult/components/CategoriesBox';
import SearchBar from './components/SearchBar';
// import useTopScroll from '../../Hooks/useTopScroll';
import { setFilter } from '../../redux/slice/productsSlice';
// import HorizontalAdPanel from '../../components/HorizontalAdPanel';
// import SellNowButtonBoxMobile from '../WishList/components/SellNowButtonBoxMobile';
import Hero from './components/Hero';
// import NewArrivalsButton from '../../c omponents/NewArrivalsButton';
// import MainCategories from './components/MainCategories';

export default function Main() {
  const dispatch = useDispatch();

  const initialFilter = {
    maxPrice: 10000,
    minPrice: 0,
    location: 'all',
    brand: 'all',
    category: 'all',
    condition: 'all',
  };

  useEffect(() => {
    dispatch(setFilter(initialFilter));
    window.scrollTo(0, 0);
  }, [dispatch, initialFilter]);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          {/* <CategoriesBox /> */}
          {/* <NewArrivalsButton /> */}
          {/* <SectionHeader>Categories</SectionHeader>
          {/* <FilterCard /> */}
          {/* <MainCategories /> */}
          {/* <AdPanel /> */}
        </div>
        <div className="main-section__right-div welcome-page__right-div">
          {/* <SearchCategoriesBox /> */}
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
          <SectionHeader>All Products</SectionHeader>
          <DisplayCards />
        </div>
      </main>
    </div>
  );
}
