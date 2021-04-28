import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnvironmentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export function EnvironmentButton({ title, active = false, ...rest }: EnvironmentButtonProps){
    return(
        active ? (
            <RectButton 
                style={styles.containerActive} 
                {...rest}
            >
                <Text style={styles.titleActive}>{title}</Text>
            </RectButton>
        ) : (
            <RectButton 
                style={styles.container} 
                {...rest}
            >
                <Text style={styles.title}>{title}</Text>
            </RectButton>
        ) 
    )
}

const styles = StyleSheet.create({
    container: {
        width: 76,
        height: 40,
        backgroundColor: colors.shape,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginRight: 5
    },
    title: {
        fontSize: 13,
        fontFamily: fonts.text,
        color: colors.heading
    },
    containerActive: {
        width: 76,
        height: 40,
        backgroundColor: colors.green_light,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginRight: 5
    },
    titleActive: {
        fontSize: 13,
        fontFamily: fonts.text,
        color: colors.green_dark
    }
})