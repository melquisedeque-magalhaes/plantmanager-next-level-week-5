import React from 'react'
import { TouchableOpacity, Text, TouchableOpacityProps, StyleSheet } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function Button({ title, ...rest }: ButtonProps){
    return(
        <TouchableOpacity 
            style={styles.container}
            activeOpacity={0.7} 
            {...rest}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        minWidth: '100%',
        height: 56,

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16
    },
    buttonText: {
        fontSize: 18,
        fontFamily: fonts.complement,
        fontWeight: '500',
        color: colors.white
    }
})