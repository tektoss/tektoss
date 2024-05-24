import React from 'react';
import { Link } from 'react-router-dom';
import appName from '../../Constants/constantVariables';
import appLogo from '../../assets/images/electrotoss.png';

export default function AuthNav() {
  return (
    <nav id="page-top" className={false ? 'navbar-custom toggled' : 'navbar-custom'}>
      <div className="navbar-custom__top-div alt">
        <div className="navbar-custom__top-div__inner-div">
          <div className="navbar-custom__top-brand-div">
            <Link to="/" className="navbar-custom__brand">
              <span>
                <img className="navbar-custom__app-logo" src={appLogo} alt={appName} />
              </span>
              <span className="h2 navbar-custom__brand-text alt">
                { appName }
              </span>
            </Link>
            <p>A multi-purpose Place</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
