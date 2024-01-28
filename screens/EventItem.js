import React, { useEffect, useState } from 'react';
import { View, ImageBackground, StyleSheet, Text } from 'react-native';
import CalcDist from '../components/util/CalcDist';
import DriveTime from '../components/util/DriveTime';
import TravelTime from '../components/util/TravelTime';
import MapView from '../components/util/MapView';
import WeatherView from '../components/util/WeatherView';
import Review from '../components/util/Review';
import OpeningHours from '../components/util/OpeningHours';
import { ScrollView } from 'react-native-gesture-handler';
import { updateFavoriteLocation } from '../components/util/http';

function EventItem({ route }) {
  const { item } = route.params;
  const { address } = item;
  const { city, countryName, label, state, street } = address;
  const addressString = `${label} ${street}, ${city}, ${state}, ${countryName}`;
  const addressStringSmall = `${street}, ${city}, ${state}, ${countryName}`;
  const yourloc = route.params.coords.currentLocation;
  const otherloc = route.params.coords.otherLocations;
  const [driveTime, setDriveTimeData] = useState([]);

  const updateDriveTimeData = (result) => {
    setDriveTimeData([result]);
  };

  // Access the 'coords' data from the route.params object
  const { coords } = route.params;

  // Extract latitude and longitude arrays
  const { othercoords_lat, othercoords_long } = coords;

  // Ensure both latitude and longitude arrays have the same length
  if (othercoords_lat.length !== othercoords_long.length) {
    console.error('Error: Latitude and longitude arrays must have the same length.');
    return null;
  }

  // Create an array to store pairs of coordinates
  const coordinatePairs = [];

  // Iterate through the arrays and create coordinate pairs
  for (let i = 0; i < othercoords_lat.length; i++) {
    const lat = othercoords_lat[i];
    const long = othercoords_long[i];
    coordinatePairs.push({ lat, long });
  }

  useEffect(() => {
    const { coords } = route.params;
    // Add any side effects you need here
  }, [route.params]);

  useEffect(() => {
    console.log('drive:', driveTime); // Log the updated driveTime here
  }, [driveTime]); // Listen for changes in driveTime

  const itemTitle = route.params['item']['title'];
  const itemOpeningHours = item.openingHours;

  return (
    <ImageBackground
      source={require('../assets/bg_events.png')}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View style={styles.container}>
          <MapView latitude={item.access[0].lat} longitude={item.access[0].lng} name={itemTitle} object={item} driveTime={driveTime}/>
        </View>
        <View style={styles.container2}>
          <WeatherView latitude={item.access[0].lat} longitude={item.access[0].lng} location={addressStringSmall}/>
          <Review latitude={item.access[0].lat} longitude={item.access[0].lng} location={addressString} name={itemTitle} />
          <OpeningHours hours={itemOpeningHours} />
          <CalcDist thisloc={item.access} pair={coordinatePairs} />
          <View style={styles.container}>
            <DriveTime
              thisloc={item.access}
              pair={coordinatePairs}
              yourloc={yourloc}
              otherloc={otherloc}
              updateDriveTimeData={updateDriveTimeData}
            />
            <TravelTime thisloc={item.access} pair={coordinatePairs} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventItem;
