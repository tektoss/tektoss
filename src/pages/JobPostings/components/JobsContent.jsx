import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from '@firebase/firestore';
import ItemCard from './ItemCard';
import { db } from '../../../config/firebaseConfig';

export default function JobsContent() {
  const [jobCards, setJobCards] = useState([]);

  useEffect(() => {
    const fetchJobCards = async () => {
      try {
        const q = query(
          collection(db, 'Job'),
        );
        const querySnapshot = await getDocs(q);
        const allCards = [];
        querySnapshot.forEach((doc) => {
          const queryData = doc.data();
          allCards.push({ ...queryData, id: doc.id });
        });

        setJobCards(allCards);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchJobCards();
  }, []);

  return (
    <>
      {
      jobCards.map((card) => (
        <div className="col-12 col-sm-6 col-md-4">
          <ItemCard cardDetail={card} />
        </div>
      ))
      }
    </>
  );
}
