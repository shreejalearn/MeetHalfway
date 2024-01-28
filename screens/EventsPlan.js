import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from 'axios'; // Import Axios

function EventsPlan(currentCoodinates, currentLocation, otherLocation) {
//   const { latitude, longitude } = currentCoodinates.route.params;
  // Define state to store search results and user input
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  console.log(currentLocation);
  console.log(otherLocation);

  // Function to fetch autosuggest results from the HERE Places API
  const fetchAutoSuggestResults = async (query) => {
    try {
      const apiKey = 'X8UvEuovI80sU_C8gGm7DMjcdJb3qEB9VANeckHL8EA'; // Replace with your HERE API Key
      const apiUrl = `https://places.ls.hereapi.com/places/v1/autosuggest?at=${latitude},${longitude}&q=${query}&apiKey=${apiKey}`;
      const response = await axios.get(apiUrl);
      const data = response.data;
      setSearchResults(data.results.items);
    } catch (error) {
      console.error('Error fetching autosuggest results:', error);
    }
  };

  // Function to handle user input and trigger autosuggest API call
  const handleInputChange = (text) => {
    setQuery(text);
    if (text.length > 2) {
      fetchAutoSuggestResults(text);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <View style={{ flex: 1 , marginTop: '50%'}}>
      {/* Search input */}
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
        placeholder="Search for places"
        value={query}
        onChangeText={handleInputChange}
      />
      
      {/* Display search results */}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              // Handle selection of a place from the search results
              console.log('Selected Place:', item);
            }}
          >
            <View>
              <Text>{item.title}</Text>
              <Text>{item.address.label}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default EventsPlan;
