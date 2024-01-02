import React from 'react';
import VehicleProductCard from '../../components/VehicleProductCard';

export default function SearchResultems() {
  return (
    <div className="search-result-items">
      <div className="row g-2">
        <div className="col-6 col-md-3">
          <VehicleProductCard />
        </div>
        <div className="col-6 col-md-3">
          <VehicleProductCard />
        </div>
        <div className="col-6 col-md-3">
          <VehicleProductCard />
        </div>
        <div className="col-6 col-md-3">
          <VehicleProductCard />
        </div>
        <div className="col-6 col-md-3">
          <VehicleProductCard />
        </div>
        <div className="col-6 col-md-3">
          <VehicleProductCard />
        </div>
        <div className="col-6 col-md-3">
          <VehicleProductCard />
        </div>
        <div className="col-6 col-md-3">
          <VehicleProductCard />
        </div>
        <div className="col-6 col-md-3">
          <VehicleProductCard />
        </div>
        <div className="col-6 col-md-3">
          <VehicleProductCard />
        </div>
      </div>
    </div>
  );
}
