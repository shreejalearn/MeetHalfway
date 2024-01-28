import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import {useFont, Pangolin_400Regular} from '@expo-google-fonts/pangolin'

const PlaceFinder = (props) => {
  const navigation = useNavigation();

  const [places, setPlaces] = useState([]);
  const apiKey = 'X8UvEuovI80sU_C8gGm7DMjcdJb3qEB9VANeckHL8EA';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://discover.search.hereapi.com/v1/discover?at=${props.avgLat},${props.avgLng}&q=${props.searchTerm}&apiKey=${apiKey}`
        );
        setPlaces(response.data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.avgLat, props.avgLng, props.searchTerm, props.coords]);

  return (
    <View style={styles.container}>
      {places.length === 0 ? ( // Show fallback text when places array is empty
        <Text style={styles.noResultsText}>No locations found.</Text>
      ) : (
        <FlatList
          data={places}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.placeCard}
              onPress={() => {
                navigation.navigate('Event', {
                  item: item,
                  coords: props.coords,
                  myloc: props.myloc,
                  yourloc: props.yourloc
                });
              }}
            >
              <Text style={styles.placeTitle}>{item.title}</Text>
              <Text style={styles.placeAddress}>{item.address.label}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: '7%'
  },
  placeCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  placeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Pangolin_400Regular',
    color: '#BF9F95',
  },
  placeAddress: {
    fontSize: 14,
    color: 'gray',
    fontFamily: 'Pangolin_400Regular',

  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '20%',
    fontFamily: 'Pangolin_400Regular',
    color: 'red'
  },
});

export default PlaceFinder;
