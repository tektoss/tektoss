import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  emptyProductsList, setCoordinate, setCategoryFilter, setSelectedModel,
} from '../../../../redux/slice/productsSlice';
import { vehiclesArray } from '../../CarNewItem/components/categoryObj';

export default function CategoryFilterCard({ vehicleType }) {
  const initialFilter = {
    maxPrice: 10000,
    minPrice: 0,
    location: 'all',
    make: 'all',
    model: 'all',
    condition: 'all',
    vehicleType,
    maxYear: 2024,
    minYear: 2000,
  };
  console.log('here vehicleType:', vehicleType);

  const dispatch = useDispatch();
  // const [getBrandsArray, setGetBrandsArray] = useState([]);
  const [filterObj, setFilterObj] = useState(initialFilter);

  const priceGap = 900;

  // const { brand } = useParams();
  const [SelectedMake, setSelectedMake] = useState(initialFilter.make);
  // const [SelectedModel, setSelectedModel] = useState(initialFilter.model);

  // useEffect(() => {
  //   const getBrandArray = (categoryName) => {
  //     switch (categoryName) {
  //       case 'Motorcycles':
  //         return vehiclesArray.Motorcycles;
  //       case 'Cars and Trucks':
  //         return vehiclesArray['Cars and Trucks'];
  //       case 'campers_rvs_categories':
  //         return vehiclesArray.campers_rvs_categories;
  //       case 'boats_marine_categories':
  //         return vehiclesArray.boats_marine_categories;
  //       case 'Trailers':
  //         return vehiclesArray.Trailers;
  //       default:
  //         return null;
  //     }
  //   };

  //   const brands = getBrandArray(category);

  //   setGetBrandsArray(brands);
  // }, [category]);

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
  const yearGap = 1;
  const handleMinYearChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 2000 && value < (filterObj.maxYear - yearGap)) {
      setFilterObj({ ...filterObj, minYear: value });
    }
  };

  const handleMaxYearChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > (filterObj.minYear + yearGap) && value <= 2024) {
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

  const handleMaxTextChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > filterObj.minPrice && value <= 10000) {
      setFilterObj({ ...filterObj, maxPrice: value });
    } else {
      setFilterObj({ ...filterObj, maxPrice: 10000 });
    }
  };
  const handleMinYearTextChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value < filterObj.maxYear) {
      setFilterObj({ ...filterObj, minYear: value });
    } else {
      setFilterObj({ ...filterObj, minYear: 2000 });
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

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilterObj({ ...filterObj, [name]: value });
  };

  const handleMakeChange = (e) => {
    const { name, value } = e.target;
    setFilterObj({ ...filterObj, [name]: value });
    setSelectedMake(value);
  };

  const handleModelChange = (e) => {
    const { name, value } = e.target;
    setFilterObj({ ...filterObj, [name]: value });
    dispatch(setSelectedModel(value));
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
    dispatch(setCategoryFilter({ ...filterObj, updateTime: Date.now() }));
  };

  const handleResetFilter = (e) => {
    e.preventDefault();
    e.target.reset();
    setFilterObj(initialFilter);
    dispatch(setCategoryFilter({ ...initialFilter, updateTime: Date.now() }));
  };

  return (
    <form className="filter-card" onSubmit={handleResetFilter}>
      {/* <div className="filter-card__location-div">
        <h6>Location</h6>
        <select
          className="form-select"
          aria-label="Default select example"
          name="location"
          onChange={handleSelectChange}
        >
          <option value="all">All</option>
          <option value="Near">Items near me (within 5 miles)</option>
        </select>
      </div> */}
      <div className="filter-card__category-div">
        <h6>Car Make</h6>
        <select
          className="form-select"
          aria-label="Default select example"
          name="make"
          onChange={handleMakeChange}
        >
          {
            Object.keys(vehiclesArray[vehicleType])?.map((make) => (
              <option value={make} key={make}>{make}</option>
            ))
          }
        </select>
      </div>
      <div className="filter-card__category-div">
        <h6>Car Model</h6>
        <select
          className="form-select"
          aria-label="Default select example"
          name="model"
          onChange={handleModelChange}
        >
          {
            vehiclesArray[vehicleType]?.[SelectedMake]?.map((model) => (
              <option value={model} key={model}>{model}</option>
            ))
          }
        </select>
      </div>
      <div className="filter-card__price-range-div">
        <h6>Car Years</h6>
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
            <input type="range" className="filter-card__range filter-card__range-min" min="2000" max="2024" value={filterObj.minYear} step="2" onChange={handleMinYearChange} />
            <input type="range" className="filter-card__range filter-card__range-max" min="2000" max="2024" value={filterObj.maxYear} step="2" onChange={handleMaxYearChange} />
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
        <h6>Vehicle Condition</h6>
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
