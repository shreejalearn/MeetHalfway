

import React from 'react';
import { View, Text, ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import { useFonts, Satisfy_400Regular } from '@expo-google-fonts/satisfy';
import { useNavigation } from '@react-navigation/native';
import HomeButton from '../components/UI/HomeButton';
import LocationForm from '../components/UI/Location/LocationForm';
import NoScrollbarScrollView from '../components/UI/NoScrollbarScrollView';
import { KeyboardAvoidingView } from 'react-native';

const HalfwayScreen = () => {
  let [fontsLoaded, fontError] = useFonts({
    Satisfy_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.png')}
        style={styles.backgroundImage}
      />
      <SafeAreaView style={styles.container2}>
        <Text style={styles.title}>Equi Locate</Text>
        <View style={styles.formContainer}>
          <KeyboardAvoidingView
            behavior="padding" // or "position"
            style={{ flex: 1 }}
          >
            <NoScrollbarScrollView>
              <LocationForm navigation={navigation} />
            </NoScrollbarScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    backgroundColor: '#E8E3DA',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
    marginTop: '-30%',
  },
  title: {
    fontSize: 69,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Satisfy_400Regular',
    paddingTop: '10%'
  },
  container2: {
    flex: 1,
    alignItems: 'center',
  },
  formContainer: {
    paddingTop: '17%',
    flex: 1,
    marginTop: '0%',
    marginLeft: '8%',
  },
});

export default HalfwayScreen;
