import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import React from 'react';
import { icons }  from '../../constants';

const Profile = () => {
  const navigation = useNavigation();

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
        <Text style={styles.name}>User Name</Text>
      </View>
      <View style={styles.profileInfo}>
        <View style={styles.profileSections}>
          <Text style={styles.infoTitle}>Email</Text>
          <Text style={styles.infoText}>xxx@xxx.com</Text>
        </View>
        <View style={styles.profileSections}>
          <Text style={styles.infoTitle}>Username</Text>
          <Text style={styles.infoText}>xxxx</Text>
        </View>
        <View style={styles.profileSections}>
          <Text style={styles.infoTitle}>Registered</Text>
          <Text style={styles.infoText}>XXX XX, XXXX</Text>
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