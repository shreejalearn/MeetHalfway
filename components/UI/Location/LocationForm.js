import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import YourLocation from './YourLocation';
import OtherLocations from './OtherLocations';
import HomeButton from '../HomeButton';
import { ScrollView } from 'react-native-gesture-handler';
import geocodeAddress from '../../util/LocFinder';
import { useNavigation } from '@react-navigation/native'; // Import `useNavigation` here

function LocationForm() {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState('');
  const [otherLocations, setOtherLocations] = useState([]);

  const handleCurrentLocationChange = (location) => {
    setCurrentLocation(location);
  };

  const handleOtherLocationsChange = (locations) => {
    setOtherLocations(locations);
  };

  async function SubmitHandler() {
    try {    
      // Geocode the current location
      const currentCoordinates = await geocodeAddress(currentLocation);
  
      if (!currentCoordinates) {
        alert('Error geocoding your location!');
        return;
      }

      if (currentCoordinates.latitude === 0 && currentCoordinates.longitude === 0) {
        alert('Error geocoding your location!');
        return;
      }

      if(otherLocations.length === 0) {
        alert('Make sure to fill in all input fields!');
        return; // Stop further processing if there are empty fields
      }
  
      // Geocode other locations and check for duplicates
      const coordinates = await Promise.all(
        otherLocations.map(async (address) => {
          try {
            const coords = await geocodeAddress(address);
            if (!coords) {
              alert('Error geocoding other locations!');
              return null; // Return null for locations that failed to geocode
            }
            return coords;
          } catch (error) {
            console.error('Error geocoding other location:', error);
            alert('Error geocoding other locations!');
            return null; // Return null for locations that failed to geocode
          }
        })
      );
  
      const othercoords_lat = [];
      const othercoords_long = [];
  
      for (let i = 0; i < coordinates.length; i++) {
        for (let j = i + 1; j < coordinates.length; j++) {
          if (
            coordinates[i].latitude === coordinates[j].latitude &&
            coordinates[i].longitude === coordinates[j].longitude
          ) {
            alert('Duplicate other locations found!');
            return;
          }
        }
        othercoords_lat.push(coordinates[i].latitude);
        othercoords_long.push(coordinates[i].longitude);
      }
  
      if (coordinates.some((coords) => isEqualCoordinates(coords, currentCoordinates))) {
        alert('Duplicate other locations found!');
        return;
      } else {
        othercoords_lat.push(currentCoordinates.latitude);
        othercoords_long.push(currentCoordinates.longitude);
  
        navigation.navigate('Events', {
          othercoords_lat,
          othercoords_long,
          currentLocation,
          otherLocations
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Make sure all inputs are filled correctly!');
    }
  }
        
    
  function isEqualCoordinates(coords1, coords2) {
    if (!coords1 || !coords2) {
      return false;
    }

    return coords1.latitude === coords2.latitude && coords1.longitude === coords2.longitude;
  }

  return (
    <View style={styles.container}>
          <YourLocation onLocationChange={handleCurrentLocationChange} />
          <OtherLocations onLocationsChange={handleOtherLocationsChange} />
          <HomeButton title="Submit" onPress={SubmitHandler} />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});


export default LocationForm;
