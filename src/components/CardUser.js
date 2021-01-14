import React from "react";
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Avatar, Badge} from "react-native-elements";

const CardUser = props => {
    const {user, handleDetail} = props

    const handleUserStatus = (status) => {
        if (status === 'Aktif'){
            return(
                <Badge
                    status="success"
                    containerStyle={{ position: 'absolute', top: 0, right: 0 }}
                />
            )
        }else {
            return (
                <Badge
                    status="error"
                    containerStyle={{ position: 'absolute', top: 0, right: 0 }}
                />
            )
        }
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleDetail(user)}>
                <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 5, marginRight: 5}}>
                    <View style={[styles.vTitle,{width: 190, borderBottomWidth: 1, borderLeftWidth: 1, flexDirection: 'row', alignItems: 'center'}]}>
                        <View style={styles.image}>
                            <Avatar
                                rounded
                                source={require('../profile_placeholder.png')}
                                size='small'
                            />
                            {handleUserStatus(user.status)}
                        </View>
                        <Text style={{fontSize: 15}}>{user.name}</Text>
                    </View>
                    <View style={[styles.vTitle,{width: 190, borderRightWidth: 1, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center'}]}>
                        <Text style={{fontSize: 15}}>{user.amount}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    vTitle: {
        borderTopWidth: 1,
        height: 60,
        borderColor: '#989a9c'
    },
    image: {
        marginLeft: 15,
        marginRight: 20,
    }
})

export default CardUser;
