import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Collapsible from 'react-native-collapsible';
import FormField from '../components/FormField';
import { icons } from '../constants';

const ExerciseForm = ({ exerciseData, setExerciseData, index }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    }

    const handleChange = (field, value) => {
      const updatedExerciseData = [...exerciseData];
      updatedExerciseData[index][field] = value;
      setExerciseData(updatedExerciseData);
    }

    return (
        <View>
            <TouchableOpacity onPress={toggleCollapse} style={styles.collapseButton}>
                <Text style={styles.collapseButtonText}>
                  {isCollapsed ? 'Show Exercise' : 'Hide Exercise'}
                </Text>
                <Image source={isCollapsed ? icons.arrowUp : icons.arrowDown}
                    style={styles.toggleArrow}
                    tintColor='black'/>
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed}>
              <View style={styles.exerciseContainer}>
                <FormField
                  title="Exercise"
                  value={exerciseData[index].name}
                  handleChangeText={(e) => handleChange('name', e)}
                  otherStyles={{marginVertical: 8}}
                />
                <FormField
                  title="Number of Sets"
                  value={exerciseData[index].sets.toString()}
                  handleChangeText={(e) => handleChange('sets', e)}
                  otherStyles={{marginVertical: 8}}
                  keyboardType="numeric"
                />
                <FormField
                  title="Number of Repetitions"
                  value={exerciseData[index].repetitions.toString()}
                  handleChangeText={(e) => handleChange('repetitions', e)}
                  otherStyles={{marginVertical: 8}}
                  keyboardType="numeric"
                />
                <FormField
                  title="Weight"
                  value={exerciseData[index].weight.toString()}
                  handleChangeText={(e) => handleChange('weight', e)}
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
      paddingHorizontal: 16,
    },
    collapseButton: {
        margin: 8,
        padding: 4,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 24,
        borderTopWidth: 2,
        borderTopColor: 'rgba(65, 110, 151, 0.3)',
    },
    collapseButtonText: {
        color: 'black',
        fontSize: 18,
    },
    toggleArrow: {
        width: 32,
        height: 32,
    }
})
