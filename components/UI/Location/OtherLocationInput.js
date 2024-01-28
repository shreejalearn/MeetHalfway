import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

function OtherLocationInput({ index, value, onChange, onDelete }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Other Location {index + 1}:</Text>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={`Enter Other Location ${index + 1}`}
        placeholderTextColor={'#775454'}
        onChangeText={(text) => onChange(text, index)}
      />
      {index > 0 && (
        <Icon
          name="delete"
          size={24}
          style={styles.icon}
          color="#D41212"
          onPress={() => onDelete(index)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: '-5%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Pangolin_400Regular',
    color: '#775454',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderColor: '#775454',
    borderRadius: 15,
    padding: 8,
    fontFamily: 'Pangolin_400Regular',
    fontSize: 16,
    color: '#775454',
  },
  icon: {
    marginTop: '4%',
    alignSelf: 'center',
  }
});

export default OtherLocationInput;
