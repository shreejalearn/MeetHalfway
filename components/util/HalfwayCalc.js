import React, { useEffect, useState } from 'react';

function HalfWayCalc(props) {
  const { othercoords_lat, othercoords_long } = props.coords;
  const [averages, setAverages] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    // Define your data as an array of objects
    const data = othercoords_lat.map((lat, i) => ({
      latitude: lat,
      longitude: othercoords_long[i],
    }));

    // Make an API call to model_unweighted
    fetch('http://192.168.1.11:5000/api/model_unweighted', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('API Response in HalfWayCalc:', data);

        if (data.result && data.result.length === 2) {
          // Set the response data in state
          setAverages({ latitude: data.result[0], longitude: data.result[1] });
          // Pass averages back to the parent component (or wherever it's needed)
          props.onReceiveAverages(data.result[0], data.result[1]);
        } else {
          console.error('Invalid API response format');
        }
      })
      .catch((error) => {
        console.error('API Error in HalfWayCalc:', error);
        // Handle errors here, e.g., display an error message to the user
      });
  }, [othercoords_lat, othercoords_long]);

  // You should return something meaningful from your component, for example, null for now
  return null;
}

export default HalfWayCalc;
