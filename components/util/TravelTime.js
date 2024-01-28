import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {useFonts, Pangolin_400Regular} from '@expo-google-fonts/pangolin'

function TravelTime({ thisloc, pair }) {
  const [walkTime, setWalkTime] = useState(null);
  const [cycleTime, setCycleTime] = useState(null);
  const [error, setError] = useState(null);
  const [errorwalk, setWalkError] = useState(null);

  useEffect(() => {
    if (thisloc.length > 0 && pair.length > 0) {
      getWalkTime(thisloc[0], pair[pair.length - 1]);
      getCycleTime(thisloc[0], pair[pair.length - 1]);
    }
  }, [thisloc, pair]);

  async function getWalkTime(startLocation, endLocation) {
    const apiKey = '1F1DvYGQFBe1LdGVNsAS8xobGte7ApOS';
    const routeUrl = `https://www.mapquestapi.com/directions/v2/route?key=${apiKey}&from=${startLocation.lat},${startLocation.lng}&to=${endLocation.lat},${endLocation.long}&unit=miles&routeType=pedestrian&locale=en_US`;

    try {
      const response = await fetch(routeUrl);
      if (!response.ok) {
        throw new Error('MapQuest API request failed');
      }

      const data = await response.json();

      if (data.route && data.route.formattedTime) {
        setWalkTime(data.route.formattedTime);
        setErrorWalk(null);
      } else {
        setErrorWalk('Walk time not available');
      }
    } catch (error) {
      setErrorWalk('An error occurred while fetching walk time');
    }
  }

  async function getCycleTime(startLocation, endLocation) {
    const apiKey = '1F1DvYGQFBe1LdGVNsAS8xobGte7ApOS';
    const routeUrl = `https://www.mapquestapi.com/directions/v2/route?key=${apiKey}&from=${startLocation.lat},${startLocation.lng}&to=${endLocation.lat},${endLocation.long}&unit=miles&routeType=bicycle&locale=en_US`;

    try {
      const response = await fetch(routeUrl);
      if (!response.ok) {
        throw Error('MapQuest API request failed');
      }

      const data = await response.json();

      if (data.route && data.route.formattedTime) {
        setCycleTime(data.route.formattedTime);
        setError(null);
      } else {
        setError('Cycling time not available');
      }
    } catch (error) {
      setError('An error occurred while fetching cycling time');
    }
  }

  return (
    <View style={styles.container}>
      {error && errorwalk ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : (
        <View>
          {walkTime ? (
            <Text style={styles.info}>Walk Time: {walkTime}</Text>
          ) : (
            <Text style={styles.error}>Walking directions not available</Text>
          )}
          {cycleTime ? (
            <Text style={styles.info}>Cycle Time: {cycleTime}</Text>
          ) : (
            <Text style={styles.error}>Cycling directions not available</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    marginBottom: '20%'
  },
  error: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'Pangolin_400Regular'
  },
  info: {
    fontSize: 16,
    fontFamily: 'Pangolin_400Regular',
    color: '#807059'
  },
});

export default TravelTime;
