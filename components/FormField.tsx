import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
    <View style={[styles.mainContainer, otherStyles]}>
      <Text style={styles.formTitle}>{title}</Text>
      <View style={styles.inputBox}>
        <TextInput
            style={styles.inputText}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#333333"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
            <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
            >
                <Image source={!showPassword ? icons.visibleOn : icons.visibleOff}
                    tintColor={'#667185'}
                    resizeMode='contain'
                    style={styles.image}
                />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField;

const styles = StyleSheet.create({
    mainContainer: {
      marginLeft: 8,
    },
    formTitle: {
        color: '#667185',
        fontWeight: '500',
        marginBottom: 4,
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EDEFEE',
        width: '100%',
        height: 48,
        paddingHorizontal: 16,
        borderRadius: 16,
    },
    inputBoxFocus: {
        borderColor: '#A8D0DC',
    },
    inputText: {
        flex: 1,
        color: 'black',
        fontWeight: 'normal',
    },
    image: {
        width: 24,
        height: 24,
    }
  });