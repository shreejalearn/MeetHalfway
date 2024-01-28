import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import { TouchableOpacity } from 'react-native-gesture-handler';

function DriveTime({ thisloc, pair, yourloc, otherloc, updateDriveTimeData }) {
  const [duration, setDuration] = useState(null);
  const [error, setError] = useState(null);
  const [allduration, setAllDuration] = useState([]);
  const [longestduration, setLongestDuration] = useState(null);
  const [driveTimes, setDriveTimes] = useState(null); // Change to null
  const [isModalVisible, setModalVisible] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [resultFound, setResultFound] = useState(false);
  const [longestDriveTime, setLongestDriveTime] = useState(null);

  useEffect(() => {
    if (allduration.length > 0) {
      const longestTimeFormatted = findLongestDriveTime(allduration);
      setLongestDriveTime(longestTimeFormatted);
    }
  }, [allduration]);
  

  function findLongestDriveTime(durations) {
    let longestTime = 0;
    let longestTimeFormatted = '';
  
    for (const duration of durations) {
      const timeInMinutes = parseFormattedTime(duration);
  
      if (timeInMinutes > longestTime) {
        longestTime = timeInMinutes;
        longestTimeFormatted = duration;
      }
    }
  
    setLongestDriveTime(longestTimeFormatted); // Set the longest drive time
    return longestTimeFormatted;
  }
  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (thisloc.length > 0 && pair.length > 0) {
      getDriveTime(thisloc[0], pair[pair.length - 1]);
      getAllTime(thisloc[0], pair);
    }
  }, [thisloc, pair]);

  useEffect(() => {
    if (!updated && resultFound && driveTimes) {
      const result_your = `From ${yourloc} --> ${driveTimes}`;
      const combinedData = otherloc.map((item, index) => (
        `From ${item} --> ${allduration[index]}`
      ));
      
        
      // Combine your location and drive times with other locations' drive times
      const drive = [result_your, ...combinedData];
  
      updateDriveTimeData(drive);
      setUpdated(true);
    }
  }, [updated, resultFound, driveTimes, yourloc, otherloc, allduration, updateDriveTimeData]);
    
  async function getDriveTime(startLocation, endLocation) {
    const apiKey = '1F1DvYGQFBe1LdGVNsAS8xobGte7ApOS';
    const routeUrl = `https://www.mapquestapi.com/directions/v2/route?key=${apiKey}&from=${startLocation.lat},${startLocation.lng}&to=${endLocation.lat},${endLocation.long}&unit=miles&routeType=fastest&locale=en_US`;

    try {
      const response = await fetch(routeUrl);
      if (!response.ok) {
        throw new Error('MapQuest API request failed');
      }

      const data = await response.json();

      if (data.route && data.route.formattedTime) {
        setDuration(data.route.formattedTime);
        setError(null);
      } else {
        setError('Drive time not available');
      }
    } catch (error) {
      setError('An error occurred while fetching drive time');
    }
  }

  async function getAllTime(startLocation, pair) {
    const allDurations = [];
  
    for (let i = 0; i < pair.length; i++) {
      const endLocation = pair[i];
      const startLocation = thisloc[0];
      const driveTime = await getDriveTimeedited(startLocation, endLocation);
      allDurations.push(driveTime);
    }
  
    setAllDuration(allDurations);
    setDriveTimes(allDurations[allDurations.length - 1]);
  }
  
  async function getDriveTimeedited(startLocation, endLocation) {
    const apiKey = '1F1DvYGQFBe1LdGVNsAS8xobGte7ApOS';
    const routeUrl = `https://www.mapquestapi.com/directions/v2/route?key=${apiKey}&from=${startLocation.lat},${startLocation.lng}&to=${endLocation.lat},${endLocation.long}&unit=miles&routeType=fastest&locale=en_US`;

    try {
      const response = await fetch(routeUrl);
      if (!response.ok) {
        throw new Error('MapQuest API request failed');
      }

      const data = await response.json();

      if (data.route && data.route.formattedTime) {
        return data.route.formattedTime;
      } else {
        return 'Drive time not available';
      }
    } catch (error) {
      return 'An error occurred while fetching drive time';
    }
  }

  function parseFormattedTime(formattedTime) {
    const parts = formattedTime.split(':');

    if (parts.length === 3) {
      const hours = parseInt(parts[0]);
      const minutes = parseInt(parts[1]);
      const seconds = parseInt(parts[2]);
      return hours * 60 + minutes + seconds / 60;
    } else if (parts.length === 2) {
      const minutes = parseInt(parts[0]);
      const seconds = parseInt(parts[1]);
      return minutes + seconds / 60;
    } else {
      return 0;
    }
  }

  function findLongestDriveTime(durations) {
    let longestTime = 0;
    let longestTimeFormatted = '';

    for (const duration of durations) {
      const timeInMinutes = parseFormattedTime(duration);

      if (timeInMinutes > longestTime) {
        longestTime = timeInMinutes;
        longestTimeFormatted = duration;
      }
    }

    return longestTimeFormatted;
  }

  useEffect(() => {
    if (driveTimes) {
      const result_your = `From ${yourloc} --> ${driveTimes}`;
      const combinedData = otherloc.map((item, index) => (
        `From ${item} --> ${driveTimes[index]}`
      ));
      const result = combinedData.join('\n ');
  
      setResultFound(true);
    }
  }, [driveTimes, yourloc]);

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : duration ? (
        <View style={styles.rowContainer}>
          <View style={styles.rowTextContainer}>
            <Text style={styles.driveTimeLabel}>Your Drive Time:</Text>
            <Text style={styles.driveTime}>{duration}</Text>
          </View>
          {longestDriveTime && ( 
        <View style={styles.rowTextContainer}>
          <Text style={styles.driveTimeLabel}>Longest Drive Time:</Text>
          <Text style={styles.driveTime}>{longestDriveTime}</Text>
        </View>
          )}

          <View>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.loadingText}>More Details</Text>
            </TouchableOpacity>
          </View>
  
          <Modal
  animationType="slide"
  transparent={false}
  visible={isModalVisible}
  onRequestClose={toggleModal}
>
  <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>Drive Time Details</Text>
    <Text style={styles.modalText}>{`From ${yourloc} --> ${driveTimes}`}</Text>

    {otherloc.map((item, index) => (
      <Text style={styles.modalText} key={index}>{`From ${item} --> ${allduration[index]}`}</Text>
    ))}

    <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
      <Text style={styles.closeButtonText}>Close Modal</Text>
    </TouchableOpacity>
  </View>
</Modal>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    padding: 20,
    borderRadius: 10,
    marginTop: '3%',
  },
  rowContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  rowTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driveTimeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
    fontFamily: 'Pangolin_400Regular',
    color: '#775454',
    marginTop: '2%',
  },
  driveTime: {
    fontSize: 16,
    fontFamily: 'Pangolin_400Regular',
    color: '#B28484',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    fontFamily: 'Pangolin_400Regular',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Pangolin_400Regular',
    color: 'gray',
    marginTop: '7%',
  },
  modalContainer: {
    backgroundColor: '#f0eae1',
    padding: 20,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Pangolin_400Regular',
    fontWeight: 'bold',
    marginBottom: '15%',
    color: '#B28484',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Pangolin_400Regular',
    color: '#775454',
  },
  closeButton: {
    backgroundColor: '#B28484',
    padding: 10,
    borderRadius: 5,
    marginTop: '10%',
  },
  closeButtonText: {
    color: '#ffffff',
    fontFamily: 'Pangolin_400Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DriveTime;
