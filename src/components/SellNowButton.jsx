/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../redux/slice/authSlice';
import SignUpModal from '../auth/Register/SignUpModal';
import SignInModal from '../auth/SignIn/SignInModal';

const ButtonWithLinks = () => {
  // State to track whether links are visible or hidden
  const [areLinksVisible, setAreLinksVisible] = useState(false);

  // State to track whether the "Sell Now" button should be visible
  const [isSellNowVisible, setIsSellNowVisible] = useState(true);

  // Function to toggle the visibility of links
  const toggleLinks = () => {
    // Hide the "Sell Now" button and show the links
    setIsSellNowVisible(false);
    setAreLinksVisible(true);
  };

  return (
    <div>
      {/* Button that will trigger the display of links */}
      {isSellNowVisible && (
        <button onClick={toggleLinks} className="sell-now-main" style={{ textAlign: 'right' }}>
          Sell Now
        </button>
      )}

      {/* Container for the links with conditional rendering based on state */}
      {areLinksVisible && (
        <div>
          {/* Two links/buttons */}
          <Link to="/CarWelcomePage/CarNewItem" className="sell-now">
            Sell Cars
          </Link>
          <Link to="/ElectronicsWelcomePage/ElecNewItem" className="sell-now">
            Sell Electronics
          </Link>
        </div>
      )}
    </div>
  );
};

export default function SellNowButton() {
  const { loginInfo } = useSelector(selectAuthState);
  const { isAnonymous } = loginInfo;

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseSignInModal = () => setShowSignInModal(false);
  const handleShowSignInModal = () => setShowSignInModal(true);

  const isAnonymousJSON = localStorage.getItem('isAnonymous');
  const userAnonymous = JSON.parse(isAnonymousJSON);
  const userIsAnonymous = userAnonymous?.isAnonymous || isAnonymous;

  if (!userIsAnonymous) {
    return <ButtonWithLinks />;
  }

  return (
    <>
      <button type="button" className="btn btn-primary sell-now" onClick={handleShowSignInModal}>
        Sell Now
      </button>

      <SignUpModal
        handleShowRegisterModal={handleShowRegisterModal}
        showRegisterModal={showRegisterModal}
        handleCloseRegisterModal={handleCloseRegisterModal}
        handleShowSignInModal={handleShowSignInModal}
      />

      <SignInModal
        showSignInModal={showSignInModal}
        handleCloseSignInModal={handleCloseSignInModal}
        handleShowSignInModal={handleShowSignInModal}
        handleShowRegisterModal={handleShowRegisterModal}
      />
    </>
  );
}
