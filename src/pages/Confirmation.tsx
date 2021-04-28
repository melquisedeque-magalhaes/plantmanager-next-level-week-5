import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/core'

import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ConfirmationProps {
    title: string;
    subtitle: string;
    nextScreen: string;
    icon: 'Hug' | 'Smile';
    buttonTitle: string;
}

export function Confirmation(){

    const router = useRoute()

    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen
    } = router.params as ConfirmationProps

    const emojis = {
        Smile: '😁',
        Hug: '🤗'
    }

    const navigator = useNavigation()

    function handleMoveOn(){
        navigator.navigate(nextScreen)
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                <Text style={styles.emoji}>{emojis[icon]}</Text>

                <Text style={styles.title}>{title}</Text>

                <Text style={styles.paragraph}>
                    {subtitle}
                </Text>

                <Button title={buttonTitle} onPress={handleMoveOn} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 33
    },
    emoji: {
        fontSize: 96
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 24,
        marginTop: 64,
        color: colors.heading,
    },
    paragraph: {
        fontFamily: fonts.text,
        fontSize: 17,
        marginTop: 16,
        lineHeight: 25,
        color: colors.body_light,
        textAlign: 'center',
        marginBottom: 40
    }
})