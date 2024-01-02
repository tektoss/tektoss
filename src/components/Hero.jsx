import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import guyPointingDown from '../assets/images/guyPointingDown.png';
// import womanHoldingLaptop from '../assets/images/womanHoldingLaptop.png';
// import SellNowButton from './SellNowButton';
// import appName from '../Constants/constantVariables';

export default function Hero() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim().length > 0) {
      navigate(`/search/${search}`);
    }
  };

  return (
    <div className="hero hero-hidden">
      <div className="hero__search-div d-flex">
        <div className="hero__form">
          <form className="hero__form-element" onSubmit={handleSubmit}>
            <input className="hero__search-div__input" value={search} placeholder="Searching for a Car or an Electronic Device?" onChange={(e) => setSearch(e.target.value)} />
            <button type="submit" className="hero__search-div__button">Search</button>
          </form>
        </div>
        {/* <img src={guyPointingDown} className="hero__search-div__image" alt="guy pointing down" /> */}
      </div>
    </div>
  );
}
