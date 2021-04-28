import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notification from 'expo-notifications'
import { format } from 'date-fns'

export interface PlantProps {
    id: number;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string;
    };
    dateTimeNotification: Date;
    hour: string;
}

export interface StoragePlantProps {
    [id: string]: {
        data: PlantProps;
        notificationId: string;
    }
}

export async function savePlant( plant : PlantProps): Promise<void>{
    try {

        const nextTime = new Date(plant.dateTimeNotification)
        const now = new Date()

        const { repeat_every, times } = plant.frequency

        if(repeat_every === 'week'){
            const interval =  Math.trunc(7 / times)
            nextTime.setDate(now.getDate() + interval)

        }else 
            nextTime.setDate(nextTime.getDate() + 1)

        const seconds =  Math.abs(
            Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
        )

        const notificationId = await Notification.scheduleNotificationAsync({
            content: {
                title: 'Heeeey 🌱',
                body: `Está na hora de cuidar da sua ${plant.name}`,
                sound: true,
                priority: Notification.AndroidNotificationPriority.HIGH,
                data: {
                    plant
                },
            },
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true
            }
        })

        const data = await AsyncStorage.getItem('@PlantManager:plant')

        const oldPlant = data ? (JSON.parse(data) as StoragePlantProps) : {}

        const newPlant = {
            [plant.id]: {
                data: plant,
                notificationId
            }
        }

        await AsyncStorage.setItem('@PlantManager:plant', 
            JSON.stringify({ 
                ...newPlant,
                ...oldPlant
             })
        )

    } catch (err) {
        throw new Error(err)
    }
}

export async function loadPlant(): Promise<PlantProps[]>{
    try {

        const data = await AsyncStorage.getItem('@PlantManager:plant')

        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}

        const plantsSorted = Object
            .keys(plants)
            .map((plant) => {
                return {
                    ...plants[plant].data,
                    hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
                }
            })
            .sort((a, b) => 
                Math.floor(
                    new Date(a.dateTimeNotification).getTime() / 1000 -
                    Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
                )
            )

        return plantsSorted
        
    } catch (err) {
        throw new Error(err)
    }
}

export async function removePlant(id: number): Promise<void> {
    const data = await AsyncStorage.getItem('@PlantManager:plant')
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}

    await Notification.cancelScheduledNotificationAsync(plants[id].notificationId)

    delete plants[id]

    await AsyncStorage.setItem(
        '@PlantManager:plant', 
        JSON.stringify(plants)
    )
}