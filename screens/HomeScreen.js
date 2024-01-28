import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Pressable } from 'react-native';
import { useFonts, Satisfy_400Regular } from '@expo-google-fonts/satisfy';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import HomeButton from '../components/UI/HomeButton';

const HomeScreen = () => {
  let [fontsLoaded, fontError] = useFonts({
    Satisfy_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const navigation = useNavigation();

function HalfwayPressHandler() {
    navigation.navigate('Halfway');
}

function PlanPalPressHandler(){
  navigation.navigate('PlanEvent')
}

function FavPlacePressHandler(){
  navigation.navigate('FavPlaces')
}

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.png')}
        style={styles.backgroundImage}
      />
      <SafeAreaView style={styles.container2}>
      <Text style={styles.title}>Halfway Hub</Text>
      <View>
      <View style={styles.buttonContainer}>
      <HomeButton title="Equi Locate" onPress={() => HalfwayPressHandler()} />
      <HomeButton title="Opti Locate" onPress={() => PlanPalPressHandler()} />
      <HomeButton title="Bookmarked" onPress={() => FavPlacePressHandler()} />
    </View>
      </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 69,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Satisfy_400Regular',
    marginTop: '30%',

  },
  container2: {
    flex: 1,
    alignItems: 'center',
  }, 
  buttonContainer: {
    flexDirection: 'column',
    marginTop: '25%',
  }
});

export default HomeScreen;


