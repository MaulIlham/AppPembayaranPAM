import React from "react";
import {View, Text} from "react-native";
import {Card} from "react-native-elements";

const CardTransaction = props => {

    return(
        <View>
            <Card>
                <Card.Title></Card.Title>
                <Card.Divider/>
                <View>
                    <Text>Rp. </Text>
                    <Text></Text>
                </View>
            </Card>
        </View>
    )
}

export default CardTransaction;
