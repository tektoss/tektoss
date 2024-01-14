/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SellElecNowButton from './SellElecNowButton';
import SellNowButton from '../../../components/SellNowButton'
// import SignInModal from './SignInModal';
import DrawerButton from './DrawerButton';
import { signOut } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectAuthState, setUserId, setUserInfo } from '../../../redux/slice/authSlice';
// import RegisterModal from './RegisterModal';
// import appName from '../../../Constants/constantVariables';
import { nameForLogo } from '../../../Constants/constantVariables';
import appLogo from '../../../assets/images/electrotossLogoWhite.png';
import movingLogo from '../../../assets/images/movingLogo.png'
import { doc, getDoc, onSnapshot } from '@firebase/firestore';
import { auth, db } from '../../../config/firebaseConfig';
import { selectWishListState, setWishlistIds } from '../../../redux/slice/wishListSlice';
import { selectNotificationState, setNotifications } from '../../../redux/slice/notificationSlice';
import useAssignDeviceId from '../../../Hooks/useAssignDeviceId';
import useGetUserLocation from '../../../Hooks/useGetUserLocation';
import { selectLocationState } from '../../../redux/slice/locationSlice';
import MobileLoginModal from './MobileLoginModal';
import SignInModal from '../../../auth/SignIn/SignInModal';
import SignUpModal from '../../../auth/Register/SignUpModal';
import ChatList from '../../ChatRoom/ChatRoom';
import ForgotPasswordModal from './ForgotPasswordModal';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishListCount } = useSelector(selectWishListState);
  const { loginInfo, userInfo } = useSelector(selectAuthState);
  const { notificationCount, messageCount } = useSelector(selectNotificationState);
  const { isAnonymous, uid } = loginInfo;
  const { displayName } = userInfo;
  
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showCategory, setshowCategory] = useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [userData, setUserData ] = useState({});
  
  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseSignInModal = () => setShowSignInModal(false);
  const handleShowSignInModal = () => setShowSignInModal(true);
  const handleShowForgotPasswordModal = () => setShowForgotPasswordModal(true);
  const handleCloseForgotPasswordModal = () => setShowForgotPasswordModal(false);
  const handleShowMobileModal = () => setShowJoinModal(true);
  const handleCloseMobileModal= () => setShowJoinModal(false);

  const handleClickWishList = (e) => {
    navigate('/wish-list');
  }
  
  const initialCountObject = { notificationCount: 0, messageCount: 0 };

  const { location } = useSelector(selectLocationState);

  const [countObject, setCountObject] = useState(initialCountObject);
  const [wishlistArray, setWishlistArray] = useState([]);

  const [search, setSearch] = useState('');

  useAssignDeviceId();
  useGetUserLocation();
 
  useEffect(() => {
    if(uid){
    const unsub = onSnapshot(doc(db, 'vendors', uid), (doc) => {
    const notificationCount = doc.data()?.newNotifications?.length || 0;
    const messageCount = doc.data()?.newMessages?.length || 0;
    const wishList = doc.data()?.wishlist?.length || 0;

    const dataJSON = JSON.stringify({ messageCount, notificationCount });
    localStorage.setItem('notificationsCounts', dataJSON);

    const wishListDataJSON = JSON.stringify({ wishList });
    localStorage.setItem('wishListCount', wishListDataJSON);

    setCountObject({ messageCount, notificationCount });
    dispatch(setNotifications({ messageCount, notificationCount }));
  });

    return () => {
      unsub();
    };
  }
  }, []);

  useEffect(() => {
    if(uid){
      const unsubWish = onSnapshot(doc(db, 'wishlists', uid), (doc3) => {
        const wishlist = doc3.data()?.itemIds || [];
        console.log('wishlist collection =>', doc3.data()); 
        setWishlistArray(wishlist);
        dispatch(setWishlistIds(wishlist));
      });

      return () => {
        unsubWish();
      };
    }
  }, [uid]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log("user from auth changed", user);
        dispatch(setUserId({ uid, isAnonymous: false }));

        if ( !userInfo.userInfoIsSet ){

          const docRef = doc(db, 'vendors', uid);
          const docSnapData = await getDoc(docRef);
          const userData = docSnapData.data();

          const userInfo = {
            emailVerified: user?.emailVerified ? user.emailVerified  : '',
            displayName: userData?.firstName || userData?.displayName,
            bio: userData?.bio,
            email: userData?.email,
            followers: userData?.followers,
            rating: userData?.rating,
            phoneNumber: userData?.phoneNumber,
            photoURL: userData?.photoURL,
          };

          const dataToStore = { isAnonymous: user?.isAnonymous };
          const dataJSON = JSON.stringify(dataToStore);

          localStorage.setItem('isAnonymous', dataJSON);

          dispatch(setUserInfo(userInfo));
        }
      } else {
        dispatch(setUserId({ uid, isAnonymous: true }));
      }
    });
  },[]);

  const handleCatPopOverClick = (name) => {
    setshowCategory(false);

    switch (name) {
      case 'Vehicles':
        navigate('/Vehicles');
        break;
      case 'Electronics':
        navigate('/Electronics');
        break;
      default:
        navigate('/');
        break;

    }
  }

  const handlePopOverClick = (name) => {
    setShowAccountModal(false);

    switch (name) {
      case 'my-account':
        navigate(`/user-account/${uid}`);
        break;
      case 'notifications':
        navigate('/notifications');
        break;
      case 'log-out':
        signOut(auth).then(() => {
          const userInfo = {
            emailVerified: false,
            userInfoIsSet: false,
            displayName: '',
            bio: '',
            email: '',
            followers: '',
            rating: '',
            phoneNumber: '',
            photoURL: '',
          };
          dispatch(setUserInfo(userInfo));

          const dataToStore = { isAnonymous: true };
          const dataJSON = JSON.stringify(dataToStore);

          const storeNotificationsCounts = { messageCount:0, notificationCount:0 };
          const storeNotificationsCountsJSON = JSON.stringify(storeNotificationsCounts);

          const storeWishListCount = { wishList:0 };
          const storeWishListCountJSON = JSON.stringify(storeWishListCount);

          localStorage.setItem('isAnonymous', dataJSON);
          localStorage.setItem('notificationsCounts', storeNotificationsCountsJSON);
          localStorage.setItem('wishListCount', storeWishListCountJSON);

          navigate('/');
          toast.success('Logout Successful', {
            position: 'top-center',
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
            });
        }).catch((error) => {
          toast.error(error.message, {
            position: 'top-center',
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
            });
        });
        break;
      default:
        navigate('/');
        break;
    }

  }

  const notificationsJSON = localStorage.getItem('notificationsCounts');
  const notificationsData = JSON.parse(notificationsJSON);

  const wishListCountJSON = localStorage.getItem('wishListCount');
  const wishListData = JSON.parse(wishListCountJSON);

  const handleSubmit = () => {
    if (search.trim().length > 0) {
      navigate(`/search/${search}`);
      setSearch('');
    }
  };

  return (
    <>
      <nav id="page-top" className={toggleDrawer ? 'navbar-custom toggled':'navbar-custom'}>
        <div className="navbar-custom__top-div">
        <div className="navbar-custom__top-div__inner-div"> 
        <div className="navbar-custom__top-brand-div">
            <Link to="/" className="navbar-custom__brand">
            <span>
                <img className="navbar-custom__app-logo" src={appLogo} alt={nameForLogo} />
              </span>
              <span className="h2 navbar-custom__brand-text">
              <span style={{ color: 'White', fontWeight: 'bold' }}>irloz</span>
              </span>
            </Link>
            <p>Electronic Gadgets Marketplace</p>
          </div>
          <ul className="d-flex justify-content-end align-items-center">
            { !isAnonymous && <li>
              <button className="navbar-custom__icon-button" title="notifications" onClick={() => navigate("/notifications")}>
                <i className="fa-regular fa-bell navbar-custom__icon" />
                <div className="navbar-custom__icon-button__text-div">
                  <p>Activity Info</p>
                  <h6>My Notifications</h6>
                </div>
                {notificationsData?.notificationCount > 0 && (<div className="navbar-custom__data-count">{ notificationsData?.notificationCount }</div>)}
              </button>
            </li>}
            { !isAnonymous && <li>
              <button className="navbar-custom__icon-button" title="message" onClick={() => navigate("/messages")}>
                <i className="fa-regular fa-message navbar-custom__icon" />
                <div className="navbar-custom__icon-button__text-div">
                  <p>Chats</p>
                  <h6>My Messages</h6>
                </div>
                { notificationsData?.messageCount > 0 && (<div className="navbar-custom__data-count">{ notificationsData?.messageCount }</div>)}
              </button>
            </li>}
            {/* { !isAnonymous && <li>
              <button className="navbar-custom__icon-button" title="message" onClick={() => navigate("/chat-room")}>
                <i className="fa-regular fa-message navbar-custom__icon" />
                <div className="navbar-custom__icon-button__text-div">
                  <p>Chats</p>
                  <h6>My Messages</h6>
                </div>
                { notificationsData?.messageCount > 0 && (<div className="navbar-custom__data-count">{ notificationsData?.messageCount }</div>)}
              </button>
            </li>} */}
            { !isAnonymous && <li>
              <button className="navbar-custom__icon-button" title="wish list" onClick={handleClickWishList}>
                <i className="fa-regular fa-heart navbar-custom__icon" />
                <div className="navbar-custom__icon-button__text-div">
                  <p>Favorites</p>
                  <h6>My Wish List</h6>
                </div>
                { wishlistArray?.length > 0 && (<div className="navbar-custom__data-count">{ wishlistArray?.length }</div>) }
              </button>
            </li>}
            { !isAnonymous && <li>
              <div className="navbar-custom__user-account-div">
                <button className="navbar-custom__icon-button" title="user account" onClick={() => setShowAccountModal(!showAccountModal)}>
                  <i className="fa-regular fa-user navbar-custom__icon" />
                  <div className="navbar-custom__icon-button__text-div">
                    <p>Account</p>
                    <h6>{ displayName ? `Hi ${displayName.split(' ')[0]}` : 'My User Profile' }</h6>
                </div>
                </button>
                <ul className={ !showAccountModal ? 'pop-over-hidden' : 'navbar-custom__user-account-div__pop-over'}>
                  <li>
                    <button name="my-account" onClick={() => handlePopOverClick("my-account")} role="button" className="navbar-custom__user-account-div__pop-over-button">
                      <i className="fa-solid fa-user" />
                      <h6>my account</h6>
                    </button>
                  </li>
                  <li>
                    <button name="log-out" onClick={() => handlePopOverClick("log-out")} role="button" className="navbar-custom__user-account-div__pop-over-button">
                      <i className="fa-sharp fa-solid fa-arrow-right-from-bracket" />
                      <h6>log out</h6>
                    </button>
                  </li>
                </ul>
              </div>
            </li>}
            { isAnonymous && <li>
              <button className="navbar-custom__text-button navbar-custom__sign-in" onClick={handleShowSignInModal}>
                <h6>Sign In</h6>
              </button>
            </li>}
            { isAnonymous && <li>
              <button className="navbar-custom__text-button navbar-custom__register" onClick={handleShowRegisterModal}>
                <h6>Register Now</h6>
              </button>
            </li>}
          </ul>
          </div>
        </div>
        <div className="navbar-custom__bottom-div">
          <div className="navbar-custom__brand-div">
            <Link to="/" className="navbar-custom__brand">
            <span>
                <img className="navbar-custom__app-logo" src={movingLogo} alt={nameForLogo} />
              </span>
              <span className="h2 navbar-custom__brand-text">
              <span style={{ color: 'White', fontWeight: 'bold' }}>irloz</span>
              </span>
            </Link>
            <p>Electronic Gadgets Marketplace</p>
          </div>
          <div className="bottom-nav__content-search-div navbar-custom__search-div">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="What are you looking for"
          />

<div className="navbar-custom__category-div">
                <button className="navbar-custom__icon-button" onClick={() => setshowCategory(!showCategory)}>
                  <div className="navbar-custom__icon-button__text-div">
                  <p className="navbar-custom__categories-text">Categories</p>
                  <span className="navbar-custom__dropdown-arrow">&#9662;</span>
                </div>
                </button>
                <ul className={ !showCategory ? 'pop-over-hidden' : 'navbar-custom__category-div__pop-over'}>
                  <li>
                    <button name="Vehicles" onClick={() => handleCatPopOverClick("Vehicles")} role="button" className="navbar-custom__category-div__pop-over-button">
                      <i className="fa-solid fa-car" />
                      <h6>Vehicles</h6>
                    </button>
                  </li>
                  <li>
                    <button name="Electronics" onClick={() => handleCatPopOverClick("Electronics")} role="button" className="navbar-custom__category-div__pop-over-button">
                      <i className="fa-solid fa-laptop" />
                      <h6>Electronics</h6>
                    </button>
                  </li>
                </ul>
              </div>

          <button
            className="bottom-nav__content-search-button"
            type="button"
            onClick={handleSubmit}
          >
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </div>
          <SellNowButton />
          <DrawerButton
            setToggleDrawer={setToggleDrawer}
            toggleDrawer={toggleDrawer}
            handleShowRegisterModal={handleShowRegisterModal}
            handleShowSignInModal={handleShowSignInModal}
            notificationCount={notificationsData?.notificationCount}
            wishListCount={ wishListData?.wishList }
            messageCount={ notificationsData?.messageCount }
          />
        </div>
      </nav>
      <MobileLoginModal showJoinModal={showJoinModal} handleCloseMobileModal={handleCloseMobileModal} />
      <SignUpModal handleCloseRegisterModal={handleCloseRegisterModal} showRegisterModal={showRegisterModal} handleShowSignInModal={handleShowSignInModal} handleShowRegisterModal={handleShowRegisterModal} />
      <SignInModal handleCloseSignInModal={handleCloseSignInModal} showSignInModal={showSignInModal} handleShowRegisterModal={handleShowRegisterModal} handleShowSignInModal={handleShowSignInModal} />
    </>
  );
}

export default Navbar;