import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import getDistance from 'geolib/es/getDistance';
import { Accuracy } from 'expo-location';
import {useFont, Pangolin_400Regular} from '@expo-google-fonts/pangolin'

function CalcDist({ thisloc, pair }) {
  console.log(thisloc, pair)
  const [distance, setDistance] = useState(null);
  const [yourdist, setyourdist] = useState(null);

  useEffect(() => {
    if (thisloc && pair && pair.length > 0) {
      // Calculate distances to all points in the pair array
      const distances = pair.map(point =>
        getDistance(
          { latitude: thisloc[0].lat, longitude: thisloc[0].lng },
          { latitude: point.lat, longitude: point.long },
        )
      );

      // Find the maximum distance among all calculated distances
      const max = Math.max(...distances);
      const yourdist = distances[distances.length - 1];
      setyourdist(yourdist);
      
      // Set the maximum distance in the state
      setDistance(max);
    }
  }, [thisloc, pair]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Furthest Distance:</Text>
      <Text style={styles.distanceText}>
        {(distance * 0.000621371).toFixed(2)} miles
      </Text>
      <Text style={styles.text}>Your Distance:</Text>
      <Text style={styles.distanceText}>
        {(yourdist * 0.000621371).toFixed(2)} miles
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20, // Add padding for better spacing
    borderRadius: 10, // Rounded corners
  },
  text: {
    fontSize: 19, // Larger font size for headings
    marginBottom: 8, // Spacing between headings and distances
    fontFamily: 'Pangolin_400Regular',
    color: '#775454'
  },
  distanceText: {
    fontSize: 17, // Slightly smaller font size for distances
    fontFamily: 'Pangolin_400Regular',
    color: '#B28484'
  },
});

export default CalcDist;
