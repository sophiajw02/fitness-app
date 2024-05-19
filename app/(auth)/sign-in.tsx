import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import axios from 'axios';
import { icons } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

const SignIn = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    if (!form.username || !form.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      //const response = await axios.post('http://localhost:5050/users/login', form);
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.viewContainer}>
          <Image
              source={icons.logo}
              tintColor={'#416E97'}
              style={styles.logoIcon}
          />
          <Text style={styles.header}>Log in to FitnessApp</Text>
          <Text style={styles.subheader}>Welcome back!</Text>

          <View>
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({...form, username: e})}
              otherStyles={{marginVertical: 8}}
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({...form, password: e})}
              otherStyles={{marginVertical: 8}}
              keyboardType="password"
            />
          </View>

          <CustomButton
              title="Login"
              handlePress={submitForm}
              containerStyles={{ marginTop: 24 }}
              isLoading={isSubmitting}
          />
          <View style={styles.createNew}>
              <Text style={styles.bottomText}>Don't have an account?</Text>
              <Link href="/sign-up"
                style={styles.linkText}>
                Sign up
              </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    height: '100%',
  },
  viewContainer: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 64,
  },
  logoIcon: {
    width: 64,
    height: 64,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 16,
    color: '#667185',
    marginTop: 2,
    marginBottom: 32,
  },
  bottomText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 30,
  },
  createNew: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
  },
  linkText: {
      fontSize: 16,
      fontWeight: '500',
      textDecorationLine: 'underline',
      color: '#2D95F3',
  }
})