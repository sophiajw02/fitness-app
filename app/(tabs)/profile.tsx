import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

const Profile = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text>Profile</Text>
    </SafeAreaView>
  )
}

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    height: '100%',
  },
});