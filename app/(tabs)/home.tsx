import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../constants';
<<<<<<< Updated upstream
import { useNavigation } from 'expo-router';
import RoutineCard from '../../components/RoutineCard';
import React from 'react';
=======
import { Link, router, useNavigation } from 'expo-router';
import RoutineCard from '@/components/RoutineCard';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';


>>>>>>> Stashed changes

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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        data={[{ id:1 }, { id:2 }, { id:3 }]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RoutineCard title={item.id}/>
        )}
        ListHeaderComponent={() => (
          <View style={styles.homeContainer}>
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
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: 24,
  },
  homeContainer: {
    display: 'flex',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
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