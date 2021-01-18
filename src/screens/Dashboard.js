import React from "react";
import {View, Text, StyleSheet, ScrollView, LogBox} from 'react-native';
import {Button, Input, Card, SearchBar} from "react-native-elements";
import {Modal} from "react-native-paper";
import Icon from 'react-native-vector-icons/Entypo';
import CardDashboard from "../components/CardDashboard";
import firebase from '../services/firebase';
import moment from "moment";

LogBox.ignoreAllLogs();

const Dashboard = () => {
    const [dataUser, setDataUser] = React.useState([])
    const [total, setTotal] = React.useState('0')
    const [month, setMonth] = React.useState('')
    const [search, setSearch] = React.useState('')
    const [visible, setVisible] = React.useState(false)
    const [amount, setAmount] = React.useState('')
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mai", "Juni",
        "Juli", "Augustus", "September", "Oktober", "November", "Desember"
    ];
    const [user, setUser] = React.useState({})
    const refUser = firebase.firestore().collection('user')
    const refTransaction = firebase.firestore().collection('transaction')

    React.useEffect(() => {
        handleMonth()
        if (search === '') {
            refUser.onSnapshot(getAllDataUser)
        }else {
            handleSearch(search)
        }
    },[search])

    const getAllDataUser = (querySnapshot) => {
        const users = []
        querySnapshot.forEach((doc) => {
            const { name, amount, status, transactions} = doc.data()
            users.push({
                key: doc.id,
                name,
                amount,
                status,
                transactions,
            });
        });
        setDataUser(users)
    }

    const handleSearch = (value) => {
        let users = []
        users = dataUser.filter( item => {
            return item.name.toLowerCase().match(value.toLowerCase())
        })
        setDataUser(users)
    }

    const handleTransaction = (user) => {
        setUser(user)
        handleModal()
    }

    const generateUser = () => {
        let row
        if (dataUser.length !== 0){
            row = (
                dataUser.map((item,index) => {
                    return(
                        <View key={index}>
                            <CardDashboard
                                user={item}
                                idtr={item.transactions[item.transactions.length-1]}
                                handleTransaction={handleTransaction}
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

    const handleMonth = () => {
        setMonth(monthNames[new Date().getMonth()])
    }

    const handleModal = () => {
        setAmount('')
        setTotal('0')
        setVisible(!visible)
    }

    const updateUser = () => {
        const updateRef = firebase.firestore().collection('user').doc(user.key)
        console.log('ini array'+user.transactions)
        updateRef.set({
            name: user.name,
            amount: amount,
            status: user.status,
            transactions: user.transactions,
        }).then((docRef) => {
        }).catch(error => {
            console.log('update ' +error )
        })
    }

    const saveTransaction = (status) => {
        const newDate = moment(new Date()).format('YYYY-MM-DD')
        const resultAmount = amount - user.amount
        const resultTotal = resultAmount * 3000
        refTransaction.add({
            userId: user.key,
            name: user.name,
            amount: resultAmount,
            total: resultTotal,
            date_transaction: newDate,
            date_record: newDate,
            status: status,
        }).then((docRef) => {
            user.transactions.push(docRef.id)
            updateUser()
        }).catch((error) => {
            console.log("save Data tr Error" + error)
        })
    }

    const handleSave = (status) => {
        saveTransaction(status)
        handleModal()
    }

    const handleCalc = (amount) => {
        setAmount(amount)
        let result = parseInt(amount) - parseInt(user.amount)
        let newres = result* 3000
        setTotal(newres.toString())
    }

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
            <View>
                <Card>
                    <Card.Title>{month}</Card.Title>
                    <Card.Divider/>
                    <View>
                        <SearchBar
                            placeholder='Masukan Nama'
                            lightTheme={true}
                            onChangeText={(value) => setSearch(value)}
                            value={search}
                        />
                    </View>
                </Card>
            </View>
                {generateUser()}
            </ScrollView>

            <Modal visible={visible} onDismiss={handleModal} contentContainerStyle={{backgroundColor: 'white', width: 373, paddingBottom: 10, marginLeft: 10}} >
                <Card>
                    <Card.Title>Pembayaran</Card.Title>
                    <Card.Divider/>
                    <View>
                        <Text style={{marginBottom: 10}}>Nama Pelanggan</Text>
                        <Input
                            placeholder='Masukan Nama Pelanggan'
                            leftIcon={{ type: 'ionicons', name: 'person' }}
                            value={user.name}
                            disabled={true}
                        />
                        <Text style={{marginBottom: 10}}>Jumlah Meteran</Text>
                        <Input
                            placeholder='Masukan Jumlah Meteran'
                            leftIcon={{ type: 'antdesign', name: 'dashboard' }}
                            value={amount}
                            keyboardType={'numeric'}
                            onChangeText={(value) => handleCalc(value)}
                        />
                        <Input
                            leftIcon={{ type: 'antdesign', name: 'dashboard' }}
                            value={total}
                            disabled={true}
                        />
                        <Button
                            icon={{
                                name: "payment",
                                type: 'materialIcons',
                                size: 20,
                                color: "white"
                            }}
                            buttonStyle={{backgroundColor: '#16d926', marginBottom: 20}}
                            title="Bayar Tagihan"
                            onPress={() => handleSave('Lunas')}
                        />
                        <View style={styles.vCard}>
                            <Button
                                icon={{
                                    name: "close",
                                    type: 'materialIcons',
                                    size: 20,
                                    color: "white"
                                }}
                                buttonStyle={{backgroundColor: '#d41313', marginRight: 10, width: 150}}
                                title="Batal"
                                onPress={handleModal}
                            />
                            <Button
                                icon={{
                                    name: "done",
                                    type: 'materialIcons',
                                    size: 20,
                                    color: "white"
                                }}
                                buttonStyle={{width: 150}}
                                title="Simpan"
                                onPress={() => handleSave('Belum Lunas')}
                            />
                        </View>
                    </View>
                </Card>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    scroll: {
        marginTop: 10
    },
    vCard: {
        flexDirection: 'row',
    },
    txt: {
        fontSize: 15,
        marginBottom: 5
    }
})

export default Dashboard;
