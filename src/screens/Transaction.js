import React from "react";
import {View, Text, ScrollView} from "react-native";
import {Button, Card, Input, SearchBar} from "react-native-elements";
import firebase from "../services/firebase";
import {Modal} from "react-native-paper";
import Icon from "react-native-vector-icons/Entypo";
import CardTransaction from "../components/CardTransaction";
import moment from "moment";

const Transaction = props => {
    const [dataTransaction, setDataTransaction] = React.useState([])
    const [search, setSearch] = React.useState('')
    const [dTransaction, setDTransaction] = React.useState({})
    const [visible, setVisible] = React.useState(false)
    const refTransaction = firebase.firestore() .collection('transaction')

    React.useEffect(() => {
        if (search === '') {
            refTransaction.onSnapshot(getAllDataUser)
        }else {
            handleSearch(search)
        }
    },[search])

    const getAllDataUser = (querySnapshot) => {
        const transactions = []
            querySnapshot.forEach((doc) => {
                const {userId, name, total, status, date_transaction, date_record, amount} = doc.data()
                if (moment(date_record, 'YYYY-MM-DD').month() === new Date().getMonth()) {
                    transactions.push({
                        key: doc.id,
                        userId,
                        name,
                        amount,
                        total,
                        status,
                        date_transaction,
                        date_record,
                    })
                }
            });
        setDataTransaction(transactions)
    }

    const handleSearch = (value) => {
        let transactions = []
        transactions = dataTransaction.filter( item => {
            return item.name.toLowerCase().match(value.toLowerCase())
        })
        setDataTransaction(transactions)
    }

    const generateUser = () => {
        let row
        if (dataTransaction.length !== 0){
            row = (
                dataTransaction.map((item,index) => {
                    return(
                        <View key={index}>
                            <CardTransaction
                                user={item}
                                handleDetail={handleDetail}
                            />
                        </View>
                    )
                })
            )
        }else{
            row = (
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column',marginTop: 340}}>
                    <Icon name="folder" size={90} color={"#1eb8e3"}/>
                    <Text style={{fontSize: 15}}>Data Masih Kosong</Text>
                </View>
            );
        }
        return row
    }

    const handleDetail = (trn) => {
        setDTransaction(trn)
        handleModal()
    }

    const handleModal = () => {
        setVisible(!visible)
    }

    const handleUpdate = () => {
        const newDate = moment(new Date()).format('YYYY-MM-DD')
        const updateRef = firebase.firestore().collection('transaction').doc(dTransaction.key)
        updateRef.set({
            userId: dTransaction.userId,
            name: dTransaction.name,
            amount: dTransaction.amount,
            total: dTransaction.total,
            date_transaction: newDate,
            date_record: dTransaction.date_record,
            status: "Lunas"
        }).then((docRef) => {
        }).catch(error => {
            console.log('update ' +error )
        })
        handleModal()
    }

    const handleButtonPayment = (status) => {
        if (status === 'Belum Lunas'){
            return(
                <Button
                    icon={{
                        name: "payment",
                        type: 'materialIcons',
                        size: 20,
                        color: "white"
                    }}
                    buttonStyle={{backgroundColor: '#16d926', marginBottom: 20}}
                    title="Bayar Tagihan"
                    onPress={handleUpdate}
                />
            )
        }
    }

    return(
        <View>
            <View>
                <SearchBar
                    placeholder='Masukan Nama'
                    lightTheme={true}
                    onChangeText={(value) => setSearch(value)}
                    value={search}
                />
            </View>
            <View style={{height: 600}}>
                <ScrollView>
                    {generateUser()}
                </ScrollView>
            </View>

            <Modal visible={visible} onDismiss={handleModal} contentContainerStyle={{backgroundColor: 'white', width: 373, paddingBottom: 10, marginLeft: 10}} >
                <Card>
                    <Card.Title>Pembayaran</Card.Title>
                    <Card.Divider/>
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{marginBottom: 10, marginRight: 20}}>Nama Pelanggan</Text>
                            <Text style={{marginBottom: 10}}>:  {dTransaction.name}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{marginBottom: 10, marginRight: 20}}>Jumlah Meteran</Text>
                            <Text style={{marginBottom: 10}}>:  {dTransaction.amount}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{marginBottom: 10, marginRight: 20}}>Total Pembayaran</Text>
                            <Text style={{marginBottom: 10}}>:  {dTransaction.total}</Text>
                        </View>
                        <Card.Divider/>
                        {handleButtonPayment(dTransaction.status)}
                        <Button
                            icon={{
                                name: "close",
                                type: 'materialIcons',
                                size: 20,
                                color: "white"
                            }}
                            buttonStyle={{backgroundColor: '#d41313'}}
                            title="Close"
                            onPress={handleModal}
                        />
                    </View>
                </Card>
            </Modal>
        </View>
    )
}

export default Transaction;

