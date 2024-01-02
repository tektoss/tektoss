import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../../../../config/firebaseConfig';
import ProductDetailLoading from './ProductDetailLoading';

export default function VehicleProductDetail() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const fetchData = () => {
    const docRef = doc(db, 'products', id);

    getDoc(docRef)
      .then((itemDoc) => {
        if (itemDoc.exists()) {
          const data = itemDoc.data();
          if (data.mainCat === 'vehicle') {
            console.log('Product in details:', data);
            setProduct(data);
          } else {
            console.log('Document found, but mainCat is not "vehicle".');
          }
        } else {
          console.log('No such document!');
        }
      })
      .catch((err) => {
        console.error('Error getting document:', err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!product.make) {
    return (<ProductDetailLoading />);
  }

  return (
    <div className="product-detail">
      <div className="product-detail__product-name-div">
        <h6 className="product-detail__title">Product</h6>
        <h3 className="product-detail__name">
          {product.year}
          {' '}
          {product.make}
          {' '}
          {product.model}
        </h3>
      </div>
      <div className="product-detail__product-price-div">
        <h6 className="product-detail__title">Price</h6>
        <h3 className="product-detail__price">
          {`$ ${product.price}.00`}
        </h3>
      </div>
      <div className="product-detail__product-condition-div">
        <h6 className="product-detail__title">Car Condition</h6>
        <h3 className="product-detail__condition">{product.condition}</h3>
      </div>
      <div className="product-detail__product-details-div">
        <h6 className="product-detail__title">Details</h6>
        <p className="product-detail__detail">
          {product.details}
        </p>
      </div>
    </div>
  );
}
