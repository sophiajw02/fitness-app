import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { icons }  from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const userDetails = await axios.get(`http://localhost:5050/users/${userId}`);
        await AsyncStorage.setItem('email', userDetails.data.email);
        await AsyncStorage.setItem('username', userDetails.data.username);
        await AsyncStorage.setItem('fullName', userDetails.data.fullName);
        const storedEmail = await AsyncStorage.getItem('email');
        if (storedEmail !== null) {
          setEmail(storedEmail);
        }
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }
        const storedFullName = await AsyncStorage.getItem('fullName');
        if (storedFullName !== null) {
          setFullName(storedFullName);
        }

        console.log('Stored userId:', storedEmail);
        console.log('Stored name:', storedFullName);
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };

    fetchUser();
  });
  
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.circle} />
      <View style={styles.header}>
          <Text style={styles.heading}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}
          onPress={() => navigation.navigate('edit-profile')}>
            <Image source={icons.settings}
              style={styles.image}
              resizeMode='contain'
            />
          </TouchableOpacity>
      </View>

      <View>
        <Image source={icons.profile}
          style={styles.profilePicture}/>
        <Text style={styles.name}>{fullName}</Text>
      </View>
      <View style={styles.profileInfo}>
        <View style={styles.profileSections}>
          <Text style={styles.infoTitle}>Email</Text>
          <Text style={styles.infoText}>{email}</Text>
        </View>
        <View style={styles.profileSections}>
          <Text style={styles.infoTitle}>Username</Text>
          <Text style={styles.infoText}>{username}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#EDEFEE',
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  circle: {
    width: 1000,
    height: 1000,
    borderRadius: 500,
    backgroundColor: '#416E97',
    position: 'absolute',
    top: -525,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: '100%',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 4,
  },
  name: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  profileInfo: {
    backgroundColor: 'white',
    width: '80%',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 12,
    marginTop: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  profileSections: {
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#5B5B5B',
  },
  image: {
    width: 32,
    height: 32,
  },
  settingsButton: {
    position: 'absolute',
    right: 0,
  }
});