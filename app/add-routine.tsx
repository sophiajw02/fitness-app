import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { icons } from '../constants';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import ExerciseForm from '../components/ExerciseForm';
import React, { useState } from 'react';

const AddRoutine = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    routineName: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {

  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
          onPress={() => navigation.navigate('home')}>
          <Image source={icons.arrowBack}
            style={styles.image}
            tintColor={'#667185'}
            resizeMode='contain'
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Add a New Routine</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <FormField
            title="Routine Name"
            value={form.routineName}
            handleChangeText={(e) => setForm({...form, routineName: e})}
            otherStyles={{marginVertical: 8}}
          />
        </View>

        <ExerciseForm />
        <ExerciseForm />
        <ExerciseForm />
        <ExerciseForm />
        <ExerciseForm />
      </ScrollView>

      <CustomButton
        title="Add Routine"
        handlePress={submitForm}
        isLoading={isSubmitting}
        containerStyles={styles.submitButton}
      />
    </SafeAreaView>
  )
}

export default AddRoutine;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: 24,
  },
  scrollContainer: {
    paddingBottom: 100, 
  },
  image: {
    width: 32,
    height: 32,
  },
  header: {
    display: 'flex',
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
})