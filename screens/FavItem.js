import React, { useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Text } from 'react-native';
import MapView from '../components/util/MapView';
import WeatherView from '../components/util/WeatherView';
import Review from '../components/util/Review';
import OpeningHours from '../components/util/OpeningHours';
import { ScrollView } from 'react-native-gesture-handler';

function FavItem({ route }) {
  const { coords, item } = route.params;
  const { title } = item;

  const [latitude, longitude] = coords;

  const itemOpeningHours = item.openingHours;
  const itemAddress = item.address;

  return (
    <ImageBackground
      source={require('../assets/bg_events.png')}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View style={styles.container}>
          <MapView latitude={latitude} longitude={longitude} name={title} object={item} />
        </View>
        <View style={styles.container2}>
          <WeatherView latitude={latitude} longitude={longitude} />
          <Review latitude={latitude} longitude={longitude} location={itemAddress.label} name={title} />
          <OpeningHours hours={itemOpeningHours} />
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

export default FavItem;
