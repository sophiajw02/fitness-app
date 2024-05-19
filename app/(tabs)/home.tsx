import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../constants';
import { Link, router, useNavigation } from 'expo-router';
import RoutineCard from '@/components/RoutineCard';
import React from 'react';

const Home = () => {
  const navigation = useNavigation();

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