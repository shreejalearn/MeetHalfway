import 'react-native-gesture-handler';

import * as React from 'react';

import { Asset } from 'expo-asset';


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import Halfway from './screens/HalfwayScreen';
import EventList from './screens/EventList';
import EventItem from './screens/EventItem';
import PlanEvent from './screens/PlanEvent';
import FavPlaces from './screens/FavPlaces';
import FavItem from './screens/FavItem';
import EventsPlan from './screens/EventsPlan';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
         <Stack.Navigator>
          
      <Stack.Screen name="Home" component={HomeScreen} options={
          {
            headerShown: false
          }
        }/>

        <Stack.Screen name="Halfway" component={Halfway} options={
          {
            headerShown: false
          }
        }/>

<Stack.Screen name="Events" component={EventList} options={
          {
            headerShown: false
          }
        }/>

<Stack.Screen name="Event" component={EventItem} options={
          {
            headerShown: false
          }
        }/>

<Stack.Screen name="PlanEvent" component={PlanEvent} options={
          {
            headerShown: false
          }
        }/>

<Stack.Screen name="FavPlaces" component={FavPlaces} options={
          {
            headerShown: false
          }
        }/>

<Stack.Screen name="FavItem" component={FavItem} options={
          {
            headerShown: false
          }
        }/>

<Stack.Screen name="EventsPlan" component={EventsPlan} options={
          {
            headerShown: false
          }
        }/>



        
        
      </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
