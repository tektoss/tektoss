import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectProductsState } from '../../../../redux/slice/productsSlice';
import isItemWithinMiles from '../utils/isItemWithinMiles';

export default function useFilterProductData(
  data,
  setFilteredData,
  setCurrentPage,
  isLocationAvailable,
  miles,
  coordinates,
  time,
  setIsLoading,
) {
  console.log('this is from filter Items =>', data);

  const { filterObject } = useSelector(selectProductsState);
  const {
    maxPrice, minPrice, condition, category,
  } = filterObject;
  console.log('this is from useFilterProductData Vehicle =>', filterObject);
  const location = useLocation();
  // const selectedCategory = useSelector((state) => state.products.selectedCategory);

  useEffect(() => {
    const filterProductData = async () => {
      try {
        setIsLoading(true);

        // // Check if data is available before filtering
        // if (data.length === 0) {
        //   // Wait for data to be fetched
        //   return;
        // }
        let filtered = [];

        if (isLocationAvailable) {
          filtered = data.filter(
            (item) => (
              item.price >= minPrice
              // && item.mainCat === 'vehicle'
              && item.price <= maxPrice
              // && item.year >= minYear
              // && item.year <= maxYear
              && (item.condition === condition || condition === 'all')
              && (item.category === category || category === 'all')
              && isItemWithinMiles(miles, coordinates, item)
            ),
          );
        }

        if (!isLocationAvailable) {
          filtered = data.filter(
            (item) => (
              item.price >= minPrice
              // && item.mainCat === 'vehicle'
              && item.price <= maxPrice
              // && item.year >= minYear
              // && item.year <= maxYear
              && (item.category === category || category === 'all')
              && (item.condition === condition || condition === 'all')

            ),
          );
        }

        setFilteredData(filtered);
        setCurrentPage(1);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
      }
    };

    filterProductData();
  }, [data, time, miles, location]);
}
