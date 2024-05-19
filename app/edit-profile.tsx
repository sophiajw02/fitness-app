import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, router } from 'expo-router';
import axios from 'axios';
import { icons } from '../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = () => {
    const navigation = useNavigation();

    const [form, setForm] = useState({
        fullName: '',
        username: '',
    });

    const [userId, setUserId] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const source = { uri: result.assets[0].uri };
            setProfileImage(source);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const storedUserId = await AsyncStorage.getItem('userId');
            if (storedUserId !== null) {
              setUserId(storedUserId);
            }
            
          } catch (error) {
            console.error('Error fetching userId:', error);
          }
        };
    
        fetchUser();
      });

    const submitForm = async () => {
        if (!form.fullName || !form.username) {
          Alert.alert('Error', 'Please fill in all fields');
          return;
        }
    
        setIsSubmitting(true);
    
        try {
          const response = await axios.patch(`http://localhost:5050/users/${userId}`, form);
          console.log(userId);
          router.replace('/profile');
          Alert.alert('Success', `User with the name ${form.fullName} and username ${form.username} added to DB!`);
        } catch (error) {
          Alert.alert('Error', 'There was an error creating your account. Please try again.');
          console.error(error);
        } finally {
          setIsSubmitting(false);
        }
      };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('profile')}>
                    <Image source={icons.arrowBack} style={styles.image} tintColor={'#667185'} resizeMode='contain' />
                </TouchableOpacity>
                <Text style={styles.heading}>Edit Profile</Text>
            </View>
            <View style={styles.pictureContainer}>
                <TouchableOpacity onPress={selectImage}>
                    <Image source={profileImage || icons.profile} style={styles.profilePicture} />
                    <View style={styles.editIcon}>
                        <Image source={icons.edit}
                            style={styles.image}
                            resizeMode='contain'/>
                    </View>
                </TouchableOpacity>
            </View>

            <View>
                <FormField
                    title="Name"
                    value={form.fullName}
                    placeholder="This should be the user's current name"
                    handleChangeText={(e) => setForm({ ...form, fullName: e })}
                    otherStyles={{ marginVertical: 8 }}
                />
                <FormField
                    title="Username"
                    value={form.username}
                    placeholder="This should be the user's current username"
                    handleChangeText={(e) => setForm({ ...form, username: e })}
                    otherStyles={{ marginVertical: 8 }}
                />
            </View>
            <CustomButton
                title="Save Changes"
                handlePress={submitForm}
                containerStyles={styles.submitButton}
            />
        </SafeAreaView>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        height: '100%',
        paddingHorizontal: 24,
    },
    image: {
        width: 32,
        height: 32,
    },
    editIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#416E97',
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    header: {
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
    profilePicture: {
        width: 200,
        height: 200,
        borderRadius: 100,
        margin: 4,
    },
    pictureContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 24,
        position: 'relative',
    },
});
