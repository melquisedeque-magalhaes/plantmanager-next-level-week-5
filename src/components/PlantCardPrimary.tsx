import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface PlantCardPrimary extends RectButtonProps{
    title: string;
    image: any;
}

export function PlantCardPrimary({ title, image, ...rest }: PlantCardPrimary){
    return(
        <RectButton 
            style={styles.container} 
            {...rest}
        >
            <SvgFromUri 
                uri={image} 
                width={70}
                height={70}
            />
            <Text style={styles.title}>{title}</Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 148,
        height: 154,
        backgroundColor: colors.shape,
        borderRadius: 20,
        margin: 10,

        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: colors.heading,
        fontFamily: fonts.heading,
        fontSize: 13,
        marginVertical: 16
    }
})