import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  collection, getDocs, query, where,
} from '@firebase/firestore';
import { fillProductsList, selectProductsState } from '../../../../redux/slice/productsSlice';
import { db } from '../../../../config/firebaseConfig';

export default function useItemsFetch(setIsLoading, setFilteredData, setData, isLocationAvailable) {
  const { productsList } = useSelector(selectProductsState);
  const dispatch = useDispatch();
  console.log('here is it', productsList);

  useEffect(() => {
    const fetchItems = async () => {
      const loading = true;
      setIsLoading(loading);

      if (productsList.length > 1) {
        setData(productsList);
        setFilteredData(productsList);
        setIsLoading(false);
      } else {
        try {
          const q = query(
            collection(db, 'products'),
            // where('mainCat', '!=', 'electronics'),
            where('isPromoted', '==', true),
            where('status', '==', 'active'),
          );
          const querySnapshot = await getDocs(q);
          const allProducts = [];
          querySnapshot.forEach((doc) => {
            const queryData = doc.data();
            allProducts.push({ ...queryData, id: doc.id });
          });

          const q2 = query(
            collection(db, 'products'),
            // where('mainCat', '==', 'electronics'),
            where('isPromoted', '==', true),
            where('status', '==', 'pending'),
          );
          const querySnapshot2 = await getDocs(q2);
          querySnapshot2.forEach((doc) => {
            const queryData = doc.data();
            allProducts.push({ ...queryData, id: doc.id });
          });

          const q3 = query(
            collection(db, 'products'),
            // where('mainCat', '!=', 'electronics'),
            where('isPromoted', '==', false),
            where('status', '==', 'active'),
          );
          const querySnapshot3 = await getDocs(q3);
          querySnapshot3.forEach((doc) => {
            const queryData = doc.data();
            allProducts.push({ ...queryData, id: doc.id });
          });

          const q4 = query(
            collection(db, 'products'),
            // where('mainCat', '!=', 'electronics'),
            where('isPromoted', '==', false),
            where('status', '==', 'pending'),
          );
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

          console.log('this is from all products =>', allProducts);
          setData(allProducts);
          dispatch(fillProductsList(allProducts));
          setFilteredData(allProducts);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
          setIsLoading(false);
        }
        console.log('here is the allprod', productsList);
      }
    };

    fetchItems();
  }, [isLocationAvailable, dispatch]);
}
