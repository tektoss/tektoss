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
  const selectedCategory = useSelector((state) => state.products.selectedCategory);
  console.log('here is the chosen category: ', selectedCategory);

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
          let q; let q2; let q3; let
            q4;
          if (selectedCategory) {
            q = query(
              console.log('this is working=>', selectedCategory),
              collection(db, 'products'),
              where('vehicleType', '==', selectedCategory),
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
          const VehicleProducts = [];
          querySnapshot.forEach((doc) => {
            const queryData = doc.data();
            VehicleProducts.push({ ...queryData, id: doc.id });
          });

          if (selectedCategory) {
            q2 = query(
              collection(db, 'products'),
              where('vehicleType', '==', selectedCategory),
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
            VehicleProducts.push({ ...queryData, id: doc.id });
          });

          if (selectedCategory) {
            q3 = query(
              collection(db, 'products'),
              where('isPromoted', '==', false),
              where('vehicleType', '==', selectedCategory),
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
            VehicleProducts.push({ ...queryData, id: doc.id });
          });

          if (selectedCategory) {
            q4 = query(
              collection(db, 'products'),
              where('vehicleType', '==', selectedCategory),
              where('isPromoted', '==', false),
              where('mainCat', '==', 'vehicle'),
              where('status', '==', 'pending'),
            );
          } else {
            q4 = query(
              collection(db, 'products'),
              where('isPromoted', '==', false),
              where('mainCat', '==', 'vehicle'),
              where('status', '==', 'pending'),
            );
          }
          const querySnapshot4 = await getDocs(q4);
          querySnapshot4.forEach((doc) => {
            const queryData = doc.data();
            VehicleProducts.push({ ...queryData, id: doc.id });
          });

          console.log('this is from all products =>', VehicleProducts);
          setData(VehicleProducts);
          dispatch(fillProductsList(VehicleProducts));
          setFilteredData(VehicleProducts);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
          setIsLoading(false);
        }
      }
    };

    fetchItems();
  }, [isLocationAvailable, selectedCategory]);
}
