import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface HeaderProps {
    title: string | undefined;
    subTitle: string;
    image: any;
}

export function Header({ image, subTitle, title }: HeaderProps){

    return(
        <View style={styles.container}>
            <Text style={styles.titleHeader}>
                {subTitle}, {'\n'} 
                <Text style={styles.titleName}>{title}</Text>
            </Text>
            
            <Image
                style={styles.image} 
                source={image} 
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        marginTop: getStatusBarHeight(),
        paddingVertical: 20
    },
    titleHeader: {
        fontSize: 32,
        lineHeight: 36,
        fontWeight: '300',
        fontFamily: fonts.text,
        color: colors.heading,
    },
    titleName: {
        fontFamily: fonts.heading
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    }
})