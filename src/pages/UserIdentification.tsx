import React,{ useState } from 'react'
import { 
    SafeAreaView, 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { Button  } from '../components/Button'
import { Modal } from '../components/Modal'

export function UserIdentification(){

    const navigator = useNavigation()

    const [ isFocused, setIsFocused ] = useState(false)
    const [ isFilled, setIsFilled ] = useState(false)
    const [ name, setName ] = useState('')

    function handleInputBlur() {
        setIsFocused(false)
        setIsFilled(!!name)
    }

    function handleInputFocus(){
        setIsFocused(true)
    }

    function handleInputChange(value: string){
        setIsFilled(!!value)
        setName(value)
    }

    async function handleSubmit(){
        if(!name)
            return Alert.alert('Error', 'Me diz como chamar você, porfavor! 😥')

        try {
            await AsyncStorage.setItem('@PlantManager:user', name)

            navigator.navigate('Confirmation', 
                { 
                    title: 'Prontinho', 
                    subtitle: ' Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                    buttonTitle: 'Começar',
                    icon: 'Smile',
                    nextScreen: 'PlantSelect'
                }
            )
        } catch {
            return Alert.alert('Error', 'Error ao Salvar os dados do usuario! 😥')
        }

        
    }

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <View style={styles.content}>
                        <View style={styles.form}>

                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    { isFilled ? '😄' : '🙂'}
                                </Text>

                                <Text style={styles.title}>
                                    Como podemos {'\n'} 
                                    chamar você?
                                </Text>
                            </View>

                            <TextInput 
                                placeholderTextColor="#5C6660" 
                                style={[
                                    styles.input, 
                                    (isFocused || isFilled) && 
                                    { borderBottomColor: colors.green }
                                ]} 
                                placeholder="Digite um nome" 
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />

                            <Button title="Confirmar" onPress={handleSubmit} />
                        </View>
                    </View>
                    
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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
        justifyContent: 'space-around',
        width: '100%'
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 44,
        width: '100%'
    },
    header: {
        alignItems: 'center'
    },
    emoji: {
        fontSize: 44
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 32,
        marginTop: 24
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        width: '100%',
        textAlign: 'center',
        marginTop: 40,
        padding: 16,
        marginBottom: 40,
        fontSize: 18,
        color: colors.heading
    }
})