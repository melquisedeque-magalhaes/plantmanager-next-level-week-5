import React from 'react'
import { View, Text, StyleSheet} from 'react-native'

export function Modal(){
    return(
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <Text>Error</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        height: '100%',
        width: '100%',
    },
    modalContainer: {
        height: 60,
        width: '80%',
    }
})