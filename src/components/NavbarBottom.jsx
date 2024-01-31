/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-named-as-default
import { nameForLogo } from '../Constants/constantVariables';
import movingLogo from '../assets/images/movingLogo.png';

export default function NavbarBottom() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      const triggerHeight = 50;

      setIsScrolled(scrollHeight > triggerHeight);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (search.trim().length > 0) {
      navigate(`/search/${search}`);
      setSearch('');
    }
  };

  return (
    <div className={`bottom-nav ${isScrolled ? 'bottom-nav--scrolled' : ''}`}>
      <div className="bottom-nav__content">
        <div className="navbar-custom__top-brand-div">
          <Link to="/" className="navbar-custom__brand">
            <span>
              <img className="navbar-custom__app-logo" src={movingLogo} alt={nameForLogo} />
            </span>
            <span className="h2 navbar-custom__brand-text">
              <span style={{ color: 'White', fontWeight: 'bold' }}>irloz</span>
            </span>
          </Link>
          <p>Vehicles and Electronic Gadgets Marketplace</p>
        </div>
        <div className="bottom-nav__content-search-div">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="What are you looking for"
          />
          <button
            className="bottom-nav__content-search-button"
            type="button"
            onClick={handleSubmit}
          >
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </div>
        {/* <Link to="/" className="bottom-nav__home-icon-link"> */}
        {/* <i className="fa-solid fa-house" /> */}
        {/* <h6>Home</h6> */}
        <div className="bottom-nav__content-cat-div" style={{ marginRight: '20px' }}>
          <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
            <li style={{ marginRight: '0.5px' }}>
              <Link to="/electronics" className="link">
                <button
                  name="electronics"
                  role="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white', // Replace 'your-desired-color' with the color you want
                    cursor: 'pointer',
                  }}
                >
                  <h6>Electronics</h6>
                </button>
              </Link>
            </li>
            <li style={{ marginRight: '0.5px' }}>
              <Link to="/vehicles" className="link">
                <button
                  name="vehicles"
                  role="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white', // Replace 'your-desired-color' with the color you want
                    cursor: 'pointer',
                  }}
                >
                  <h6>Vehicles</h6>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
