import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin'


// Function to convert military time to regular time
function militaryToRegularTime(militaryTime) {
  const [hours, minutes] = militaryTime.split(':');
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 === 0 ? '12' : (hours % 12).toString();
  return `${hour12}:${minutes} ${period}`;
}

function OpeningHours({ hours }) {
  if (hours && hours.length > 0) {
    return (
      <View style={styles.container}>
        {hours.map((hour, index) => (
          <Text key={index} style={styles.text}>
            {Array.isArray(hour.text)
              ? hour.text.map((time) => {
                  const [days, hours] = time.split(': ');
                  const formattedHours = hours
                    .split('-')
                    .map((militaryTime) => militaryToRegularTime(militaryTime))
                    .join(' - ');
                  return `${days}: ${formattedHours}`;
                })
                .join('\n')
              : 'Invalid opening hours'}
          </Text>
        ))}
      </View>
    );
  } else {
    return (
    <View style={styles.container}>
    <Text style={styles.noHoursText}>No opening hours available</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Pangolin_400Regular',
    color: '#807059'
  },
  noHoursText: {
    fontSize: 16,
    color: 'gray',
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Pangolin_400Regular',

  },

});

export default OpeningHours;
