import { View, Text } from 'react-native';

function PlanEvent() {
  // Define your data as an array of objects
  const data = [
    { "name": "Oakland", "latitude": 41.0887, "longitude": -74.2643 },
    { "name": "Ramsey", "latitude": 41.0887, "longitude": -74.1413 },
    { "name": "Mahwah", "latitude": 41.0887, "longitude": -74.1448 },
    { "name": "Atlantic City", "latitude": 39.3643, "longitude": -74.4229 },
    { "name": "Cali", "latitude": 38.5816, "longitude": -121.4944 }
  ];

  console.log('Data to Send:', JSON.stringify(data)); // Debugging line
  fetch('http://192.168.1.11:5000/api/model_unweighted', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the correct Content-Type header
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('API Response:', data);
      // Handle the response data here
    })
    .catch((error) => {
      console.error('API Error:', error);
      // Handle errors here
    });

  return (
    <View>
    </View>
  );
}

export default PlanEvent;
