import { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
    maxPrice, minPrice, category, condition,
  } = filterObject;

  useEffect(() => {
    const filterProductData = async () => {
      try {
        setIsLoading(true);

        let filtered = [];

        if (isLocationAvailable) {
          filtered = data.filter(
            (item) => (
              item.mainCat === 'electronics'
              && item.price >= minPrice
              && item.price <= maxPrice
              && (item.condition === condition || condition === 'all')
              && (item.category === category || category === 'all')
              && isItemWithinMiles(miles, coordinates, item)
            ),
          );
        }

        if (!isLocationAvailable) {
          filtered = data.filter(
            (item) => (
              item.mainCat === 'electronics'
              && item.price >= minPrice
              && item.price <= maxPrice
              && (item.condition === condition || condition === 'all')
              && (item.category === category || category === 'all')
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
  }, [data, time, miles]);
}
