/* eslint-disable react/no-array-index-key */
/* eslint-disable no-await-in-loop */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { getDownloadURL, uploadBytes, ref as sRef } from 'firebase/storage';
import {
  doc,
  setDoc,
} from '@firebase/firestore';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../../../config/firebaseConfig';
import { selectAuthState } from '../../../../redux/slice/authSlice';
import GeoGetter from '../../../../components/GeoGetter';
import { vehiclesArray } from './categoryObj';
import { addNewProduct, selectProductsState } from '../../../../redux/slice/productsSlice';
import { stripePaymentLink } from '../../../../Constants/constantVariables';

export default function FormItems() {
  const initialLocation = {
    country: '',
    state: '',
    town: '',
    longitude: '',
    latitude: '',
    locationIsSet: false,
  };

  const dispatch = useDispatch();

  const [location, setLocation] = useState(initialLocation);

  const { userCoordinate } = useSelector(selectProductsState);

  const [selectedVehicle, setSelectedVehicle] = useState('Cars & Trucks');
  const [selectedCategory, setSelectedCategory] = useState('Toyota');
  const [selectedModel, setSelectedModel] = useState('Corolla');
  // const [selectedSubCategory, setSelectedSubCategory] = useState(carsObj.Toyota[0]);
  const [otherBrand, setOtherBrand] = useState('');

  const navigate = useNavigate();

  const handleVehicleChange = (event) => {
    const vehicle = event.target.value;
    setSelectedVehicle(vehicle);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    // setSelectedSubCategory(vehiclesArray[selectedVehicle][category]);
  };

  const handleSubCategoryChange = (e) => {
    // setSelectedSubCategory(e.target.value);
    setSelectedModel(e.target.value);
  };

  const initialState = {
    name: '',
    vehicleType: 'Cars & Trucks',
    make: 'Toyota',
    model: 'Corolla',
    price: '',
    year: '',
    details: '',
    viewCount: [],
    images: [],
    condition: 'new',
    postedFrom: 'web',
    mainCat: 'vehicle',
    VIN: '',
    isPromoted: false,
    datePosted: new Date(),
    location: {
      locationIsSet: false,
      country: '',
      state: '',
      town: '',
      coordinates: {
        longitude: '',
        latitude: '',
      },
    },
  };

  const [newItem, setNewItem] = useState(initialState);

  // const [showLocationModal, setShowLocationModal] = useState(false);

  // const handleShowLocationModal = () => setShowLocationModal(true);
  // const handleCloseLocationModal = () => setShowLocationModal(false);

  const [isPosting, setIsPosting] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const { userInfo, loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;
  const { displayName, photoURL } = userInfo;

  const handleRemoveImage = (index) => {
    const updatedImages = [...newItem.images];
    updatedImages.splice(index, 1);
    setNewItem((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const handleChangeImage = (e, index) => {
    const file = e.target.files[0];

    if (file && file.size <= 5242880) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = [...newItem.images];
        updatedImages[index] = {
          file,
          preview: reader.result,
        };
        setNewItem((prevState) => ({
          ...prevState,
          images: updatedImages,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      console.log('Please select an image less than 5MB.');
      toast.error('Selected image size is more than 5MB.', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'isPromoted':
        setNewItem({ ...newItem, isPromoted: (value === 'promote') });
        console.log(newItem);
        break;
      default:
        setNewItem({ ...newItem, [name]: value });
        console.log(newItem);
        break;
    }
  };

  const redirectToCheckout = async () => {
    setIsCheckingOut(true);

    const {
      price, year, details, images, condition, VIN,
    } = newItem;

    if (!price.trim() || !details.trim()) {
      toast.error('Found empty text fields', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      setIsCheckingOut(false);
      return;
    }

    if (isNaN(price.trim())) {
      toast.error('Price must be a number', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      setIsPosting(false);
      return;
    }

    // if (!location.locationIsSet) {
    //   // toast.error('Location has not been set', {
    //   //   position: 'top-center',
    //   //   autoClose: 2500,
    //   //   hideProgressBar: true,
    //   //   closeOnClick: true,
    //   //   pauseOnHover: false,
    //   //   draggable: true,
    //   //   progress: undefined,
    //   //   theme: 'light',
    //   // });

    //   setIsPosting(false);
    //   return;
    // }

    if (images.length === 0) {
      toast.error('No item image selected', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      setIsPosting(false);
    } else {
      setIsPosting(false);

      try {
        const storageRef = sRef(storage, 'product_images');
        const imageUrls = [];

        for (let i = 0; i < newItem.images.length; i += 1) {
          const image = images[i];
          const fileRef = sRef(storageRef, image.file.name);
          await uploadBytes(fileRef, image.file);
          const downloadUrl = await getDownloadURL(fileRef);
          imageUrls.push(downloadUrl);
        }

        let itemModel;
        if (selectedModel === 'other') {
          itemModel = otherBrand;
        } else {
          itemModel = selectedModel;
        }

        const vendorData = {
          displayName,
          photoURL,
          uid,
        };

        const promotedItem = {
          name: `${year} ${selectedCategory} ${itemModel}`,
          vehicleType: selectedVehicle,
          price,
          model: itemModel,
          year,
          details,
          status: 'pending',
          make: selectedCategory,
          condition,
          lastEdited: new Date(),
          location: {
            locationIsSet: (userCoordinate?.longitude !== 0) || location.locationIsSet,
            locationName: `${location.town}, ${location.state}`,
            country: location.country,
            state: location.state,
            town: location.town,
            coordinates: {
              longitude: userCoordinate?.longitude || location.longitude,
              latitude: userCoordinate?.latitude || location.latitude,
            },
          },
          images: imageUrls,
          viewCount: [],
          isPromoted: true,
          postedFrom: 'web',
          mainCat: 'vehicle',
          VIN,
          datePosted: new Date(),
          dateLastPromoted: new Date(),
          vendor: vendorData,
        };

        const promotedItemJSON = JSON.stringify(promotedItem);
        localStorage.setItem('promotedItem', promotedItemJSON);

        console.log(promotedItem);
        window.location.href = stripePaymentLink;
        // window.location.href = 'https://buy.stripe.com/test_cN22cd7OSf0j4fu5kk';
      } catch (error) {
        setIsPosting(false);
        console.log('cannot submit form', error.message);
        toast.error('Error submitting form. Please try again.', {
          position: 'top-center',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }
  };

  const handleSubmitNewItem = async (e) => {
    e.preventDefault();

    const {
      price, year, details, images, condition, VIN,
    } = newItem;

    setIsPosting(true);

    if (!price.trim() || !details.trim()) {
      toast.error('Found empty text fields', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      setIsPosting(false);
      return;
    }
    if (!year.trim()) {
      toast.error('Found empty text fields', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      setIsPosting(false);
      return;
    }

    if (isNaN(price.trim())) {
      toast.error('Price must be a number', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      setIsPosting(false);
      return;
    }

    if (images.length === 0) {
      toast.error('No item image selected', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      setIsPosting(false);
    }

    try {
      const storageRef = sRef(storage, 'product_images');
      const imageUrls = [];

      for (let i = 0; i < images.length; i += 1) {
        const image = images[i];
        const fileRef = sRef(storageRef, image.file.name);
        await uploadBytes(fileRef, image.file);
        const downloadUrl = await getDownloadURL(fileRef);
        imageUrls.push(downloadUrl);
      }

      const vendorData = {
        displayName,
        image: photoURL,
        uid,
      };

      let itemModel;
      if (selectedModel === 'other') {
        itemModel = otherBrand;
      } else {
        itemModel = selectedModel;
      }

      // const productId = nanoid();

      const productsData = {
        name: `${year} ${selectedCategory} ${itemModel}`,
        vehicleType: selectedVehicle,
        price: price.trim(),
        model: itemModel,
        details: details.trim(),
        year,
        status: 'pending',
        make: selectedCategory,
        condition,
        lastEdited: new Date(),
        location: {
          locationIsSet: (userCoordinate?.longitude !== 0) || location.locationIsSet,
          country: location.country,
          state: location.state,
          town: location.town,
          coordinates: {
            longitude: userCoordinate?.longitude || location.longitude,
            latitude: userCoordinate?.latitude || location.latitude,
          },
        },
        images: imageUrls,
        viewCount: [],
        isPromoted: false,
        postedFrom: 'web',
        mainCat: 'vehicle',
        VIN,
        vendor: vendorData,
        datePosted: new Date(),
      };

      setLocation(initialLocation);
      setNewItem(initialState);
      e.target.reset();

      const productId = nanoid();

      await setDoc(doc(db, 'products', productId), productsData);

      dispatch(addNewProduct({ ...productsData, id: productId }));

      toast.success(`Your item ${name} Posted successfully!`, {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      console.log('new item', productsData);

      setIsPosting(false);
      navigate('/');
    } catch (error) {
      setIsPosting(false);
      console.log('cannot submit form', error.message);
      toast.error('Error submitting form. Please try again.', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <form className="new-item-form" onSubmit={handleSubmitNewItem}>
      <div className="row g-4">

        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="itemCategory" className="new-item-form__label">Vehicle Type</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="vehicleCat"
              value={selectedVehicle}
              onChange={handleVehicleChange}
            >
              {Object.keys(vehiclesArray).slice()
                .sort((a, b) => a.localeCompare(b))
                .map((vehicle) => (
                  <option key={vehicle} value={vehicle}>
                    {vehicle}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="itemCategory" className="new-item-form__label">Vehicle Make</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="make"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {Object.keys(vehiclesArray[selectedVehicle]).slice()
                .sort((a, b) => a.localeCompare(b))
                .map((Vehiclemake) => (
                  <option key={Vehiclemake} value={Vehiclemake}>
                    {Vehiclemake}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="subCategory" className="new-item-form__label">Vehicle Model</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="subCategory"
              value={selectedModel}
              onChange={handleSubCategoryChange}
            >
              {vehiclesArray[selectedVehicle]?.[selectedCategory]?.slice()
                ?.sort((a, b) => a.localeCompare(b)) // Sort the array alphabetically
                .map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="price-input" className="new-item-form__label">Car Condition</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="condition"
              value={newItem.condition}
              onChange={handleFormChange}
            >
              <option value="new">New</option>
              <option value="slightly used">Slightly Used</option>
              <option value="used">Used</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="price-input" className="new-item-form__label">Car Price</label>
            <input
              id="price-input"
              className="new-item-form__input"
              placeholder="eg. $12,000"
              name="price"
              value={newItem.price}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="price-input" className="new-item-form__label">Vehicle Year</label>
            <input
              id="price-input"
              className="new-item-form__input"
              placeholder="eg. 2020"
              name="year"
              value={newItem.year}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="vin-input" className="new-item-form__label">VIN</label>
            <input
              id="Vin-input"
              className="new-item-form__input"
              placeholder="1HGBH41JXMN109186"
              name="VIN"
              value={newItem.VIN}
              onChange={handleFormChange}
            />
          </div>
        </div>
        {(selectedModel === 'other') && (
          <div className="col-md-6">
            <div className="new-item-form__input-div">
              <label htmlFor="other-brand-input" className="new-item-form__label">
                Please Specify the car model for this vehicle
              </label>
              <input
                id="other-brand-input"
                className="new-item-form__input"
                placeholder="please type the name of your brand"
                name="other"
                value={otherBrand}
                onChange={(e) => setOtherBrand(e.target.value)}
              />
            </div>
          </div>
        )}
        <GeoGetter location={location} setLocation={setLocation} />
        <div className="col-md-12">
          <div className="new-item-form__textarea-div">
            <label className="new-item-form__label new-item-form__label--alt">
              <h6>Detail Description of the Vehicle</h6>
              <span className={(newItem.details.length <= 300) ? '' : 'new-item-form__label new-item-form__span--alt'}>{`( ${newItem.details.length} / 300 )`}</span>
            </label>
            <textarea
              className="new-item-form__textarea"
              placeholder="Write a suitable description for your Vehicle, such as color, make, model and other useful information."
              name="details"
              value={newItem.details}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__upload-image-div d-flex">
            <label className="new-item-form__label">
              Upload Image
              {' '}
              <span>(Upload up to 5 images of 5mb or less in size)</span>
            </label>
            <div className="new-item-form__file-input-outer-div">

              <div className="new-item-form__file-input-div">
                {!newItem.images[0] && (
                  <label htmlFor="file-input-1">
                    <div>
                      <i className="fa-solid fa-camera" />
                      <h6>
                        Add Image
                        {' '}
                        <span> ( Cover Image ) </span>
                      </h6>
                    </div>
                  </label>
                )}
                {newItem.images[0] && (
                  <div className="new-item-form__preview-div">
                    <img src={newItem.images[0].preview} alt="Preview" />
                    <button
                      type="button"
                      className="new-item-form__preview-close-button"
                      onClick={() => handleRemoveImage(0)}
                    >
                      X
                    </button>
                  </div>
                )}
                <input
                  id="file-input-1"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="new-item-form__upload-image-input"
                  onChange={(e) => handleChangeImage(e, 0)}
                />
              </div>

              <div className="new-item-form__file-input-div">
                {!newItem.images[1] && (
                  <label htmlFor="file-input-2">
                    <div>
                      <i className="fa-solid fa-camera" />
                      <h6>
                        Add Image
                      </h6>
                    </div>
                  </label>
                )}
                {newItem.images[1] && (
                  <div className="new-item-form__preview-div">
                    <img src={newItem.images[1].preview} alt="Preview" />
                    <button
                      type="button"
                      className="new-item-form__preview-close-button"
                      onClick={() => handleRemoveImage(1)}
                    >
                      X
                    </button>
                  </div>
                )}
                <input
                  id="file-input-2"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="new-item-form__upload-image-input"
                  onChange={(e) => handleChangeImage(e, 1)}
                />
              </div>

              <div className="new-item-form__file-input-div">
                {!newItem.images[2] && (
                  <label htmlFor="file-input-3">
                    <div>
                      <i className="fa-solid fa-camera" />
                      <h6>
                        Add Image
                      </h6>
                    </div>
                  </label>
                )}
                {newItem.images[2] && (
                  <div className="new-item-form__preview-div">
                    <img src={newItem.images[2].preview} alt="Preview" />
                    <button
                      type="button"
                      className="new-item-form__preview-close-button"
                      onClick={() => handleRemoveImage(2)}
                    >
                      X
                    </button>
                  </div>
                )}
                <input
                  id="file-input-3"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="new-item-form__upload-image-input"
                  onChange={(e) => handleChangeImage(e, 2)}
                />
              </div>

              <div className="new-item-form__file-input-div">
                {!newItem.images[3] && (
                  <label htmlFor="file-input-4">
                    <div>
                      <i className="fa-solid fa-camera" />
                      <h6>
                        Add Image
                      </h6>
                    </div>
                  </label>
                )}
                {newItem.images[3] && (
                  <div className="new-item-form__preview-div">
                    <img src={newItem.images[3].preview} alt="Preview" />
                    <button
                      type="button"
                      className="new-item-form__preview-close-button"
                      onClick={() => handleRemoveImage(3)}
                    >
                      X
                    </button>
                  </div>
                )}
                <input
                  id="file-input-4"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="new-item-form__upload-image-input"
                  onChange={(e) => handleChangeImage(e, 3)}
                />
              </div>

              <div className="new-item-form__file-input-div">
                {!newItem.images[4] && (
                  <label htmlFor="file-input-5">
                    <div>
                      <i className="fa-solid fa-camera" />
                      <h6>
                        Add Image
                      </h6>
                    </div>
                  </label>
                )}
                {newItem.images[4] && (
                  <div className="new-item-form__preview-div">
                    <img src={newItem.images[4].preview} alt="Preview" />
                    <button
                      type="button"
                      className="new-item-form__preview-close-button"
                      onClick={() => handleRemoveImage(4)}
                    >
                      X
                    </button>
                  </div>
                )}
                <input
                  id="file-input-5"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="new-item-form__upload-image-input"
                  onChange={(e) => handleChangeImage(e, 4)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__promote-item-div d-flex">
            <label className="new-item-form__label">Promote Item</label>
            <div className="new-item-form__radio-inner-button-div">
              <button
                type="button"
                onClick={() => setNewItem({ ...newItem, isPromoted: false })}
                className={newItem.isPromoted ? 'new-item-form__radio-inner-button-div__radio-button' : 'new-item-form__radio-inner-button-div__radio-button active'}
              >
                <h6>Do not promote item</h6>
                <h4>Post for free</h4>
                {!newItem.isPromoted && (<div className="new-item-form__radio-inner-button-div__button-icon"><i className="fa-solid fa-check" /></div>)}
              </button>
              <button
                type="button"
                onClick={() => setNewItem({ ...newItem, isPromoted: true })}
                className={newItem.isPromoted ? 'new-item-form__radio-inner-button-div__radio-button  active' : 'new-item-form__radio-inner-button-div__radio-button'}
              >
                <h6>Promote item</h6>
                <h4>$8 for 15 days</h4>
                {newItem.isPromoted && (<div className="new-item-form__radio-inner-button-div__button-icon"><i className="fa-solid fa-check" /></div>)}
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__post-item-div">
            {(!newItem.isPromoted) && (<button className="new-item-form__post-item-button" type="submit">{isPosting ? '...Posting' : 'Post Item'}</button>)}
            {(newItem.isPromoted) && (<button className="new-item-form__post-item-button" type="button" onClick={redirectToCheckout}>{isCheckingOut ? '...Loading' : 'Checkout'}</button>)}
          </div>
        </div>
      </div>
    </form>
  );
}
