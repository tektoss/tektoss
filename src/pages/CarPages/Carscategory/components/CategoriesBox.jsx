/* eslint-disable quote-props */
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilter } from '../../../../redux/slice/productsSlice';
import { carMake } from '../../CarNewItem/components/categoryObj';

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

  const vehiclesArray = {
    'Motorcycles': [
      'Yamaha',
      'Honda',
      'Harley-Davidson',
      'BMW',
      'Kawasaki',
      'Ducati',
      'KTM',
      'Triumph',
      'Suzuki',
      'Aprilia',
      'Indian Motorcycle',
      'Moto Guzzi',
      'MV Agusta',
      'Royal Enfield',
      'Benelli',
      'Bajaj',
      'Norton',
      'Victory',
      'Bimota',
      'Hero',
    ],

    'Cars & Trucks': carMake,

    'Campers & RVs': [
      'Travel Trailers',
      'Fifth Wheels',
      'Class A Motorhomes',
      'Class B Motorhomes (Camper Vans)',
      'Class C Motorhomes',
      'Pop-Up Campers',
      'Truck Campers',
      'Teardrop Trailers',
      'Toy Haulers',
      'Park Models',
      'Airstream Trailers',
      'Hybrid Trailers',
      'Bus Conversions',
      'Off-Road RVs',
      'Vintage Trailers',
      'Expandable Trailers',
      'Trailer Tents',
      'Small RVs for Couples',
      'Luxury RVs',
      'Compact Motorhomes',
    ],
    'Boats & Marine': [
      'Powerboats',
      'Sailboats',
      'Personal Watercraft',
      'Pontoon Boats',
      'Yachts',
      'Fishing Boats',
      'Jet Boats',
      'Houseboats',
      'Dinghies',
      'Canoes',
      'Kayaks',
      'Inflatable Boats',
      'Catamarans',
      'Trawlers',
      'Deck Boats',
      'Bowriders',
      'Cruisers',
      'Ski Boats',
      'Wakeboard Boats',
      'Runabouts',
    ],
    Trailers: [

      'Trailers'],
  };
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
          getBrandsArray?.map((categories) => (
            <li>
              <button type="button" onClick={() => handleClearFilter(`/CarWelcomePage/${vehicleCategory}/${categories}`)}><h6>{categories}</h6></button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
