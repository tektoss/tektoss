const fetchLocation = (itemData, setState) => {
  let locationData = { error: 'location not set' };
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
          locationData = {
            country,
            state,
            town,
            latitude,
            longitude,
            locationIsSet: true,
          };

          setState(locationData);
        }
      } catch (error) {
        console.log({ error });
      }
    });
  } else {
    console.log({ error: 'navigator error' });
  }

  return itemData;
};

export default fetchLocation;
