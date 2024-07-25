import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection, query, getDocs, limit,
} from 'firebase/firestore';
import SectionHeader from '../../../components/SectionHeader';
import { db } from '../../../config/firebaseConfig';
import ProductCard from '../../../components/ProductCard';
import Loader from '../../../components/Loader';

export default function DisplayNewArrivals() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchItems = async () => {
    setIsLoading(true);
    const citiesRef = collection(db, 'products');
    const q = query(citiesRef, limit(6));
    const data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      data.push({ ...docData, id: doc.id });
    });
    setNewArrivals(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (isLoading) {
    return (
      <div>
        <SectionHeader>New Arrivals</SectionHeader>
        <div className="new-arrivals__no-arrivals-outer-div">
          <Loader />
        </div>
      </div>
    );
  }

  if (newArrivals.length === 0 && isLoading === false) {
    return (
      <div>
        <SectionHeader>New Arrivals</SectionHeader>
        <div className="new-arrivals__no-arrivals-outer-div">
          <div className="new-arrivals__no-arrivals-div">
            <h4>There are no New Arrivals</h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader>New Arrivals</SectionHeader>
      <div className="row g-2">
        {
      newArrivals.map((product) => (
        <div className="col-6 col-sm-4 col-md-2">
          <ProductCard product={product} />
        </div>
      ))
      }
      </div>
      <div className="new-arrivals__view-all-button-div">
        <button
          type="button"
          className="new-arrivals__view-all-button"
          onClick={() => navigate('/new-arrivals')}
        >
          View All
        </button>
      </div>
    </div>
  );
}
