import React from 'react';
import { Link } from 'react-router-dom';

export default function DisplayCarElectronic() {
  return (
    <div>

      {/* Button for Page 1 */}
      <Link to="/ElectronicsWelcomePage">
        <button type="button">Explore electronics</button>
      </Link>

      <Link to="/CarWelcomePage">
        <button type="button">Explore Vehicles</button>
      </Link>
    </div>
  );
}
