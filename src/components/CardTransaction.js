import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {Card} from "react-native-elements";

const CardTransaction = props => {
    const {user, handleDetail} = props
   
    return(
        <View >
            <TouchableOpacity onPress={() => handleDetail(user)}>
                <Card>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Divider/>
                    <View style={{flexDirection: 'column'}}>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <View style={{flexDirection: 'column', width: 180}}>
                                <Text style={{fontSize: 15}}>Jumlah Meteran</Text>
                                <Text style={{fontSize: 15}}>{user.amount}</Text>
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{fontSize: 15}}>Total Bayar</Text>
                                <Text style={{fontSize: 15}}>Rp. {user.total}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flexDirection: 'column', width: 180}}>
                                <Text style={{fontSize: 15}}>Tanggal Pencatatan</Text>
                                <Text style={{fontSize: 15}}>{user.date_record}</Text>
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{fontSize: 15}}>Status</Text>
                                <Text style={{fontSize: 15}}>{user.status}</Text>
                            </View>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        </View>
    )
}

export default CardTransaction;
