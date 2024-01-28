import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'; // Import Platform from 'react-native'
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';

function HomeButton(props) {
  let [fontsLoaded, fontError] = useFonts({
    Pangolin_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        Platform.OS === 'ios' && styles.iosShadow, // Apply shadow only on iOS
      ]}
      onPress={props.onPress}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#F4F4F4',
    paddingVertical: '7%',
    paddingHorizontal: '20%',
    marginVertical: '5%',
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#775454',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Pangolin_400Regular',
  },
  iosShadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      }
    }),
  },
});

export default HomeButton;
