import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  emptyProductsList, setCoordinate, setFilter, setSelectedCategory,
} from '../../../redux/slice/productsSlice';

import { vehicleCat } from '../CarNewItem/components/categoryObj';
// import CategoriesBox from '../CarSearchResult/components/CategoriesBox';

export default function FilterCard() {
  const initialFilter = {
    maxPrice: 10000,
    minPrice: 0,
    minYear: 2000,
    maxYear: 2024,
    // make: 'all',
    // model: 'all',
    location: 'all',
    category: 'all',
    condition: 'all',
  };

  const dispatch = useDispatch();
  const [filterObj, setFilterObj] = useState(initialFilter);

  const priceGap = 900;

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value < (filterObj.maxPrice - priceGap)) {
      setFilterObj({ ...filterObj, minPrice: value });
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > (filterObj.minPrice + priceGap) && value <= 10000) {
      setFilterObj({ ...filterObj, maxPrice: value });
    }
  };

  const yearGap = 24;
  const handleMinYearChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value < filterObj.maxYear - yearGap) {
      setFilterObj({ ...filterObj, minYear: value });
    }
  };

  const handleMaxYearChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > filterObj.minYear && value <= 2024) {
      setFilterObj({ ...filterObj, maxYear: value });
    }
  };

  const handleMinTextChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value < filterObj.maxPrice) {
      setFilterObj({ ...filterObj, minPrice: value });
    } else {
      setFilterObj({ ...filterObj, minPrice: 0 });
    }
  };

  const handleMinYearTextChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 2000 && value < filterObj.maxYear) {
      setFilterObj({ ...filterObj, minYear: value });
    } else {
      setFilterObj({ ...filterObj, minPrice: 2000 });
    }
  };
  const handleMaxYearTextChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > filterObj.minYear && value <= 2024) {
      setFilterObj({ ...filterObj, maxYear: value });
    } else {
      setFilterObj({ ...filterObj, maxYear: 2024 });
    }
  };

  const handleMaxTextChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > filterObj.minPrice && value <= 10000) {
      setFilterObj({ ...filterObj, maxPrice: value });
    } else {
      setFilterObj({ ...filterObj, maxPrice: 10000 });
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilterObj({ ...filterObj, [name]: value });
    dispatch(setSelectedCategory(value));
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        dispatch(setCoordinate({ latitude, longitude }));
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const handleFilter = () => {
    if (filterObj.location !== 'all') { fetchCurrentLocation(); }
    dispatch(emptyProductsList());
    dispatch(setFilter({ ...filterObj, updateTime: Date.now() }));
  };

  const handleResetFilter = (e) => {
    e.preventDefault();
    e.target.reset();
    setFilterObj(initialFilter);
    dispatch(setFilter({ ...initialFilter, updateTime: Date.now() }));
  };

  return (
    <form className="filter-card" onSubmit={handleResetFilter}>
      <div className="filter-card__category-div">
        <h6>Category</h6>
        <select
          className="form-select"
          aria-label="Default select example"
          name="category"
          onChange={handleSelectChange}
        >
          <option value="all">All</option>
          {
            vehicleCat.map((category) => (
              <option value={category} key={category}>{category}</option>
            ))
          }
        </select>

      </div>

      <div className="filter-card__price-range-div">
        <h6>Vehicle Year</h6>
        <div className="filter-card__range-div">
          <div className="filter-card__price-input">
            <div className="filter-card__field">
              <input type="number" className="filter-card__input" value={filterObj.minYear} onChange={handleMinYearTextChange} />
            </div>
            <div className="filter-card__separator">-</div>
            <div className="filter-card__field">
              <input type="number" className="filter-card__input" value={filterObj.maxYear} onChange={handleMaxYearTextChange} />
            </div>
          </div>
          <div className="filter-card__slider">
            <div
              className="filter-card__progress"
              style={{
                left: `${((filterObj.minYear - 2000) / (2024 - 2000)) * 100}%`,
                right: `${((2024 - filterObj.maxYear) / (2024 - 2000)) * 100}%`,
              }}
            />
          </div>
          <div className="filter-card__range-input">
            <input type="range" className="filter-card__range filter-card__range-min" min="2000" max="2024" value={filterObj.minYear} step="1" onChange={handleMinYearChange} />
            <input type="range" className="filter-card__range filter-card__range-max" min="2000" max="2024" value={filterObj.maxYear} step="1" onChange={handleMaxYearChange} />
          </div>
        </div>
      </div>

      <div className="filter-card__price-range-div">
        <h6>Price Range</h6>
        <div className="filter-card__range-div">
          <div className="filter-card__price-input">
            <div className="filter-card__field">
              <span>$</span>
              <input type="number" className="filter-card__input" value={filterObj.minPrice} onChange={handleMinTextChange} />
            </div>
            <div className="filter-card__separator">-</div>
            <div className="filter-card__field">
              <span>$</span>
              <input type="number" className="filter-card__input" value={filterObj.maxPrice} onChange={handleMaxTextChange} />
            </div>
          </div>
          <div className="filter-card__slider">
            <div className="filter-card__progress" style={{ left: `${filterObj.minPrice / 100}%`, right: `${100 - (filterObj.maxPrice / 100)}%` }} />
          </div>
          <div className="filter-card__range-input">
            <input type="range" className="filter-card__range filter-card__range-min" min="0" max="10000" value={filterObj.minPrice} step="100" onChange={handleMinPriceChange} />
            <input type="range" className="filter-card__range filter-card__range-max" min="0" max="10000" value={filterObj.maxPrice} step="100" onChange={handleMaxPriceChange} />
          </div>
        </div>
      </div>
      <div className="filter-card__category-div">
        <h6>Car Condition</h6>
        <select
          className="form-select"
          aria-label="Default select example"
          name="condition"
          onChange={handleSelectChange}
        >
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="slightly used">Slightly Used</option>
          <option value="used">Used</option>
        </select>
      </div>

      <div className="filter-card__reset-div d-flex justify-content-between">
        <button
          type="button"
          className="filter-card__filter-button"
          onClick={handleFilter}
        >
          Filter
        </button>
        <button
          type="submit"
          className="filter-card__reset-button"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
