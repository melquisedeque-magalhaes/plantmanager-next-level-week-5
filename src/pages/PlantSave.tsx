import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Platform, Alert, ScrollView } from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { Feather } from '@expo/vector-icons'
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'

import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/core'
import { format, isBefore } from 'date-fns'

import { Button } from '../components/Button'
import { WaterPlat } from '../components/WaterPlant'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { PlantProps, savePlant } from '../libs/storage'

interface Params {
    plant: PlantProps;
}

export function PlantSave(){

    const [ selectedDateTime, setSelectedDateTime ] = useState(new Date())
    const [ showDatePicker, setShowDatePicker ] = useState(Platform.OS === 'ios')

    const route = useRoute()

    const { plant } = route.params as Params

    const navigator = useNavigation()

    function handleGoBack(){
        navigator.goBack()
    }

    function handleOpenDateTimePickerForAndroid(){
        setShowDatePicker(!showDatePicker)
    }

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS === 'android'){
            setShowDatePicker(oldState => !oldState)
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date())
            return Alert.alert('Error', 'Escolha uma data no futuro porfavor! ⏰️')
        }

        if(dateTime)
            setSelectedDateTime(dateTime)
    }

    async function handlePlantSave(){
        try {

            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            })

            navigator.navigate('Confirmation', 
                { 
                    title: 'Tudo certo', 
                    subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
                    buttonTitle: 'Muito obrigado :D',
                    icon: 'Hug',
                    nextScreen: 'MyPlants'
                }
            )

        } catch(err) {
            return Alert.alert('Error', 'Não foi possivel salvar sua planta, tente novamente mais tarde!😭')
        }
    }

    return (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ 
                flex: 1, 
                alignItems: 'center', 
                justifyContent: 'space-around'
            }}
        >
            <SafeAreaView style={styles.container}>

                <View style={styles.plantInfoContainer}>

                    <TouchableOpacity style={styles.header} onPress={handleGoBack}>
                        <Feather name="chevron-left" style={styles.icon} />
                    </TouchableOpacity>

                    <View style={styles.content}>
                        <SvgFromUri 
                            uri={plant.photo} 
                            width={156}
                            height={176}
                        />

                        <Text style={styles.title}>{plant.name}</Text>

                        <Text style={styles.paragraph}>
                            Não pode pegar sol e deve ficar em temperatura
                            ambiente, dentro de casa.
                        </Text>

                        
                        
                    </View>
                </View>
                
                <View style={styles.controllerContainer}>

                    <View style={styles.WaterContainer}>
                        <WaterPlat text={plant.water_tips} />
                    </View>

                    <Text style={styles.labelTimerController}>
                        Ecolha o melhor horário para ser lembrado:
                    </Text>

                    { showDatePicker && (
                        <DateTimePicker 
                            value={selectedDateTime}
                            mode="time"
                            display="spinner"
                            onChange={handleChangeTime}
                        />
                    )}

                    {
                        Platform.OS === 'android' && (
                            <TouchableOpacity 
                                style={styles.dateTimerPickerButton}
                                onPress={handleOpenDateTimePickerForAndroid}
                            >
                                <Text 
                                    style={styles.dateTimerPickerText}
                                >
                                    {`Mudar Horario ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                        )
                    }

                    <View style={styles.footer}>
                        <Button 
                            title="Cadastrar planta" 
                            onPress={handlePlantSave} 
                        />
                    </View>
                    
                </View>
                
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    plantInfoContainer: {
        flex: 1,
        backgroundColor: colors.shape,
    },
    header: {
        marginTop: getStatusBarHeight(),
        paddingHorizontal: 33
    },
    icon: {
        fontSize: 24,
        color: colors.heading,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 33
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 32
    },
    paragraph: {
        fontSize: 17,
        fontFamily: fonts.text,
        textAlign: 'center',
        lineHeight: 25,
        color: colors.body_dark,
        marginVertical: 32
    },
    WaterContainer: {
        position: 'relative',
        bottom: 90,
        paddingHorizontal: 33
    },
    controllerContainer: {
        backgroundColor: colors.white,
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelTimerController: {
        fontSize: 13,
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.body_light
    },
    dateTimerPickerButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 24,
        padding: 16,
        borderColor: colors.green,
        borderWidth: 1,
        borderRadius: 50
    },
    dateTimerPickerText: {
        color: colors.green_dark,
        fontSize: 24,
        fontFamily: fonts.text
    },
    footer: {
        paddingBottom: getBottomSpace(),
        paddingHorizontal: 33
    }
})