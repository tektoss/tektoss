import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../../redux/slice/authSlice';
import SignUpModal from '../../../auth/Register/SignUpModal';
import SignInModal from '../../../auth/SignIn/SignInModal';

export default function SellCarNowButton() {
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
    return (
      <Link to="/vehicles/CarNewItem" className="sell-now">
        <h6>Sell Your Car</h6>
      </Link>
    );
  }

  return (
    <>
      <button type="button" className="btn btn-primary sell-now" onClick={handleShowSignInModal}>
        Sell Your Car
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
