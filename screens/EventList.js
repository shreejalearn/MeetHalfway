import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Satisfy_400Regular } from '@expo-google-fonts/satisfy';
import PlaceFinder from '../components/util/PlaceFinder';
import CustomModal from '../components/UI/customModal';
import HalfWayCalc from '../components/util/HalfwayCalc';

function EventList({ route }) {
  const [selectedOption, setSelectedOption] = useState('Select An Option');
  const [avgLat, setAvgLat] = useState(0);
  const [avgLng, setAvgLng] = useState(0);

  let [fontsLoaded, fontError] = useFonts({
    Satisfy_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const navigation = useNavigation();

  // Options for the dropdown
  const dropdownOptions = [
    'Restaurant',
    'Hotels',
    'Malls',
    'Parks',
    'Cafe',
    'Museum',
    'Amusement Parks',
    'Beaches',
    'Hikes',
    'Libraries',
  ];

  const receiveAverages = (avgLat, avgLng) => {
    setAvgLat(avgLat);
    setAvgLng(avgLng);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.png')}
        style={styles.backgroundImage}
      />
      <Text style={styles.title}>Equi Locate</Text>

      <View style={styles.picker}>
        <CustomModal
          options={dropdownOptions}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
        />
      </View>

      {selectedOption !== 'Select An Option' && (
        <>
          <HalfWayCalc coords={route.params} onReceiveAverages={receiveAverages} />
          <PlaceFinder avgLat={avgLat} avgLng={avgLng} searchTerm={selectedOption} coords={route.params} myloc={route.params.currentLocation} yourloc={route.params.otherLocations}/>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E3DA',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  title: {
    fontSize: 69,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Satisfy_400Regular',
    marginTop: '40%',
    textAlign: 'center',
  },
  picker: {
    width: 200,
    marginTop: '30%',
    marginLeft: '25%',
    borderRadius: 4,
    padding: 10,
  },
});

export default EventList;
