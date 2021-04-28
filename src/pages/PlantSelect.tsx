import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { Header } from '../components/Header'

import AvatarImg from '../assets/Melqui.jpg'

import fonts from '../styles/fonts'
import colors from '../styles/colors'
import { EnvironmentButton } from '../components/EnvironmentButton'
import { useEffect } from 'react'
import { api } from '../services/api'
import { useState } from 'react'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { Loading } from '../components/Loading'
import { useNavigation } from '@react-navigation/native'
import { PlantProps } from '../libs/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface EnvironmentsData{
    key: string;
    title: string;
}

export function PlantSelect(){

    const navigator = useNavigation()

    const [ environments, setEnvironments ] = useState<EnvironmentsData[]>([])
    const [ plants, setPlants ] = useState<PlantProps[]>([])
    const [ filteredPlants, setFilteredPlants ] = useState<PlantProps[]>([])
    const [ environmentsSelect, setEnvironmentsSelect ] = useState('all')
    const [ loadingAnimation, setLoadingAnimation ] = useState(true)

    const [ page, setPage ] = useState(1)
    const [ loadingListEndAnimation, setLoadingListEndAnimation ] = useState(false)

    const [ userName, setUserName ] = useState<string>()

    async function handleSavePlant(plant: PlantProps){

        navigator.navigate('PlantSave', { plant })
    }

    function handleFetchMore(distance: number){
        if(distance < 1)
            return
        
        setLoadingListEndAnimation(true)
        setPage(oldValue => oldValue + 1)

        fetchPlants()
    }

    function handleEnvironmentsSelected(environments: string){
        setEnvironmentsSelect(environments)

        if(environments == 'all')
            return setFilteredPlants(plants)
        
        const filtered = plants.filter(plant => 
            plant.environments.includes(environments)
        )

        setFilteredPlants(filtered)
    }

    async function fetchEnvironments() {
        const responseEnvironments = await api.get('/plants_environments?_sort=title&_order=asc')
            
        setEnvironments([{ key: 'all', title: 'Todos' }, ...responseEnvironments.data])
    }

    async function fetchPlants() {

        const responsePlants = await api.get(`/plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

        console.log(responsePlants)

        if(!responsePlants.data)
            return setLoadingAnimation(true) 
        
        if(page > 1){

            setPlants(oldValue => [ ...oldValue,...responsePlants.data ])
            setFilteredPlants(oldValue => [ ...oldValue,...responsePlants.data ])

        }else {

            setPlants(responsePlants.data)
            setFilteredPlants(responsePlants.data)

        }
            
        
        setLoadingAnimation(false) 
        setLoadingListEndAnimation(false)
                
    }

    useEffect(() => {

        fetchEnvironments()

        fetchPlants()

    },[])

    useEffect(() => {
        
        async function getUserNameAsyncStorage(){
            const name = await AsyncStorage.getItem('@PlantManager:user')

            setUserName(name || '')
        }

        getUserNameAsyncStorage()
        
    },[])

    if(loadingAnimation)
        return <Loading />

    return(
        <SafeAreaView style={styles.container}>
            
            <View style={styles.header}>
                <Header image={AvatarImg} title={userName} subTitle="Olá" />

                <View>
                    <Text style={styles.title}>Em qual hambiente</Text> 
                    <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
                </View>
            </View>
        

            <View>
                <FlatList
                    data={environments}
                    keyExtractor={(item) => String(item.key)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                    renderItem={
                        ({ item }) => (
                            <EnvironmentButton 
                                title={item.title}
                                active={item.key === environmentsSelect}
                                onPress={() => handleEnvironmentsSelected(item.key)}
                            />
                        )
                    }
                />
            </View>

            <View style={styles.plant}>

                
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={({ item }) => (
                            <PlantCardPrimary 
                                title={item.name} 
                                image={item.photo} 
                                onPress={() => handleSavePlant(item)}
                            />
                        )
                    }
                    onEndReachedThreshold={0.3}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingListEndAnimation ? (
                            <ActivityIndicator color={colors.green} />
                        ) : <></>
                    }
                />
                
               
            </View>
                 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingHorizontal: 33
    },
    title: {
        fontFamily: fonts.heading,
        color: colors.heading,
        fontSize: 18,
        lineHeight: 23
    },
    subtitle: {
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 18,
        lineHeight: 23
    },
    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 30,
        marginVertical: 33,
        paddingRight: 32
    },
    plant: {
        flex: 1,
        paddingHorizontal: 33,
        justifyContent: 'center'
    },
})