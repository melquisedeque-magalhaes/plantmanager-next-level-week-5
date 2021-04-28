import React from 'react'
import { 
    SafeAreaView, 
    Text, 
    Image, 
    TouchableOpacity, 
    StyleSheet,
    Dimensions, 
    View,
    ScrollView
} from 'react-native'
import { Feather } from '@expo/vector-icons'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import wateringImage from '../assets/watering.png'
import { useNavigation } from '@react-navigation/native'

export function Welcome(){

    const navigator = useNavigation()

    function handleStart(){
        navigator.navigate('UserIdentification')
    }

    return(
        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ 
                flex: 1, 
                alignItems: 'center', 
                justifyContent: 'space-around'
            }}
        >
            <SafeAreaView>
                <View style={styles.wrapper}>

                    <Text style={styles.title}>
                        Gerencie {'\n'}
                        suas plantas de {'\n'}
                        forma fácil
                    </Text>

                    <Image 
                        style={styles.image} 
                        source={wateringImage} 
                        resizeMode="contain"
                    />

                    <Text style={styles.subtitle}>
                        Não esqueça mais de regar suas plantas.
                        Nós cuidamos de lembrar você sempre que precisar.
                    </Text>

                    <TouchableOpacity 
                        style={styles.button} 
                        activeOpacity={0.7} 
                        onPress={handleStart}
                    >

                        <Feather name="chevron-right" style={styles.buttonIcon} />

                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 44,
    },
    title: {
        marginTop: 38,
        fontSize: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 38
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    },
    subtitle: {
        color: colors.heading,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: fonts.text,
        lineHeight: 25
    },
    button: {
        backgroundColor: colors.green,
        marginBottom: 16,
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16
    },
    buttonIcon: {
        fontSize: 32,
        color: colors.white
    }
})