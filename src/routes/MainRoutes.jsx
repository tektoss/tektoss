import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
// import Home from '../pages/Electronics/Home/Home';
import SingleElectronicItem from '../pages/Electronics/SingleItem/SingleElectronicItem';
import SingleVehicleItem from '../pages/CarPages/SingleItem/SingleVehicleItem';
import '../styles/main.css';
import ChatRoom from '../pages/ChatRoom/ChatRoom';
import ElectronicSearchResult from '../pages/Electronics/ElectronicSearchResult/ElectronicSearchResult';
import CarSearchResult from '../pages/CarPages/CarSearchResult/CarSearchResult';
import SearchResult from '../pages/SearchResult/SearchResult';
import UserAccount from '../pages/UserAccount/UserAccount';
import ElecNewItem from '../pages/Electronics/ElecNewItem/ElecNewItem';
import WishList from '../pages/WishList/WishList';
import Notifications from '../pages/Electronics/Notifications/Notifications';
import ElectronicsCategory from '../pages/Electronics/ElectronicsCategory/ElectronicsCategory';
import VehicleTypeCategory from '../pages/CarPages/VehicleTypeCategory/VehicleTypeCategory';
import Carscategory from '../pages/CarPages/Carscategory/Carscategory';
import Checkout from '../pages/CheckoutPage/CheckoutForm';
import EditProfile from '../pages/Electronics/EditProfile/EditProfile';
import PaymentSuccess from '../pages/Electronics/PaymentSucess/PaymentSuccess';
import About from '../pages/AboutPage/About';
import TermsAndConditions from '../pages/TermsAndConditions/TermsAndConditions';
import FindCloserItems from '../pages/Electronics/FindCloserItems/FindCloserItems';
import Test from '../pages/Test';
import EditElectronicItem from '../pages/Electronics/EditItem/EditItem';
import EditVehicleItem from '../pages/CarPages/EditItem/EditItem';
import UserNotVerified from '../pages/UserNotVerified/UserNotVerified';
import MobileChatRoom from '../pages/Electronics/MobileChatRoom/MobileChatRoom';
import MobileChatWall from '../pages/Electronics/MobileChatWall/MobileChatWall';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import NewArrivals from '../pages/Electronics/NewArrivals/NewArrivals';
import Messages from '../pages/Electronics/Messages/Messages';
import MobileSettings from '../pages/Electronics/MobileSettings/MobileSettings';
import SupportPage from '../pages/SupportPage/SupportPage';
import ElectronicsWelcomePage from '../pages/Electronics/ElectronicsWelcomePage/ElectronicsWelcomePage';
import CarWelcomePage from '../pages/CarPages/CarWelcomePage/CarWelcomePage';
import CarNewItem from '../pages/CarPages/CarNewItem/CarNewItem';
import AllNewItem from '../pages/AllNewItem/AllNewItem';

export default function MainRoutes() {
  useEffect(() => {
    ReactGA.initialize('G-J27ZXB98L6');
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/CarWelcomePage" element={<CarWelcomePage />} />
        <Route path="/ElectronicsWelcomePage" element={<ElectronicsWelcomePage />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/Electronicsearch/:searchName" element={<ElectronicSearchResult />} />
        <Route path="/search/:searchName" element={<SearchResult />} />
        <Route path="CarWelcomePage/Carsearch/:searchName" element={<CarSearchResult />} />
        <Route path="/CarWelcomePage/CarNewItem" element={<CarNewItem />} />
        <Route path="/single-electronic/:id" element={<SingleElectronicItem />} />
        <Route path="/single-vehicle/:id" element={<SingleVehicleItem />} />
        <Route path="/chat-room" element={<ChatRoom />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/Electronicscategory/:category" element={<ElectronicsCategory />} />
        <Route path="/CarWelcomePage/:vehicleType" element={<VehicleTypeCategory />} />
        <Route path="/CarWelcomePage/:vehicleType/:make" element={<Carscategory />} />
        <Route path="/all-new-item" element={<AllNewItem />} />
        <Route path="/ElectronicsWelcomePage/ElecNewItem" element={<ElecNewItem />} />
        <Route path="/user-account/:id" element={<UserAccount />} />
        <Route path="/wish-list" element={<WishList />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/checkoutform" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/about" element={<About />} />
        <Route path="/termsAndConditions" element={<TermsAndConditions />} />
        <Route path="/supportPage" element={<SupportPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/find-closer-items" element={<FindCloserItems />} />
        <Route path="edit-electronic-item/:id" element={<EditElectronicItem />} />
        <Route path="edit-vehicle-item/:id" element={<EditVehicleItem />} />
        <Route path="/verify-user" element={<UserNotVerified />} />
        <Route path="/chatlist/mobile" element={<MobileChatRoom />} />
        <Route path="/chatwall/mobile" element={<MobileChatWall />} />
        <Route path="/settings/mobile" element={<MobileSettings />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}
