import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from '@firebase/firestore';
import ItemCard from './ItemCard';
import { db } from '../../../config/firebaseConfig';

export default function ServiceContent() {
  const [serviceCards, setServiceCards] = useState([]);

  useEffect(() => {
    const fetchServiceCards = async () => {
      try {
        const q = query(
          collection(db, 'Consultants'),
        );
        const querySnapshot = await getDocs(q);
        const allCards = [];
        querySnapshot.forEach((doc) => {
          const queryData = doc.data();
          allCards.push({ ...queryData, id: doc.id });
        });

        setServiceCards(allCards);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchServiceCards();
  }, []);

  return (
    <>
      {
      serviceCards.map((card) => (
        <div className="col-12 col-sm-6 col-md-4">
          <ItemCard cardDetail={card} isService />
        </div>
      ))
      }
    </>
  );
}
