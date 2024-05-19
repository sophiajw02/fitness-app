import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import axios from 'axios';
import { icons } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

const Home = () => {
  const getWorkouts = async () => {
    try {
      const response = await axios.post('http://localhost:5050/users/', form);
      router.replace('/home');
      Alert.alert('Success', `User with the name ${form.fullName} and username ${form.username} added to DB!`);
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home