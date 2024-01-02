import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilter } from '../../../redux/slice/productsSlice';
import { categoriesArray } from '../../Electronics/ElecNewItem/components/categoryObj';
import { carMake } from '../../CarPages/CarNewItem/components/categoryObj';

export default function CategoriesBox() {
  const initialFilter = {
    maxPrice: 10000,
    minPrice: 0,
    location: 'all',
    category: 'all',
    condition: 'all',
  };
  const [isElectronicsCategoriesVisible, setElectronicsCategoriesVisible] = useState(false);
  const [isCarCategoriesVisible, setCarCategoriesVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClearFilter = (link) => {
    dispatch(setFilter({ ...initialFilter, updateTime: Date.now() }));
    navigate(link);
  };
  return (
    <div className="categories-container">
      <div className="category-container" onMouseEnter={() => setElectronicsCategoriesVisible(true)} onMouseLeave={() => setElectronicsCategoriesVisible(false)}>
        <span className="hover-text">Electronics </span>

        {isElectronicsCategoriesVisible && (
        <div className="search__categories-box">
          <ul>
            {categoriesArray.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => handleClearFilter(`/Electronicscategory/${category}`)}
                >
                  <h6>{category}</h6>
                </button>
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>
      <div className="category-container" onMouseEnter={() => setCarCategoriesVisible(true)} onMouseLeave={() => setCarCategoriesVisible(false)}>
        <span className="hover-text">Car Make</span>

        {isCarCategoriesVisible && (
        <div className="search__categories-box">
          <ul>
            {carMake.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => handleClearFilter(`/Carscategory/${category}`)}
                >
                  <h6>{category}</h6>
                </button>
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>
    </div>
  );
}
