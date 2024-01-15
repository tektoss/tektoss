/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { vehicleCat } from '../../CarPages/CarNewItem/components/categoryObj';
import { categoriesArray } from '../../Electronics/ElecNewItem/components/categoryObj';
// ... (import statements remain the same)

export default function MainCategories() {
  const navigate = useNavigate();
  const [showVehicleSubcategories, setShowVehicleSubcategories] = useState(false);
  const [showElectronicsSubcategories, setShowElectronicsSubcategories] = useState(false);

  const handleCatClick = (category) => {
    switch (category) {
      case 'vehicles':
        setShowVehicleSubcategories((prev) => !prev);
        setShowElectronicsSubcategories(false); // Hide electronics subcategories when clicking on vehicles
        break;
      case 'electronics':
        setShowElectronicsSubcategories((prev) => !prev);
        setShowVehicleSubcategories(false); // Hide vehicle subcategories when clicking on electronics
        break;
      default:
        navigate('/');
        break;
    }
  };

  const vehicleSubcategories = vehicleCat;
  const electronicsSubcategories = categoriesArray;

  return (
    <div>
      <ul>
        <li>
          <button onClick={() => handleCatClick('vehicles')}>
            <h6>Vehicles</h6>
          </button>
          {showVehicleSubcategories && (
            <ul>
              {vehicleSubcategories.map((vehicleType) => (
                <li key={vehicleType}>
                  <button onClick={() => navigate(`/vehicles/${vehicleType}`)}>
                    <h6>{vehicleType}</h6>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <button onClick={() => handleCatClick('electronics')}>
            <h6>Electronics</h6>
          </button>
          {showElectronicsSubcategories && (
            <ul>
              {electronicsSubcategories.map((category) => (
                <li key={category}>
                  <button onClick={() => navigate(`/Electronicscategory/${category}`)}>
                    <h6>{category}</h6>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}
