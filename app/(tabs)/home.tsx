import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../constants';
import RoutineCard from '../../components/RoutineCard';
import { Link, router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Home = () => {
  const navigation = useNavigation();
  const [workouts, setWorkouts] = useState([]);
  const route = useRoute();
  const { username } = route.params;

  console.log('Username:', username);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/workouts/${username}`);
        setWorkouts(response.data);
        console.log('Successfully fetched workouts:', workouts);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
      }
    };

    fetchWorkouts();
  }, []);

  const [routines, setRoutines] = useState([
    { id: 1, title: 'Routine 1' },
    { id: 2, title: 'Routine 2' },
    { id: 3, title: 'Routine 3' },
  ]);

  const handleDeleteRoutine = (id) => {
    setRoutines(routines.filter((routine) => routine.id !== id));
  };

  return (
    <GestureHandlerRootView>
    <SafeAreaView style={styles.mainContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.paragraph}>Welcome Back</Text>
            <Text style={styles.heading}>User's Name</Text>
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
        data={[{ id:'Monday' }, { id:'Tuesday' }, { id:'Wednesday' }, { id:'Thursday' }, { id:'Friday' }, { id:'Saturday' }]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RoutineCard title={item.id}
            onDelete={handleDeleteRoutine}/>
        )}

      />
    </SafeAreaView>
    </GestureHandlerRootView>
  )
}

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