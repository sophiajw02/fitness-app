import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../constants';
import RoutineCard from '../../components/RoutineCard';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Home = () => {
  const navigation = useNavigation();
  const [workouts, setWorkouts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [fullName, setFullName] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId !== null) {
          setUserId(storedUserId);
        }
        console.log('Stored userId:', storedUserId);
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchFullName = async () => {
      try {
        const storedFullName = await AsyncStorage.getItem('fullName');
        if (storedFullName !== null) {
          setFullName(storedFullName);
        }
        console.log('Stored full name:', storedFullName);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };
    fetchFullName();
  });

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!userId) return;
      try {
        console.log('Fetching workouts for userId:', userId);
        const response = await axios.get(`http://localhost:5050/workouts/${userId}`);
        setWorkouts(response.data);
        console.log('Successfully fetched workouts:', response.data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, [userId]);

  const handleDeleteRoutine = (id) => {
    setRoutines(routines.filter((routine) => routine.id !== id));
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.paragraph}>Welcome Back</Text>
            <Text style={styles.heading}>{fullName}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('add-routine')}>
              <Image source={icons.addCircle}
                style={styles.image}
                tintColor={'#667185'}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        </View>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RoutineCard title={item.workoutName}
            exercises={item.exercises}
            onDelete={handleDeleteRoutine}/>
        )}

      />
    </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingHorizontal: 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  image: {
    width: 32,
    height: 32,
  },
  heading: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  }
});
