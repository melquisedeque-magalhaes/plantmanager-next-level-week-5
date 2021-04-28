import React from 'react'
import { View, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'

import LoadAnimation from '../assets/load.json'

export function Loading(){
    return(
        <View style={styles.container}>
            <LottieView 
                source={LoadAnimation}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    animation: {
        height: 300,
        width: 300,
        backgroundColor: 'transparent'
    }
})