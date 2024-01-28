import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin'

function WeatherView({ latitude, longitude, location }) {
    
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);  
  const loc = location;


  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual API key
    const apiKey = '9555d93e953d4336b83195452233008';
    const lat = latitude;
    const lon = longitude;

    // Construct the API URL
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

    // Fetch weather data
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Weather API request failed');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setError(null);
      })
      .catch((error) => {
        setError('An error occurred while fetching weather data');
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : weatherData ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.locationText}>
            Located: {loc}
          </Text>
          <Text style={styles.temperatureText}>
            Temperature: {weatherData.current.temp_c}°C | {weatherData.current.temp_f}°F
          </Text>
          <Text style={styles.conditionText}>Condition: {weatherData.current.condition.text}</Text>
          <Text style={styles.humidityText}>Humidity: {weatherData.current.humidity}%</Text>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading weather data...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    width: '90%',
    marginTop: '10%',
  },
  weatherContainer: {
    alignItems: 'center',
  },
  locationText: {
    fontSize: 19,
    marginBottom: 8,
    fontFamily: 'Pangolin_400Regular',
    color: '#775454'

  },
  temperatureText: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: '6%',
    fontFamily: 'Pangolin_400Regular',
    color: '#B28484'

  },
  conditionText: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Pangolin_400Regular',
    color: '#B28484'

  },
  humidityText: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Pangolin_400Regular',
    color: '#B28484'

  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 8,
    fontFamily: 'Pangolin_400Regular',
    color: '#B28484'

  },
  loadingText: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Pangolin_400Regular',
    color: '#B28484'

  },
});

export default WeatherView;
