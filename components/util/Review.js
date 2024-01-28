import React, { useState, useEffect } from 'react';
import stringSimilarity from 'string-similarity';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon library
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin'

function Review({ latitude, longitude, location, name }) {
  const [restaurants, setRestaurants] = useState('');
  const [rating, setRating] = useState('None');
  const [loading, setLoading] = useState(true);

  // Create a mapping between rating values and corresponding icons
  const ratingIcons = {
    None: 'star-o', // Use a star outline icon for 'None'
    1: 'star',
    2: 'star',
    3: 'star',
    4: 'star',
    5: 'star',
  };

  useEffect(() => {
    const apiKey = 'ISk7HeWYp7nmBXeET3O6Xsk8gU5kS1qoz68HiR2ggQqop2YqnJM9zAaZk4RNUMGQ5kp0GkDUsWH6z8ulncJMCGh18rpYDuyioYj3p7ts-U0st0eCKZh0eXev77bvZHYx';
    const apiUrl = `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&location=${location}&sort_by=best_match&limit=1`;

    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };

    fetch(apiUrl, { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Yelp API request failed');
        }
        return response.json();
      })
      .then((data) => {
        const restaurantName = data.businesses[0].name;
        const restaurantRating = Math.round(data.businesses[0].rating); // Round the rating

        setRestaurants(restaurantName);
        setRating(restaurantRating);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [latitude, longitude, location, name]);

  useEffect(() => {
    function findMatchingRestaurants(inputName) {
      const threshold = 0.2;

      const similarity = stringSimilarity.compareTwoStrings(
        restaurants.toLowerCase(),
        inputName.toLowerCase()
      );

      if (!loading && similarity < threshold) {
        setRating('None');
      }
    }

    if (!loading) {
      findMatchingRestaurants(name);
    }
  }, [loading, name, restaurants]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.ratingText}>Rating:</Text>
      {rating === 'None' ? (
        <Text style={styles.noneText}>None</Text>
      ) : (
        <View style={styles.starsContainer}>
          {Array.from({ length: rating }, (_, index) => (
            <Icon key={index} name={ratingIcons[rating]} size={20} color="#FFD95A" />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        padding: 12,
        borderRadius: 8,
        elevation: 2,
      },
      ratingText: {
        fontSize: 16,
        marginRight: 8,
        fontFamily: 'Pangolin_400Regular',
        color: '#775454',
      },
      starsContainer: {
        flexDirection: 'row',
      },
      noneText: {
        fontSize: 16,
        color: 'gray',
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

export default Review;
