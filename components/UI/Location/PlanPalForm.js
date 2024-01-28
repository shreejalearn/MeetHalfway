import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import YourLocation from './YourLocation';
import OtherLocations from './OtherLocations';
import HomeButton from '../HomeButton';
import { ScrollView } from 'react-native-gesture-handler';
import geocodeAddress from '../../util/LocFinder';
import { useNavigation } from '@react-navigation/native'; // Import `useNavigation` here

function PlanPalForm() {
    const navigation = useNavigation();
  // Define state to store location values
  const [currentLocation, setCurrentLocation] = useState('');

  // Callback function to handle current location change
  const handleCurrentLocationChange = (location) => {
    setCurrentLocation(location);
  };

  // Callback function to handle other locations change
  const handleOtherLocationsChange = (locations) => {
    setOtherLocations(locations);
  };

  async function SubmitHandler() {
    try {

      if (currentLocation === '') {
        alert('Make sure to fill in all input fields!');
        return; // Stop further processing if there are empty fields
    }
    
      // Geocode the current location
      const currentCoordinates = await geocodeAddress(currentLocation);

  
      if (!currentCoordinates) {
        alert('Error geocoding your location!');
        return;
      }
      else {
        navigation.navigate('EventsPlan', 
          currentCoordinates,
        );
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Make sure all inputs are filled correctly!');
    }
  }
            
  return (
    <KeyboardAvoidingView // Wrap your content with KeyboardAvoidingView
    style={styles.container2}
    behavior="position"
  >
    <ScrollView>
      <View style={styles.formContainer}>
        {/* Pass callback functions to child components */}
        <YourLocation onLocationChange={handleCurrentLocationChange} />
      </View>
      <HomeButton title="Submit" onPress={SubmitHandler} />
    </ScrollView>
     </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: '50%',
  },
});

export default PlanPalForm;
