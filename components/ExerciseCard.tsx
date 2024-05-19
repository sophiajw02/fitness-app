
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { icons } from '../constants';
import React, { useState, useRef } from 'react';


const ExerciseCard = ({ exercise }) => {
    const [complete, setComplete] = useState(false);

    return (
        <View style={styles.cardContainer}>
                        <TouchableOpacity
                            onPress={() => setComplete(!complete)}
                        >
                            <View style={styles.side}>
                                <Image source={!complete ? icons.radioUnchecked : icons.radioChecked}
                                tintColor={!complete ? '#EAEAEA' : '#2B993C'}
                                resizeMode='contain'
                                style={styles.image}
                            />
                            <View style={styles.routineContext}>
                                <Text style={styles.heading}>Exercise: {exercise.name}</Text>
                                <View style={styles.routineReps}>
                                    <Text style={styles.paragraph}>{exercise.repetitions} Reps</Text>
                                    <Text style={styles.divider}>|</Text>
                                    <Text style={styles.paragraph}>{exercise.sets} Sets</Text>
                                    <Text style={styles.divider}>|</Text>
                                    <Text style={styles.paragraph}>{exercise.weight} Pounds</Text>
                                </View>
                            </View>
                            </View>
                        </TouchableOpacity>
        </View>
    )
};

export default ExerciseCard;

const styles = StyleSheet.create({
    cardContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        paddingBottom: 4,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.3)',
    },
    side:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
        marginVertical: 10,
        marginRight: 10,
    },
    routineContext: {
        display: 'flex',
        flexDirection: 'column',
    },
    routineReps: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    heading: {
        fontSize: 18,
        lineHeight: 32,
        fontWeight: '600',
    },
    paragraph: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
        marginRight: 5,
    },
    divider: {
        fontSize: 14,
        lineHeight: 20,
        marginRight: 5,
        fontWeight: 'bold',
    },
});
