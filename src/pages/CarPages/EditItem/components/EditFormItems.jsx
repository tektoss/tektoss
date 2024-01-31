/* eslint-disable react/no-array-index-key */
/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, uploadBytes, ref as sRef } from 'firebase/storage';
import { toast } from 'react-toastify';
import {
  doc, setDoc,
} from '@firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { selectProductsState } from '../../../../redux/slice/productsSlice';
// import Uneditable from './Uneditable';
import { vehiclesArray } from '../../CarNewItem/components/categoryObj';

import {
  db,
  storage,
} from '../../../../config/firebaseConfig';
import { selectAuthState } from '../../../../redux/slice/authSlice';
import { errorToast, successToast } from '../../../../utils/Toasts';

export default function EditFormItems() {
  const { productToEdit } = useSelector(selectProductsState);

  const { id } = useParams();

  const [item, setItem] = useState(productToEdit);
  const [selectedVehicle, setSelectedVehicle] = useState(productToEdit?.vehicleType);
  const [selectedCategory, setSelectedCategory] = useState(productToEdit?.make);
  const [selectedModel, setSelectedModel] = useState(productToEdit?.model);
  const [previewImages, setPreviewImages] = useState([]);
  const [otherBrand, setOtherBrand] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const navigate = useNavigate();

  const { userInfo, loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;
  const { displayName, photoURL } = userInfo;

  const handleVehicleChange = (event) => {
    const vehicle = event.target.value;
    setSelectedVehicle(vehicle);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    // setSelectedSubCategory(vehiclesArray[selectedVehicle][category]);
  };
  const handleBrandChange = (event) => {
    setSelectedModel(event.target.value);
    setOtherBrand('');
  };

  const handleRemoveImage = (index) => {
    const updatedPreviews = [...previewImages];
    const updatedImages = [...item.images];
    updatedImages[index] = null;
    updatedPreviews[index] = null;
    setItem((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
    setPreviewImages([...updatedPreviews]);
  };

  const handleChangeImage = (e, index) => {
    const file = e.target.files[0];

    if (file && file.size <= 5242880) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = [...item.images];
        updatedImages[index] = {
          file,
          preview: reader.result,
        };
        console.log('the updated image is this ==> ', index, updatedImages);
        setItem((prevState) => ({
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

  const handleEdit = async (e) => {
    e.preventDefault();

    const {
      name, price, year, details, condition, datePosted, location, VIN,
      images, viewCount, subCategory,
    } = item;

    setIsPosting(true);
    navigate('/');

    if (!name.trim() || !price.trim() || !details.trim()) {
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
    if (isNaN(year.trim())) {
      toast.error('Year must be a year', {
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

      const imageString = [];
      const imageObject = [];

      for (let i = 0; i < item.images.length; i += 1) {
        if (typeof item.images[i] === 'string') {
          imageString.push(item.images[i]);
        }
        if (item?.images[i]?.file) {
          imageObject.push(item.images[i]);
        }
      }

      for (let j = 0; j < imageObject.length; j += 1) {
        const image = imageObject[j];
        const fileRef = sRef(storageRef, image.file.name);
        await uploadBytes(fileRef, image.file);
        const downloadUrl = await getDownloadURL(fileRef);
        imageUrls.push(downloadUrl);
      }

      let itemBrand;
      if (selectedModel === 'other') {
        itemBrand = otherBrand;
      } else {
        itemBrand = selectedModel;
      }

      const vendorData = {
        displayName,
        image: photoURL,
        uid,
      };

      const productsData = {
        name: `${year} ${selectedCategory} ${itemBrand}`,
        price: price.trim(),
        year,
        vehicleType: 'Cars & Trucks',
        model: itemBrand,
        details: details.trim(),
        status: 'pending',
        make: selectedCategory,
        condition,
        lastEdited: new Date(),
        location: {
          locationIsSet: location.locationIsSet,
          country: location.country,
          state: location.state,
          town: location.town,
          coordinates: {
            longitude: location?.coordinates?.longitude ? location?.coordinates?.longitude : 0,
            latitude: location?.coordinates?.latitude ? location?.coordinates?.latitude : 0,
          },
        },
        images: [...imageString, ...imageUrls],
        viewCount,
        isPromoted: false,
        postedFrom: 'web',
        mainCat: 'vehicle',
        VIN,
        vendor: vendorData,
        datePosted,
        subCategory,
      };

      await setDoc(doc(db, 'products', id), productsData);

      successToast('Item has been successfully edited');

      setIsPosting(false);
    } catch (error) {
      setIsPosting(false);
      console.log('cannot submit form', error.message);
      errorToast('Error submitting form. Please try again.');
    }
  };

  const handlePromoteEdit = async (e) => {
    e.preventDefault();

    const {
      name, price, year, details, condition, location, subCategory, viewCount, VIN,
      images, datePosted,
    } = item;

    setIsPosting(true);

    if (!name.trim() || !price.trim() || !details.trim()) {
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

      const imageString = [];
      const imageObject = [];

      for (let i = 0; i < item.images.length; i += 1) {
        if (typeof item.images[i] === 'string') {
          imageString.push(item.images[i]);
        }
        if (item?.images[i]?.file) {
          imageObject.push(item.images[i]);
        }
      }

      for (let j = 0; j < imageObject.length; j += 1) {
        const image = imageObject[j];
        const fileRef = sRef(storageRef, image.file.name);
        await uploadBytes(fileRef, image.file);
        const downloadUrl = await getDownloadURL(fileRef);
        imageUrls.push(downloadUrl);
      }

      let itemBrand;
      if (selectedModel === 'other') {
        itemBrand = otherBrand;
      } else {
        itemBrand = selectedModel;
      }

      const vendorData = {
        displayName,
        image: photoURL,
        uid,
      };

      const productsData = {
        name: name.trim(),
        vehiclesArray: selectedVehicle,
        year,
        price: price.trim(),
        model: itemBrand,
        details: details.trim(),
        status: 'pending',
        make: selectedCategory,
        condition,
        lastEdited: new Date(),
        location: {
          locationIsSet: location.locationIsSet,
          country: location.country,
          state: location.state,
          town: location.town,
          coordinates: {
            longitude: location?.coordinates?.longitude ? location?.coordinates?.longitude : 0,
            latitude: location?.coordinates?.latitude ? location?.coordinates?.latitude : 0,
          },
        },
        images: [...imageString, ...imageUrls],
        viewCount,
        isPromoted: true,
        postedFrom: 'web',
        mainCat: 'vehicle',
        VIN,
        vendor: vendorData,
        datePosted,
        subCategory,
      };

      const promotedItemJSON = JSON.stringify(productsData);
      localStorage.setItem('promotedItem', promotedItemJSON);

      setIsPosting(false);

      window.location.href = 'https://buy.stripe.com/test_cN22cd7OSf0j4fu5kk';
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'isPromoted':
        setItem({ ...item, isPromoted: (value === 'promote') });
        // console.log('This is the changed item', item);
        break;
      default:
        setItem({ ...item, [name]: value });
        // console.log(newItem);
        break;
    }
  };

  useEffect(() => {
    function populateArray(arr) {
      const remainingSlots = 5 - arr.length;

      if (remainingSlots <= 0) {
        return arr;
      }

      const additionalElements = new Array(remainingSlots).fill(null);
      console.log('new array', arr.concat(additionalElements));
      return arr.concat(additionalElements);
    }

    setItem({ ...item, images: populateArray(item?.images) });
  }, []);

  return (
    <form className="new-item-form" onSubmit={handleEdit}>
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
            <label htmlFor="price-input" className="new-item-form__label">Vehicle Price</label>
            <input
              id="price-input"
              className="new-item-form__input"
              placeholder="eg. $ 12,000"
              name="price"
              value={item.price}
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
              value={item.year}
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
              value={item.VIN}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="price-input" className="new-item-form__label">Vehicle Condition</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="condition"
              value={item.condition}
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
            <label htmlFor="category" className="new-item-form__label">Vehicle Make</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="category"
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
            <label htmlFor="brand" className="new-item-form__label">Vehicle Model</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="brand"
              value={selectedModel}
              onChange={handleBrandChange}
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
        {(selectedModel === 'other') && (
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="other-brand-input" className="new-item-form__label">
              Please Specify the Vehicle model
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
        <div className="col-md-12">
          <div className="new-item-form__textarea-div">
            <label className="new-item-form__label new-item-form__label--alt">
              <h6>Detail Description of Car</h6>
              <span
                className={
                (item.details.length <= 300)
                  ? ''
                  : 'new-item-form__label new-item-form__span--alt'
}
              >
                {`( ${item.details.length} / 300 )`}
              </span>
            </label>
            <textarea
              className="new-item-form__textarea"
              placeholder="Write a suitable description for your Car,
              such as color, brand, model and other useful information."
              name="details"
              value={item.details}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-12">
          <label className="new-item-form__label">
            Upload Image
            {' '}
            <span>(Upload up to 5 images of 5mb or less in size)</span>
          </label>
          <div className="new-item-form__file-input-outer-div">
            {
              item.images.map((image, index) => (
                <div className="new-item-form__file-input-div">
                  {!(image || image?.preview) && (
                  <label htmlFor={`file-input-${index}`}>
                    <div>
                      <i className="fa-solid fa-camera" />
                      <h6>
                        Add Image
                        {' '}
                        {(index === 0) && (<span> ( Cover Image ) </span>)}
                      </h6>
                    </div>
                  </label>
                  )}
                  {(image || image?.preview) && (
                  <div className="new-item-form__preview-div">
                    <img src={image?.preview || image} alt="Preview" />
                    <button
                      type="button"
                      className="new-item-form__preview-close-button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      X
                    </button>
                  </div>
                  )}
                  <input
                    id={`file-input-${index}`}
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className="new-item-form__upload-image-input"
                    onChange={(e) => handleChangeImage(e, index)}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__promote-item-div d-flex">
            <label className="new-item-form__label">Promote Item (Current charge for promoting an item is $8 for 15 days)</label>
            <div className="new-item-form__radio-inner-div new-item-form__radio-inner-div--promote">
              <div className="new-item-form__radio-inner-div">
                <input
                  id="dont-promote"
                  className="new-item-form__radio-input"
                  name="isPromoted"
                  type="radio"
                  value="donotpromote"
                  checked={!item.isPromoted}
                  onChange={handleFormChange}
                />
                <label htmlFor="dont-promote" className="new-item-form__radio-label">No, do not promote this item</label>
              </div>
              <div className="new-item-form__radio-inner-div">
                <input
                  id="do-promote"
                  className="new-item-form__radio-input"
                  name="isPromoted"
                  value="promote"
                  type="radio"
                  checked={item.isPromoted}
                  onChange={handleFormChange}
                />
                <label htmlFor="do-promote" className="new-item-form__radio-label">Yes, promote this item</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__post-item-div">
            {(!item.isPromoted) && (<button className="new-item-form__post-item-button" type="submit" onClick={handleEdit}>{isPosting ? '...Posting' : 'Post Item'}</button>)}
            {(item.isPromoted) && (<button className="new-item-form__post-item-button" type="button" onClick={handlePromoteEdit}>Checkout</button>)}
          </div>
        </div>
      </div>
    </form>
  );
}
