import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Card, Badge} from "react-native-elements";
import firebase from "../services/firebase";

const CardDashboard = props => {
    const {user, handleTransaction, idtr} = props
    const [date, setDate] = React.useState('')
    const [stat, setStat] = React.useState('')
    const refTransaction = firebase.firestore().collection('transaction')

    React.useEffect(() => {
        getLastTransaction()
    })

    const handleBadge = (status) => {
        if (status === 'Lunas'){
            return(
                <Badge
                    status="success"
                    containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                />
            )
        }else {
            return (
                <Badge
                    status="error"
                    containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                />
            )
        }
    }

    const getLastTransaction = () => {
        const transactions = user.transactions
        if (transactions.length !== 0){
            refTransaction.doc(transactions[transactions.length-1]).get().then( doc => {
                const {date_transaction,status} = doc.data()
                setDate(date_transaction)
                setStat(status)
            })
        }else {
            setDate('Belum Ada Transaksi')
        }
    }

    return(
            <View style={styles.container}>
                <TouchableOpacity onPress={() => handleTransaction(user)}>
                    <Card containerStyle={styles.card}>
                        <View style={styles.vCard}>
                            <View style={{width: 190}}>
                                <Text style={styles.txtName}>{user.name}</Text>
                                {handleBadge(stat)}
                            </View>
                            <View style={{width: 210}}>
                                <Text style={styles.txtName}>{date}</Text>
                            </View>
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
        fontSize: 15,
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
    vCard: {
        flexDirection: 'row'
    },
})

export default CardDashboard;
