import React from 'react'
import { StatusBar } from 'react-native'
import *  as Notification from 'expo-notifications'
import { createServer, Model } from 'miragejs';

import { Routes } from './src/routes';
import { PlantProps } from './src/libs/storage';

import AppLoading from 'expo-app-loading'
import { 
  useFonts, 
  Jost_400Regular, 
  Jost_600SemiBold 
} from '@expo-google-fonts/jost'

import colors from './src/styles/colors'
import { useEffect } from 'react';

/*const server = createServer({
  routes () {
    this.namespace = 'api';

    this.get('/plants', () => {
      return { 
        plants: [
          {
            id: 1,
            name: "Aningapara",
            about: "É uma espécie tropical que tem crescimento rápido e fácil manuseio.",
            water_tips: "Mantenha a terra sempre húmida sem encharcar. Regue 2 vezes na semana.",
            photo: "https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/1.svg",
            environments: ["living_room", "kitchen"],
            frequency: {
              times: 2,
              repeat_every: "week"
            }
          },
      ]
    }
    })
  }
})*/



export default function App(){

  const [ fontsLoaded ] = useFonts({
    Jost_400Regular, 
    Jost_600SemiBold 
  })

  useEffect(() => {
    const subscription = Notification.addNotificationReceivedListener(
      async notification => {
        const data =  notification.request.content.data.plant as PlantProps
      }
    ) 

    return () => subscription.remove()
    
  },[])

  if(!fontsLoaded)
    return <AppLoading />

  return(
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.green} />
      <Routes />
    </>
  )
}
