import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFilter } from '../../../redux/slice/productsSlice';
import { categoriesArray } from '../ElecNewItem/components/categoryObj';

export default function CategoriesBox() {
  const dispatch = useDispatch();
  const initialFilter = {
    maxPrice: 10000,
    minPrice: 0,
    location: 'all',
    category: 'all',
    condition: 'all',
  };

  const handleClearFilter = () => {
    dispatch(setFilter({ ...initialFilter, updateTime: Date.now() }));
  };

  return (
    <div className="search__categories-box">
      <ul>
        {categoriesArray.map((category) => (
          <li key={category}>
            <Link
              to={`/Electronicscategory/${category}`}
              onClick={handleClearFilter}
              style={{
                backgroundColor: 'white', color: 'purple', padding: '15px', borderRadius: '15%', display: 'inline-block', margin: '4px',
              }}
            >
              <h6>{category}</h6>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
