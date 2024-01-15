import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  collection, getDocs, query, where,
} from '@firebase/firestore';
import { fillProductsList } from '../../../../redux/slice/productsSlice';
import { db } from '../../../../config/firebaseConfig';

export default function useItemsFetch(setIsLoading, setFilteredData, setData, isLocationAvailable) {
  // const { productsList } = useSelector(selectProductsState);
  const dispatch = useDispatch();
  const vehicleCategory = useSelector((state) => state.products.selectedCategory);
  console.log('here is the chosen category from useitem: ', vehicleCategory);

  useEffect(() => {
    const fetchItems = async () => {
      const loading = true;
      setIsLoading(loading);
      // if (productsList.length === 0) {
      //   // Wait for data to be fetched
      //   return;
      // }

      // if (productsList.length > 1) {
      //   setData(productsList);
      //   setFilteredData(productsList);
      //   setIsLoading(false);
      // } else {
      try {
        let q;
        let q2;
        let q3;
        let q4;
        if (vehicleCategory) {
          q = query(
            console.log('this is working=>', vehicleCategory),
            collection(db, 'products'),
            where('vehicleType', '==', vehicleCategory),
            where('isPromoted', '==', true),
            where('mainCat', '==', 'vehicle'),
            where('status', '==', 'active'),
          );
        } else {
          q = query(
            collection(db, 'products'),
            where('isPromoted', '==', true),
            where('mainCat', '==', 'vehicle'),
            where('status', '==', 'active'),
          );
        }
        const querySnapshot = await getDocs(q);
        const allProducts = [];
        querySnapshot.forEach((doc) => {
          const queryData = doc.data();
          allProducts.push({ ...queryData, id: doc.id });
        });

        if (vehicleCategory) {
          q2 = query(
            collection(db, 'products'),
            where('vehicleType', '==', vehicleCategory),
            where('isPromoted', '==', true),
            where('mainCat', '==', 'vehicle'),
            where('status', '==', 'pending'),
          );
        } else {
          q2 = query(
            collection(db, 'products'),
            where('isPromoted', '==', true),
            where('mainCat', '==', 'vehicle'),
            where('status', '==', 'pending'),
          );
        }
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
          const queryData = doc.data();
          allProducts.push({ ...queryData, id: doc.id });
        });

        if (vehicleCategory) {
          q3 = query(
            collection(db, 'products'),
            where('isPromoted', '==', false),
            where('vehicleType', '==', vehicleCategory),
            where('mainCat', '==', 'vehicle'),
            where('status', '==', 'active'),
          );
        } else {
          q3 = query(
            collection(db, 'products'),
            where('isPromoted', '==', false),
            where('mainCat', '==', 'vehicle'),
            where('status', '==', 'active'),
          );
        }
        const querySnapshot3 = await getDocs(q3);
        querySnapshot3.forEach((doc) => {
          const queryData = doc.data();
          allProducts.push({ ...queryData, id: doc.id });
        });

        if (vehicleCategory) {
          q4 = query(
            collection(db, 'products'),
            // where('vehicleType', '==', vehicleCategory),
            where('isPromoted', '==', false),
            // where('mainCat', '==', 'vehicle'),
            where('status', '==', 'pending'),
          );
        } else {
          q4 = query(
            collection(db, 'products'),
            where('isPromoted', '==', false),
            // where('mainCat', '==', 'vehicle'),
            where('status', '==', 'pending'),
          );
        }
        const querySnapshot4 = await getDocs(q4);
        querySnapshot4.forEach((doc) => {
          const queryData = doc.data();
          allProducts.push({ ...queryData, id: doc.id });
        });

        // Check if data is available before filtering
        if (allProducts.length === 0) {
          // Wait for data to be fetched
          return;
        }

        console.log('this is from all vehicle =>', allProducts);
        setData(allProducts);
        dispatch(fillProductsList(allProducts));
        setFilteredData(allProducts);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [isLocationAvailable, vehicleCategory, dispatch]);
}
