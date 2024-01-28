import axios from 'axios';

const BACKEND_URL = 'https://meet-halfway-878c8-default-rtdb.firebaseio.com/'; 

// Add favorite location 
export async function addFavoriteLocation(locationData) {
  const response = await axios.post(BACKEND_URL + '/favorites.json', locationData);
  return response.data.name; 
  
}

// Fetch all favorites
export async function fetchFavoriteLocations() {
  const response = await axios.get(BACKEND_URL + '/favorites.json');

  const favorites = [];

  for (const key in response.data) {
    const favoriteObj = {
        id: key,
        latitude: response.data[key].latitude,  
        longitude: response.data[key].longitude,
        name: response.data[key].name,
        object: response.data[key].object
      }
      
    favorites.push(favoriteObj);
  }

  return favorites;
}

// Update a favorite 
export function updateFavoriteLocation(id, updatedData) {
  return axios.put(`${BACKEND_URL}/favorites/${id}.json`, updatedData);
}

// Delete a favorite
export function deleteFavoriteLocation(id) {
  return axios.delete(`${BACKEND_URL}/favorites/${id}.json`); 
}