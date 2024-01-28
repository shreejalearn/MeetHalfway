import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import {useFonts, Pangolin_400Regular} from '@expo-google-fonts/pangolin'
import { TextInput } from 'react-native'; 
import Ionicons from '@expo/vector-icons/Ionicons';


function CustomModal({
    options, 
    selectedOption,
    onSelect
  }) {
    const [isVisible, setIsVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    let [fontsLoaded, fontError] = useFonts({
        Pangolin_400Regular,
      });
    
      if (!fontsLoaded && !fontError) {
        return null;
      }
    

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleOptionSelect = (option) => {
    onSelect(option); // <-- call the callback
    toggleModal();
  };
  
  return (
<KeyboardAvoidingView keyboardVerticalOffset={50} behavior={'position'}>
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.pickerButton}>
        <Text style={styles.pickerButtonText}>
          {selectedOption !== null ? selectedOption : 'Select an option'}
        </Text>
      </TouchableOpacity>
      <Modal visible={isVisible} transparent={true}>
        <View style={styles.modalContainer}>
        <ScrollView>

        <View style={styles.searchContainer}>
        <TextInput 
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search for Custom Location"
        placeholderTextColor="#EBE4E4"
        color="white"
      />
      <Ionicons name="md-search" size={30} color="white" style={styles.IconStyle} onPress={() => {
            if(searchText.length > 0) {
                onSelect(searchText);
                setSearchText('');  
                toggleModal();
              }
              else{
                  Alert.alert('Please enter a search term'); 
              }          
      }}/>
      </View>

          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleOptionSelect(item)}
                style={styles.optionItem}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
            
          />
      </ScrollView>


        </View>


      </Modal>

    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  pickerButton: {
    backgroundColor: '#B69C77',
    padding: 25,
    borderRadius: 8,
    elevation: 2, // for shadow on Android
    shadowColor: '#333', 
    shadowOpacity: 0.4,
    shadowOffset: { width: 2, height: 2 }, // for shadow on iOS
    width:'100%',
  },
  
  pickerButtonText: {
    position: 'absolute',
    left: 0, right: 0,
    paddingVertical: 10, 
    lineHeight: 30, // based on fontSize + padding
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Pangolin_400Regular',
    color: '#fff' 
  },
    modalContainer: {
    flex: 1,
    paddingTop: "15%",
    backgroundColor: 'rgba(119, 84, 84, 0.95)',
  },
  optionItem: {
    alignSelf: 'center',
    padding: '5.2%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Pangolin_400Regular',
  },
  searchContainer:{
    flex:1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '7%'
},
  searchInput: {
    height: 40, 
    borderColor: 'white',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    width: '60%',
    alignSelf: 'center',
    borderRadius: 25,
    margin: 15,

  },
  IconStyle:{
    alignSelf: 'center',
  },
});

export default CustomModal;