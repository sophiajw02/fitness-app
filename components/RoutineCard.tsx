import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { icons } from '../constants';
import React, { useState } from 'react';

const RoutineCard = ({ title, reps, sets, weight, containerStyle }) => {
    const [complete, setComplete] = useState(false);

    return (
    <View style={styles.cardContainer}>
        <TouchableOpacity
            onPress={() => setComplete(!complete)}
        >
            <Image source={!complete ? icons.radioUnchecked : icons.radioChecked}
                tintColor={!complete ? '#667185' : '#416E97'}
                resizeMode='contain'
                style={styles.image}
            />
        </TouchableOpacity>
        <View style={styles.routineContext}>
            <Text style={styles.heading}>{title}</Text>
            <View style={styles.routineReps}>
                <Text style={styles.paragraph}>X Reps</Text>
                <Text style={styles.divider}>|</Text>
                <Text style={styles.paragraph}>X Sets</Text>
                <Text style={styles.divider}>|</Text>
                <Text style={styles.paragraph}>X Pounds</Text>
            </View>
        </View>
    </View>
  )
}

export default RoutineCard;

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#EDEFEE',
        width: '100%',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 8,
    },
    image: {
        width: 40,
        height: 40,
        margin: 10,
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
        fontSize: 20,
        lineHeight: 32,
        fontWeight: '600',
      },
    paragraph: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '400',
      marginRight: 5,
    },
    divider: {
        fontSize: 14,
        lineHeight: 20,
        marginRight: 5,
        fontWeight: 'bold',
    }
})