import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { icons } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';


const SignIn = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = () => {

  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.viewContainer}>
          <Image
              source={icons.logo}
              tintColor={'#416E97'}
              style={styles.logoIcon}
          />
          <Text style={styles.header}>Create an Account</Text>
          <Text style={styles.subheader}>Welcome! Please enter your details.</Text>

          <View>
            <FormField
              title="Full Name"
              value={form.fullName}
              handleChangeText={(e) => setForm({...form, fullName: e})}
              otherStyles={{marginVertical: 8}}
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({...form, email: e})}
              otherStyles={{marginVertical: 8}}
              keyBoardType="email-address"
            />
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
              keyboarType="password"
            />
          </View>

          <CustomButton
              title="Sign Up"
              handlePress={submitForm}
              containerStyles={{ marginTop: 24 }}
              isLoading={isSubmitting}
          />
          <View style={styles.createNew}>
              <Text style={styles.bottomText}>Already have an account?</Text>
              <Link href="/sign-in"
                style={styles.linkText}>
                Log in
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