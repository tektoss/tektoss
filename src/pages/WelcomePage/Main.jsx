import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DisplayCards from './components/DisplayCards';
import SectionHeader from '../../components/SectionHeader';
import FilterCard from '../../components/FilterCard';
import SearchCategoriesBox from '../SearchResult/components/CategoriesBox';
import { setFilter } from '../../redux/slice/productsSlice';
import SellNowButtonBoxMobile from '../WishList/components/SellNowButtonBoxMobile';
import TopBrands from './components/TopBrands';
import { selectItemTypeState, setItemType } from '../../redux/slice/itemTypeSlice';
import ItemTypeToggleButton from './components/ItemTypeToggleButton';
import StoreList from './components/StoreList';
import DisplayNewArrivals from './components/DisplayNewArrivals';
import RequestBox from './components/RequestBox';

export default function Main() {
  const dispatch = useDispatch();
  const { itemType } = useSelector(selectItemTypeState);

  const navigate = useNavigate();

  const initialFilter = {
    maxPrice: 10000,
    minPrice: 0,
    location: 'all',
    brand: 'all',
    category: 'all',
    condition: 'all',
  };

  useEffect(() => () => {
    dispatch(setItemType('electronics'));
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
          <ItemTypeToggleButton />
          <SectionHeader>Filter</SectionHeader>
          <FilterCard itemType={itemType} />
          {/* <AdPanel /> */}
        </div>
        <div className="main-section__right-div welcome-page__right-div">
          <SellNowButtonBoxMobile />
          <div className="main-section__mobile-div">
            <ItemTypeToggleButton />
          </div>
          <SearchCategoriesBox itemType={itemType} />
          {/* <ExploreShops /> */}
          <StoreList />
          {/* <Hero /> */}
          {/* <HorizontalAdPanel /> */}
          <div className="main-section__mobile-div">
            {/* <SearchBar /> */}
            {/* <NewArrivalsButton /> */}
          </div>
        </div>
      </main>
      <main className="main-section">
        <div className="request-box__outermost-div">
          <div className="request-box__outer-div">
            <RequestBox>
              <div>
                <h5 className="request-box__title">Can&apos;t Find What You&apos;re Looking For?</h5>
                <p className="request-box__text">
                  Post an item you need and let others know what you&apos;re looking for.
                  Click the button below to post your needs!
                </p>
                <button
                  onClick={() => navigate('/request-item-list')}
                  type="button"
                  className="request-box__button"
                >
                  Get Started
                </button>
              </div>
            </RequestBox>
            <RequestBox>
              <div>
                <h5 className="request-box__title">Need Services or Want to Offer Your Expertise?</h5>
                <p className="request-box__text">
                  Explore a wide range of services or post
                  your own job opportunities. Click the button below to get started!
                </p>
                <button
                  onClick={() => navigate('/job-postings')}
                  type="button"
                  className="request-box__button"
                >
                  Get Started
                </button>
              </div>
            </RequestBox>
          </div>
        </div>
        <div>
          <SectionHeader>Top Brands</SectionHeader>
          <TopBrands itemType={itemType} />
        </div>
        <div>
          <DisplayNewArrivals />
        </div>
        <div>
          <SectionHeader>All Products</SectionHeader>
          <DisplayCards itemType={itemType} />
        </div>
      </main>
    </div>
  );
}
