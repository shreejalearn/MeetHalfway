import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, ActivityIndicator, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';

const YourLocation = (props) => {

  const [currentLocation, setCurrentLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autoFillEnabled, setAutoFillEnabled] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    if (!autoFillEnabled) {
      return; 
    }
  
    getLocation();
  }, [autoFillEnabled]);
  
  // Handle text input change
  const handleTextInputChange = text => {
    setCurrentLocation(text);
    props.onLocationChange(text);
  };
  
  const getLocation = async () => {
    try {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        setIsLoading(false);
        setPermissionDenied(true);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (response && response.length > 0) {
        const { city, region, country } = response[0];
        const formattedLocation = `${city}, ${region}, ${country}`;
        setCurrentLocation(formattedLocation);
        props.onLocationChange(formattedLocation);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error getting location:', error);
      setIsLoading(false);
      props.onLocationChange('');
    }
  };

  let [fontsLoaded, fontError] = useFonts({
    Pangolin_400Regular,
  });
  
  if (!fontsLoaded || fontError) {
    return null;
  }  

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Use Current Location:</Text>
        <Switch
          style={styles.switch}
          value={autoFillEnabled}
          trackColor={{ false: 'green', true: '#EBB840' }}
          onValueChange={(value) => setAutoFillEnabled(value)}
        />
      </View>

      {permissionDenied && (
        <Text style={styles.permissionDeniedText}>
          Location permission is required for autofill.
        </Text>
      )}

      <TextInput
        style={styles.input}
        value={currentLocation}
        placeholder="Your Location"
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={'#775454'}
        onChangeText={handleTextInputChange} // Update currentLocation directly
        editable={!isLoading || !autoFillEnabled}
      />

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#EBB840" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  switch: {
    marginTop: -2,
  },
  label: {
    fontSize: 22,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#775454',
    fontFamily: 'Pangolin_400Regular',
    marginRight: '4%',
  },
  permissionDeniedText: {
    color: 'red',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#775454',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    fontFamily: 'Pangolin_400Regular',
    fontSize: 16,
    borderRadius: 15,
    paddingLeft: 15,
    color: '#775454',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default YourLocation;
