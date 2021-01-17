import React from "react";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {Card, Button} from "react-native-elements";

const CardIdentityUser = props => {
    const {user} = props

    const handleActivateUser = (status) => {

    }

    const handleStatus = (status) => {
        if (status === 'Aktif'){
            return(
                <View>
                    <Button
                        icon={{
                            name: "person-remove",
                            type: 'materialIcons',
                            size: 20,
                            color: "white"
                        }}
                        buttonStyle={{backgroundColor: '#d41313', marginLeft: 10, marginRight: 15}}
                        title="Non-Aktifkan Pelanggan"
                        onPress={handleActivateUser('Tidak Aktif')}
                    />
                </View>
            )
        }else {
            return(
                <View>
                    <Button
                        icon={{
                            name: "person-add",
                            type: 'materialIcons',
                            size: 20,
                            color: "white"
                        }}
                        buttonStyle={{ backgroundColor: '#16d926', marginLeft: 10, marginRight: 15}}
                        title="Aktifkan Pelanggan"
                        onPress={handleActivateUser('Aktif')}
                    />
                </View>
            )
        }
    }

    return(
        <View>
            <Card containerStyle={{height: 220, flexDirection: 'column'}}>
                <Card.Title>Data User</Card.Title>
                <Card.Divider/>
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginLeft: 10, fontSize: 15}}>Nama  : </Text>
                        <Text style={{marginLeft: 10, fontSize: 15}}>{user.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                        <Text style={{marginLeft: 10, fontSize: 15}}>Jumlah Meteran Terakhir  : </Text>
                        <Text style={{marginLeft: 10, fontSize: 15}}>{user.amount}</Text>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{marginLeft: 10, fontSize: 15, marginBottom: 5}}>Status  : </Text>
                        {handleStatus(user.status)}
                    </View>
                </View>
            </Card>
        </View>
    )
}

export default CardIdentityUser;
