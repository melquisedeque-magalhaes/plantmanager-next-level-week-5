import React from 'react'
import { Text, StyleSheet, View, Animated } from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { Feather } from '@expo/vector-icons'

interface PlantCardPrimary extends RectButtonProps{
    title: string;
    image: any;
    hour: string;
    handleRemovePlant: () => void;
}

export function PlantCardSecondary({ title, image, hour,  handleRemovePlant, ...rest }: PlantCardPrimary){
    return(
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton 
                            style={styles.buttonRemove}
                            onPress={handleRemovePlant}
                        >
                            <Feather name="trash" size={32} colors={colors.white} />

                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton 
                style={styles.container} 
                {...rest}
            >
                <View style={styles.infoMain}>
                    <SvgFromUri 
                        uri={image} 
                        width={36}
                        height={40}
                    />

                    <Text style={styles.title}>{title}</Text>  
                </View>
                    

                <View style={styles.details}> 

                    <Text style={styles.labelPlantAlert}>
                        Regar às
                    </Text>
                    <Text style={styles.labelPlantTimer}>
                        {hour}
                    </Text>

                </View>
                
            </RectButton>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 85,
        width: '100%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        marginVertical: 8,
        padding: 16,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        marginLeft: 16,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading
    },
    details: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelPlantAlert: {
        fontFamily: fonts.text,
        fontSize: 13,
        lineHeight: 20,
        color: colors.body_light
    },
    labelPlantTimer: {
        fontFamily: fonts.text,
        fontSize: 13,
        lineHeight: 20,
        color: colors.body_dark
    },
    buttonRemove: {
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        position: 'relative',
        right: 20,
        marginTop: 8
    }
})