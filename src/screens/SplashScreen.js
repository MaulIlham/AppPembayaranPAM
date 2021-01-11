import React from "react";
import {View, StyleSheet, Text, Image, Dimensions} from "react-native";
import { Wander } from 'react-native-animated-spinkit'

const SplashScreen = props => {

    React.useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate('Dashboard')
        }, 3000)
    },[])

    const height = Dimensions.get('window').height
    const widht = Dimensions.get('window').width

    return(
        <View style={[styles.container, {height: height, width: widht}]}>
            <Image source={require('../Logo.png')} resizeMode='stretch' style={styles.image} />
            <Wander size={50} style={styles.spinner} color='#00d3eb'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    image: {
        height: 200,
        width: 200
    },
    spinner: {
        marginTop: 50
    }
})

export default SplashScreen;
