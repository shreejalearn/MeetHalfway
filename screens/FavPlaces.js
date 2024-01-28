import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ImageBackground,
  TouchableOpacity,
  Button,
} from 'react-native';
import { fetchFavoriteLocations } from '../components/util/http';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Satisfy_400Regular } from '@expo-google-fonts/satisfy';
import { Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import HomeButton from '../components/UI/HomeButton';

function FavPlaces() {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadFavoriteLocations = async () => {
    try {
      const favoriteLocations = await fetchFavoriteLocations();
      setFavorites(favoriteLocations);
    } catch (error) {
      console.error('Error fetching favorite locations:', error);
    } finally {
      setRefreshing(false); // Set refreshing to false when done
    }
  };

  useEffect(() => {
    loadFavoriteLocations();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true); // Set refreshing to true when refreshing
    loadFavoriteLocations();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.png')}
        style={styles.backgroundImage}
      >
        <Text style={[styles.title, favorites.length === 0 ? { marginTop: 0 } : { marginTop: '40%' }]} >Fav Places</Text>
        {favorites.length === 0 ? (
          <Text style={styles.noFavoritesText}>No favorite places yet.</Text>
        ) : (
<FlatList
  data={favorites}
  keyExtractor={(item) => item.id.toString()}
  refreshing={refreshing}
  onRefresh={handleRefresh}
  style={{ marginBottom: '15%' }} // Add marginBottom to create space
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('FavItem', {
          item: item.object,
          coords: [item.latitude, item.longitude],
        });
      }}
    >
      <View style={styles.favoriteItem}>
        <Text style={styles.itemText}>{item.object.address.label}</Text>
      </View>
    </TouchableOpacity>
  )}
/>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '70%', // Adjust font size as needed
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontFamily: 'Satisfy_400Regular',
  },
  favoriteItem: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    width: '95%',
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 3, // Add elevation for a card-like effect
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  itemText: {
    fontSize: 18,
    color: '#A28965',
    fontWeight: 'bold',
    margin:5,
    fontFamily: 'Pangolin_400Regular',
  },
  noFavoritesText:{
    fontFamily: 'Pangolin_400Regular',
    color: 'red'
  }
});

export default FavPlaces;
