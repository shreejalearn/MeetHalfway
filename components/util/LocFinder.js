import axios from 'axios';

const apiKey = 'X8UvEuovI80sU_C8gGm7DMjcdJb3qEB9VANeckHL8EA'; // Replace with your HERE API Key

const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
        address
      )}&apiKey=${apiKey}`
    );

    // Extract the latitude and longitude from the response
    const location = response.data.items[0].position;
    const latitude = location.lat;
    const longitude = location.lng;

    return { latitude, longitude };
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
};

export default geocodeAddress;