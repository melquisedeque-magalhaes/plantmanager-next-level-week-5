import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AuthRoutes } from './tab.routes'

import { Welcome } from '../pages/Welcome'
import { UserIdentification } from '../pages/UserIdentification'
import { Confirmation } from '../pages/Confirmation'
import { PlantSave } from '../pages/PlantSave'

const stackRoutes = createStackNavigator()

export const AppRoutes: React.FC = () => {

    const [ isHaveUser, setIsHaveUser ] = useState(false)

    async function getUser() {

        const data = await AsyncStorage.getItem('@PlantManager:user')

        const user = data ? true : false

        setIsHaveUser(user)

    }

    useEffect(() => {
        getUser()
    },[])

    return(
        <stackRoutes.Navigator
            headerMode="none"
        >
            {/*!isHaveUser ? (
                <>
                    <stackRoutes.Screen 
                        component={Welcome} 
                        name="Welcome" 
                    />

                    <stackRoutes.Screen 
                        component={UserIdentification} 
                        name="UserIdentification" 
                    />

                    <stackRoutes.Screen 
                        component={Confirmation} 
                        name="Confirmation" 
                    />
                </>
            ) : (
                <>
                    <stackRoutes.Screen 
                        component={AuthRoutes} 
                        name="PlantSelect" 
                    />

                    <stackRoutes.Screen 
                        component={PlantSave} 
                        name="PlantSave" 
                    />

                    <stackRoutes.Screen 
                        component={AuthRoutes} 
                        name="MyPlants" 
                    />
                </>
            )*/}
            <stackRoutes.Screen 
                component={Welcome} 
                name="Welcome" 
            />

            <stackRoutes.Screen 
                component={UserIdentification} 
                name="UserIdentification" 
            />

            <stackRoutes.Screen 
                component={Confirmation} 
                name="Confirmation" 
            />
        <stackRoutes.Screen 
                component={AuthRoutes} 
                name="PlantSelect" 
            />

            <stackRoutes.Screen 
                component={PlantSave} 
                name="PlantSave" 
            />

            <stackRoutes.Screen 
                component={AuthRoutes} 
                name="MyPlants" 
            />
            
        </stackRoutes.Navigator>
    )
}