import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
// import { db } from '../config/firebaseConfig';
// import { toast } from 'react-toastify';
// import { arrayUnion, doc, setDoc } from '@firebase/firestore';
import { selectAuthState } from '../../../redux/slice/authSlice';
// import { addToWhishList } from '../redux/slice/wishListSlice';
import getItemDistanceFromUser from '../SingleItem/utils/getItemDistanceFromUser';
import { selectProductsState } from '../../../redux/slice/productsSlice';
import convertSecondsToHumanDate from '../../../utils/DispalyDate';
// import { errorToast, successToast } from '../utils/Toasts';
// import { db } from '../config/firebaseConfig';
import AddToWishListButton from './AddToWishListButton';

export default function VehicleProductCard({ product }) {
  const {
    id, price, vendor, model, make, year, condition, isPromoted, images, datePosted,
    // brand,
  } = product;

  const image = images[0];
  const postDate = datePosted?.seconds
    ? convertSecondsToHumanDate(datePosted?.seconds)
    : convertSecondsToHumanDate(datePosted);

  const { userCoordinates } = useSelector(selectProductsState);
  const { loginInfo } = useSelector(selectAuthState);
  const { isAnonymous, uid } = loginInfo;

  const [miles, setMiles] = useState('');

  // const dispatch = useDispatch();

  const distance = getItemDistanceFromUser(userCoordinates, product);

  useEffect(() => {
    setMiles(distance);
  }, [distance, userCoordinates.longitude, userCoordinates.latitude]);

  // const handleAddToWishList = async (wishListProduct) => {
  //   if (isAnonymous) {
  //     toast.error('Sign in to add to whishlist', {
  //       position: 'top-center',
  //       autoClose: 1500,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: 'light',
  //     });

  //     return null;
  //   } if (vendor?.uid === uid) {
  //     toast.error('Item you posted cannot be added to whishlist', {
  //       position: 'top-center',
  //       autoClose: 1500,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: 'light',
  //     });

  //     return null;
  //   }
  //   dispatch(addToWhishList({ ...wishListProduct, uid, image }));
  //   toast.success(`${name} added to wish list`, {
  //     position: 'top-center',
  //     autoClose: 1500,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //     draggable: true,
  //     progress: undefined,
  //     theme: 'light',
  //   });

  //   return null;
  // };

  return (
    <div className="product-card" key={id}>
      <Link to={`/single-vehicle/${id}`} className="product-card__link">
        <div className="product-card__image-div">
          <img src={image || ''} alt="product" className="product-card__image" />
        </div>
        <p className="product-card__product-name">
          {year}
          {' '}
          {make}
          {' '}
          {model}
        </p>
        <h5 className="product-card__product-price">{`$ ${price}`}</h5>
        {/* <div className="product-card__product-location-div d-flex align-items-center">
          <p className="product-card__product-location-name">{brand}</p>
        </div> */}
        <p className="product-card__product-mile-range">{parseInt(miles) >= 0 ? `${miles} miles away` : '' }</p>
        <p className="product-card__product-post-date">{`posted on ${postDate}`}</p>
        <div className="product-card__product-condition-div">
          <p className="product-card__product-condition">{condition}</p>
        </div>
        { isPromoted && (
        <div className="product-card__promotion-div">
          <p className="product-card__promotion">promoted</p>
        </div>
        )}
      </Link>
      <AddToWishListButton
        userIsAnonymous={isAnonymous}
        uid={uid}
        vendor={vendor}
        id={id}
        make={make}
        model={model}
        year={year}
      />
    </div>
  );
}