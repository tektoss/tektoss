export default function useGetLocation() {
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
          );
          const data = await response.json();
          const { results } = data;
          if (results && results.length > 0) {
            const addressComponents = results[0].address_components;
            let country = '';
            let state = '';
            let town = '';
            addressComponents.forEach((component) => {
              if (component.types.includes('country')) {
                country = component.long_name;
              }
              if (component.types.includes('administrative_area_level_1')) {
                state = component.long_name;
              }
              if (component.types.includes('locality')) {
                town = component.long_name;
              }
            });
            const locationData = {
              country,
              state,
              town,
              latitude,
              longitude,
              locationIsSet: true,
            };

            return locationData;
          }
        } catch (error) {
          return false;
        }
        return false;
      });
    } else {
      return false;
    }
    return false;
  };

  return fetchLocation();
}
