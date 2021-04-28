import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import WaterDropImage from '../assets/waterdrop.png'
import colors from '../styles/colors'

interface WaterPlatProps {
    text: string | undefined;
}

export function WaterPlat( { text }: WaterPlatProps ){
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={WaterDropImage} />
            <Text style={styles.paragraph}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.blue_light,
        borderRadius: 20
    },
    image: {
        width: 56,
        height: 56
    },
    paragraph: {
        width: 170,
        color: colors.blue,
    }
})