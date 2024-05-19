import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import FormField from '../components/FormField';
import React, { useState } from 'react';
import { icons } from '../constants';

const ExerciseForm = () => {
    const [form, setForm] = useState({
        routineName: '',
        exercise: '',
        reps: '',
        sets: '',
    })

    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    }

    return (
        <View>
            <TouchableOpacity onPress={toggleCollapse} style={styles.collapseButton}>
                <Text style={styles.collapseButtonText}>
                  {isCollapsed ? 'Show Exercises' : 'Hide Exercises'}
                </Text>
                <Image source={isCollapsed ? icons.arrowUp : icons.arrowDown}
                    style={styles.toggleArrow}
                    tintColor='white'/>
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed}>
              <View style={styles.exerciseContainer}>
                <FormField
                  title="Exercise"
                  value={form.exercise}
                  handleChangeText={(e) => setForm({...form, exercise: e})}
                  otherStyles={{marginVertical: 8}}
                />
                <FormField
                  title="Number of Sets"
                  value={form.sets}
                  handleChangeText={(e) => setForm({...form, sets: e})}
                  otherStyles={{marginVertical: 8}}
                  keyboardType="numeric"
                />
                <FormField
                  title="Number of Repetitions"
                  value={form.reps}
                  handleChangeText={(e) => setForm({...form, reps: e})}
                  otherStyles={{marginVertical: 8}}
                  keyboardType="numeric"
                />
              </View>
            </Collapsible>
        </View>
      )
}

export default ExerciseForm;

const styles = StyleSheet.create({
    exerciseContainer: {
      paddingVertical: 4,
    },
    collapseButton: {
        margin: 8,
        padding: 4,
        alignItems: 'center',
        backgroundColor: '#2D95F3',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 64,
    },
    collapseButtonText: {
        color: 'white',
        fontSize: 18,
    },
    toggleArrow: {
        width: 32,
        height: 32,
    }
  })