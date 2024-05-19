import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { icons } from '../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
    const navigation = useNavigation();

    const [form, setForm] = useState({
        name: '',
        username: '',
    });

    const [profileImage, setProfileImage] = useState(null);

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
                    value={form.name}
                    placeholder="This should be the user's current name"
                    handleChangeText={(e) => setForm({ ...form, name: e })}
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
                handlePress={() => console.log('Save Changes')}
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
