import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

const Feed = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text>Feed</Text>
    </SafeAreaView>
  )
}

export default Feed;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    height: '100%',
  },
});