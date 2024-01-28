import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, KeyboardAvoidingView } from 'react-native'; // Import KeyboardAvoidingView
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';

import OtherLocationInput from './OtherLocationInput';

function OtherLocations(props) {
  const [numLocations, setNumLocations] = useState(1);
  const [locations, setLocations] = useState(['']);

  const handleInputChange = (text, index) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = text;
    setLocations(updatedLocations);
    props.onLocationsChange(updatedLocations);
  };

  const handleDeleteLocation = (index) => {
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    setLocations(updatedLocations);
    setNumLocations(numLocations - 1);
    props.onLocationsChange(updatedLocations);
  };

  const renderLocationInputs = () => {
    const inputs = [];
    for (let i = 0; i < numLocations; i++) {
      inputs.push(
        <OtherLocationInput
          key={i}
          index={i}
          value={locations[i]}
          onChange={handleInputChange}
          onDelete={handleDeleteLocation}
        />
      );
    }
    return inputs;
  };

  const handleAddLocation = () => {
    setNumLocations(numLocations + 1);
    setLocations([...locations, '']);
    props.onLocationsChange([...locations, '']);
  };

  return (
    <>
        {renderLocationInputs()}
        <Button style={styles.button} title="Add Location" onPress={handleAddLocation} color={'#B6986E'} />
    </>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    padding: 16,
    marginTop: '-5%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Pangolin_400Regular',
    color: '#775454',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderColor: '#775454',
    borderRadius: 15,
    padding: 8,
    fontFamily: 'Pangolin_400Regular',
    fontSize: 16,
    color: '#775454',
  },
  icon: {
    marginTop: '4%',
    alignSelf: 'center',
  }
});

export default OtherLocations;
