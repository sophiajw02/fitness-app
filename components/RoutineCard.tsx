import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { icons } from '../constants';
import { Swipeable } from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';
import React, { useState, useRef } from 'react';
import axios from 'axios';

const RoutineCard = ({ title, exercises, containerStyle, id, onDelete }) => {
    const [complete, setComplete] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
    const swipeableRef = useRef(null);

    const toggleCollapse = () => {
        if (!deleteButtonVisible) {
            setIsCollapsed(!isCollapsed);
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5050/routines/${id}`);
            onDelete(id);
        } catch (error) {
            if (swipeableRef.current) {
                swipeableRef.current.close();
            }
            Alert.alert('Error', 'Failed to delete the routine. Please try again later.');
        }
    };

    const renderRightActions = () => (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
    );

    return (
        <Swipeable renderRightActions={renderRightActions}
            onSwipeableOpen={() => setDeleteButtonVisible(true)}
            onSwipeableClose={() => setDeleteButtonVisible(false)}
            ref={swipeableRef}
        >
        <View>
            <TouchableOpacity onPress={toggleCollapse}
                activeOpacity={0.8}
                style={styles.routineContainer}>
                <Text style={styles.collapseButtonText}>
                    Routine Name: {title}
                </Text>
                <Image source={isCollapsed ? icons.arrowUp : icons.arrowDown}
                    style={styles.toggleArrow}
                    tintColor='white'/>
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed} style={styles.collapsible}>
                <View style={styles.cardContainer}>
                    {exercises.map((exercise, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setComplete(!complete)}
                        >
                            <Image source={!complete ? icons.radioUnchecked : icons.radioChecked}
                                tintColor={!complete ? '#EAEAEA' : '#2B993C'}
                                resizeMode='contain'
                                style={styles.image}
                            />
                            <View style={styles.routineContext}>
                                <Text style={styles.heading}>Exercise: {exercise.name}</Text>
                                <View style={styles.routineReps}>
                                    <Text style={styles.paragraph}>{exercise.reps} Reps</Text>
                                    <Text style={styles.divider}>|</Text>
                                    <Text style={styles.paragraph}>{exercise.sets} Sets</Text>
                                    <Text style={styles.divider}>|</Text>
                                    <Text style={styles.paragraph}>{exercise.weight} Pounds</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </Collapsible>
        </View>
        </Swipeable>

  )
}

export default RoutineCard;

const styles = StyleSheet.create({
    routineContainer: {
        backgroundColor: '#416E97',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
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
    collapsible: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
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
        justifyContent: 'space-between',
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
    exerciseContainer: {
        paddingVertical: 4,
        paddingHorizontal: 16,
    },
    collapseButtonText: {
        color: 'white',
        fontSize: 20,
        lineHeight: 32,
        fontWeight: '600',
    },
    toggleArrow: {
        width: 32,
        height: 32,
    },
    deleteButton: {
        backgroundColor: '#E3474B',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});
