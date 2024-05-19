import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={[styles.button, containerStyles]}
        disabled={isLoading}>
        <Text style={[styles.buttonText, textStyles]}>
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#416E97',
        padding: 10,
        borderRadius: 32,
        minHeight: 64,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
    },
})