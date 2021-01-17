import React from "react";
import {View, Text} from "react-native";
import {Card} from "react-native-elements";
import firebase from "../services/firebase";
import moment from "moment";

const CardHistoryTransaction = props => {
    const {idTransaction} = props
    const [transaction, setTransaction] = React.useState({})
    const [month, setMonth] = React.useState('')
    const [year, setYear] = React.useState(0)
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mai", "Juni",
        "Juli", "Augustus", "September", "Oktober", "November", "Desember"
    ];
    const refTransaction = firebase.firestore().collection('transaction')

    React.useEffect(() => {
        getTransaction()
    },[])

    const getTransaction = () => {
        let tr = {}
        refTransaction.doc(idTransaction).get().then( doc => {
            getMonthName(doc.data().date_transaction)
            setTransaction(doc.data())
        })
    }

    const getMonthName = (date) => {
        let dat = moment(date,'YYYY-MM-DD')
        setMonth(monthNames[dat.month()])
        setYear(dat.year())
    }

    return(
        <View>
            <Card containerStyle={{height: 170, flexDirection: 'column'}}>
                <Card.Title>{month}</Card.Title>
                <Card.Divider/>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginLeft: 10, fontSize: 15}}>Jumlah Meteran  : </Text>
                        <Text style={{marginLeft: 10, fontSize: 15}}>{transaction.amount}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 10}}>
                        <Text style={{marginLeft: 10, fontSize: 15}}>Total  : Rp.</Text>
                        <Text style={{marginLeft: 10, fontSize: 15}}>{transaction.total}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginLeft: 10, fontSize: 15}}>Tanggal Pembayaran  : </Text>
                        <Text style={{marginLeft: 10, fontSize: 15}}>{transaction.date_transaction}</Text>
                    </View>
                </View>
            </Card>
        </View>
    )
}

export default CardHistoryTransaction
