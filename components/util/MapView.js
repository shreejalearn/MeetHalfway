import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Alert, Text, TouchableOpacity, Clipboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon library
import { addFavoriteLocation, deleteFavoriteLocation, fetchFavoriteLocations } from './http';
import { useFonts, Satisfy_400Regular } from '@expo-google-fonts/satisfy';

const MapView = ({ latitude, longitude, name, object, driveTime }) => {
  console.log(driveTime);

  // Construct the MapQuest Static Maps URL
  const mapQuestUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=1F1DvYGQFBe1LdGVNsAS8xobGte7ApOS&locations=${latitude},${longitude}&zoom=11&size=400,300&type=map`;

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  const location = {
    latitude,
    longitude,
    name,
    object
  };

  useEffect(() => {
    async function checkFavorites() {
      const favorites = await fetchFavoriteLocations();

      if (favorites.some(f => f.latitude === latitude && f.longitude === longitude)) {
        setIsFavorite(true);
        setFavoriteId(favorites.find(f => f.latitude === latitude && f.longitude === longitude).id);
      }
    }

    checkFavorites();
  }, [latitude, longitude]);

  async function fetch(favoriteLocation) {
    try {
      const addedFavorite = await addFavoriteLocation(favoriteLocation);
      setIsFavorite(true);
      setFavoriteId(addedFavorite);
      console.log(addedFavorite);
      Alert.alert("Bookmarked!");
    } catch (error) {
      console.error(error);
      setIsFavorite(false);
      Alert.alert('Error adding to bookmarked!');
    }
  }

  async function remove(favoriteId) {
    console.log(favoriteId);
    await deleteFavoriteLocation(favoriteId);
    setIsFavorite(false);
    Alert.alert("Removed From Bookmarked!");
  }

  function FavHandler() {
    if (isFavorite) {
      remove(favoriteId);
    } else {
      fetch(location);
    }

    setIsFavorite(prev => !prev);
  }

  let copyText = "Meet UP At: " + object.address.label;

  if (driveTime && driveTime[0]) {
    copyText = "Meet UP At " + object.address.label + "\n\n" + driveTime[0].map(time => time + "\n\n").join('');
  }

  const copyToClipboard = async () => {
    try {
      await Clipboard.setString(copyText);
      Alert.alert('Text copied to clipboard', 'You can now paste it in other apps.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error copying text to clipboard');
    }
  };

  console.log(mapQuestUrl);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={copyToClipboard}>
          <Icon
            name="copy" // You can use any icon from your icon library here
            size={20}
            color="#A73121"
            style={styles.copyIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{name}</Text>
      <Image
        source={{ uri: mapQuestUrl }}
        style={styles.mapImage}
      />
      <View style={styles.starIconContainer}>
        <Icon
          name={isFavorite ? "bookmark" : "bookmark-o"}
          size={20}
          color={isFavorite ? "#952323" : "#952323"}
          style={styles.starIcon}
          onPress={FavHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '92%',
    aspectRatio: 1.33,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: '28%',
    position: 'relative',
  },
  mapImage: {
    flex: 1,
    width: '92%',
    height: '100%',
    borderRadius: 10,
  },
  starIconContainer: {
    marginTop: '3%',
  },
  starIcon: {},
  title: {
    fontSize: '35%',
    padding: '3%',
    color: '#FFFFFF',
    fontFamily: 'Satisfy_400Regular',
  },
  copyIcon: {},
});

export default MapView;
