import React,{  useEffect, useState } from 'react'
import { View, StyleSheet, Text, SafeAreaView, FlatList } from 'react-native'

import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'

import { Header } from '../components/Header'
import { WaterPlat } from '../components/WaterPlant'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { Loading } from '../components/Loading'
import { loadPlant, PlantProps, removePlant, StoragePlantProps } from '../libs/storage'

import AvatarImg from '../assets/amor.jpeg'

import fonts from '../styles/fonts'
import colors from '../styles/colors'
import { Alert } from 'react-native'


interface RemovePlantsData {
    id: number;
    name: string;
}


export function MyPlants(){

    const [ plants, setPlants ] = useState<PlantProps[]>([])
    const [ loading, setLoading ] = useState(true)
    const [ nextWatered, setNextWatered ] = useState<string>()

    async function handleGetPlants(){

        const plantStorage = await loadPlant()

        const  nextTime = formatDistance(
            new Date(plantStorage[0].dateTimeNotification).getTime(), 
            new Date().getTime(),
            { locale: pt }
        )

        setNextWatered(`Rege a ${plantStorage[0].name} daqui a ${nextTime}.`)

        setPlants(plantStorage)
        setLoading(false)
    }

    function handleRemovePlant({ name, id }: RemovePlantsData){
        Alert.alert('Remover', `Deseja mesmo remover a ${name} ?`, [
            {
                text: 'Não 🙏',
                style: 'cancel'
            },
            {
                text: 'Sim 😥',
                onPress: async () => {
                    try {

                        await removePlant(id)

                        setPlants((oldData) => 
                            oldData.filter((plant) => plant.id !== id)
                        )

                    }catch (err) {
                        Alert.alert('Error', `Não foi possivel remover a ${name}! error ${err}`)
                    }
                }
            }
        ])
    }

    useEffect(() => {

        handleGetPlants()

    },[])

   
    if(loading)
        return <Loading />

    return(
        <SafeAreaView style={styles.container}>

            <Header image={AvatarImg} title="Plantinhas" subTitle="Minhas" />

            <View style={styles.WaterContainer}>
                <WaterPlat text={nextWatered} />
            </View>

            <Text style={styles.title}>Próximas regadas</Text>

            <View style={{ flex: 1 }}>
                <FlatList 
                    data={plants}
                    keyExtractor={( item ) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <PlantCardSecondary 
                            title={item.name} 
                            image={item.photo} 
                            hour={item.hour} 
                            handleRemovePlant={() => 
                                handleRemovePlant({ name: item.name, id: item.id })
                            }
                        />
                    )}
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 33
    },
    WaterContainer: {
        marginTop: 24
    },
    title: {
        fontFamily: fonts.heading,
        color: colors.heading,
        fontSize: 24,
        paddingVertical: 24
    },
    containerPlant: {
        height: 80,
        width: '100%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        marginVertical: 24,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16
    },
    labelPlantAlert: {
        fontFamily: fonts.text,
        fontSize: 13,
        lineHeight: 20,
        color: colors.body_light
    }
})