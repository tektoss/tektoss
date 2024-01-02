import React from 'react';
import { useParams } from 'react-router-dom';

export default function CategoryInfoBox() {
  const { brand } = useParams();

  return (
    <div className="search-info-box">
      <h4 className="search-info-box__capitalize">
        {brand}
      </h4>
    </div>
  );
}
