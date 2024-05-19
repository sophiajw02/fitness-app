import React, { useState,  useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, router } from 'expo-router';
import { icons } from '../constants';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import ExerciseForm from '../components/ExerciseForm';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddRoutine = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

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
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }
        console.log('Stored username:', storedUsername);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };
    fetchUsername();
  }, []);
  
  const [form, setForm] = useState({
    routineName: '',
  });

  const [exerciseData, setExerciseData] = useState([
    { name: '', sets: '', repetitions: '', weight: '' },
    { name: '', sets: '', repetitions: '', weight: '' },
    { name: '', sets: '', repetitions: '', weight: '' },
    { name: '', sets: '', repetitions: '', weight: '' },
    { name: '', sets: '', repetitions: '', weight: '' }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    const workout = {
      workoutName: form.routineName,
      username: username,
      userid: userId,
      exercises: exerciseData.map(ex => ({
        name: ex.name,
        sets: parseInt(ex.sets),
        repetitions: parseInt(ex.repetitions),
        weight: parseInt(ex.weight)
      }))
    };

    setIsSubmitting(true);

    try {
      console.log(workout);
      const response = await axios.post(`http://localhost:5050/workouts/`, workout);
      console.log(response.data);
      router.replace('/home');
      Alert.alert('Success', `A new routine has been created!`);
    } catch (error) {
      Alert.alert('Error', 'There was an error updating your profile. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
          onPress={() => navigation.navigate('home')}>
          <Image source={icons.arrowBack}
            style={styles.image}
            tintColor={'#667185'}
            resizeMode='contain'
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Add a New Routine</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <FormField
            title="Routine Name"
            value={form.routineName}
            handleChangeText={(e) => setForm({ ...form, routineName: e })}
            otherStyles={{ marginVertical: 8 }}
          />
        </View>

        {exerciseData.map((exercise, index) => (
          <ExerciseForm
            key={index}
            exerciseData={exerciseData}
            setExerciseData={setExerciseData}
            index={index}
          />
        ))}
      </ScrollView>

      <CustomButton
        title="Add Routine"
        handlePress={submitForm}
        isLoading={isSubmitting}
        containerStyles={styles.submitButton}
      />
    </SafeAreaView>
  )
}

export default AddRoutine;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: 24,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  image: {
    width: 32,
    height: 32,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  submitButton: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    marginHorizontal: 24,
  },
})
