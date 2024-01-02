/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { vehicleCat } from '../../CarPages/CarNewItem/components/categoryObj';
import { categoriesArray } from '../../Electronics/ElecNewItem/components/categoryObj';

export default function MainCategories() {
  // React hook to manage navigation within the app
  const navigate = useNavigate();

  // State variables to track the visibility of subcategories
  const [showVehicleSubcategories, setShowVehicleSubcategories] = useState(false);
  const [showElectronicsSubcategories, setShowElectronicsSubcategories] = useState(false);

  // Function to handle main category button click
  const handleCatClick = (category) => {
    // Toggle the visibility of subcategories based on the clicked category
    switch (category) {
      case 'Vehicles':
        // Toggle the state variable for showing/hiding vehicle subcategories
        setShowVehicleSubcategories((prev) => !prev);
        break;
      case 'Electronics':
        // Toggle the state variable for showing/hiding electronics subcategories
        setShowElectronicsSubcategories((prev) => !prev);
        break;
      default:
        // Navigate to the home page if an unknown category is clicked
        navigate('/');
        break;
    }
  };

  // Example subcategories for Vehicles and Electronics
  const vehicleSubcategories = vehicleCat;
  const electronicsSubcategories = categoriesArray;

  return (
    <div>
      {/* Main category list */}
      <ul>
        {/* Vehicles category */}
        <li>
          {/* Main category button with click handler */}
          <button onClick={() => handleCatClick('Vehicles')}>
            {/* <i className="fa-solid fa-car" /> */}
            {/* <h6>Vehicles</h6> */}
          </button>
          {/* Conditionally render vehicle subcategories if showVehicleSubcategories is true */}
          {showVehicleSubcategories && (
            <ul>
              {/* Map through vehicle subcategories and create buttons with click handlers */}
              {vehicleSubcategories.map((subCategory) => (
                <li key={subCategory}>
                  <button onClick={() => navigate(`/CarWelcomePage/${subCategory}`)}>
                    <h6>{subCategory}</h6>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
        {/* Electronics category */}
        <li>
          {/* Main category button with click handler */}
          <button onClick={() => handleCatClick('Electronics')}>
            {/* <i className="fa-solid fa-laptop" /> */}
            {/* <h6>Electronics</h6> */}
          </button>
          {/* Conditionally render electronics subcategories if showElectronicsSubcategories is true */}
          {showElectronicsSubcategories && (
            <ul>
              {/* Map through electronics subcategories and create buttons with click handlers */}
              {electronicsSubcategories.map((subCategory) => (
                <li key={subCategory}>
                  <button onClick={() => navigate(`/Electronicscategory/${subCategory}`)}>
                    <h6>{subCategory}</h6>
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
