import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFilter } from '../../../redux/slice/productsSlice';

export default function CategoriesBox() {
  const dispatch = useDispatch();
  const initialFilter = {
    maxPrice: 10000,
    minPrice: 0,
    minYear: 2000,
    maxYear: 2024,
    make: 'all',
    model: 'all',
    location: 'all',
    category: 'all',
    condition: 'all',
  };
  const vehicleCat = ['Motorcycles',
    'Cars & Trucks',
    'Campers & RVs',
    'Boats & Marine',
    'Powersport vehicles',
    'Trailers',
    'Tires & Rims',
    'Auto parts & Accessories',
  ];

  const handleClearFilter = () => {
    dispatch(setFilter({ ...initialFilter, updateTime: Date.now() }));
  };

  return (
    <div className="search__categories-box">
      <ul>
        {vehicleCat.map((category) => (
          <li key={category}>
            <Link
              to={`/vehicles/${category}`}
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
