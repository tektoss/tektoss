/* eslint-disable quote-props */
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilter } from '../../../../redux/slice/productsSlice';
import { vehiclesArray } from '../../CarNewItem/components/categoryObj';

export default function CategoriesBox() {
  const vehicleCategory = useSelector((state) => state.products.selectedCategory);
  const initialFilter = {
    maxPrice: 10000,
    minPrice: 0,
    location: 'all',
    category: 'all',
    condition: 'all',
  };
  const [getBrandsArray, setGetBrandsArray] = useState([]);

  console.log('here is the thing', vehicleCategory);
  useEffect(() => {
    const getBrandArray = (categoryName) => {
      switch (categoryName) {
        case 'Motorcycles':
          return vehiclesArray.Motorcycles;
        case 'Cars & Trucks':
          return vehiclesArray['Cars & Trucks'];
        case 'Campers & RVs':
          return vehiclesArray['Campers & RVs'];
        case 'Boats & Marine':
          return vehiclesArray['Boats & Marine'];
        case 'Trailers':
          return vehiclesArray.Trailers;
        default:
          return null;
      }
    };

    const brands = getBrandArray(vehicleCategory);
    console.log('here is the two', brands);

    setGetBrandsArray(brands);
  }, [vehicleCategory]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClearFilter = (link) => {
    dispatch(setFilter({ ...initialFilter, updateTime: Date.now() }));
    navigate(link);
  };
  console.log('here are the brands', getBrandsArray);
  return (
    <div className="search__categories-box">
      <ul>
        {
          Object.keys(getBrandsArray)?.map((categories) => (
            <li>
              <button type="button" onClick={() => handleClearFilter(`/CarWelcomePage/${vehicleCategory}/${categories}`)}><h6>{categories}</h6></button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
