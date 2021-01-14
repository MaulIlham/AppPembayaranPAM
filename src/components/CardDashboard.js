import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Card, Badge} from "react-native-elements";

const CardDashboard = props => {
    const {name, status, handleDetailUser, id} = props

    const handleBadge = (status) => {
        if (status === 'Lunas'){
            return(
                <View style={styles.vCard}>
                    <Badge value="  " status="success" containerStyle={styles.badge}/>
                    <Text style={{fontSize: 15, marginLeft: 30}}>{status}</Text>
                </View>
            )
        }else {
            return (
                <View style={styles.vCard}>
                    <Badge value="  " status="error" containerStyle={styles.badge}/>
                    <Text style={{fontSize: 15, marginLeft: 30}}>{status}</Text>
                </View>
            )
        }
    }

    return(
            <View style={styles.container}>
                <TouchableOpacity onPress={() => handleDetailUser(name,status, id)}>
                    <Card containerStyle={styles.card}>
                        <View style={styles.vCard}>
                            <View style={styles.vtext}>
                                <Text style={styles.txtName}>{name}</Text>
                            </View>
                            {handleBadge(status)}
                        </View>
                    </Card>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    txtName: {
        marginLeft: 10,
        fontSize: 20,
    },
    card: {
        justifyContent: 'center',
        height: 80,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    badge: {
        position: 'absolute',
    },
    vCard: {
        flexDirection: 'row'
    },
    vtext: {
        width: 200,
    }
})

export default CardDashboard;
