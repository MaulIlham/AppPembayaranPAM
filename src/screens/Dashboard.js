import React from "react";
import {View, Text, StyleSheet, ScrollView, Dimensions, TextInput} from 'react-native';
import {Button, Card, Input} from "react-native-elements";
import {Modal} from "react-native-paper";
import Icon from 'react-native-vector-icons/Entypo'
import CardDashboard from "../components/CardDashboard";
import firebase from '../services/firebase'

const Dashboard = () => {
    const [dataUser, setDataUser] = React.useState([])
    const [month, setMonth] = React.useState('')
    const [visible, setVisible] = React.useState(false)
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mai", "Juni",
        "Juli", "Augustus", "September", "Oktober", "November", "Desember"
    ];
    const [user, setUser] = React.useState({})
    const [amount, setAmount] = React.useState(0)
    const refUser = firebase.firestore().collection('user')
    const refTransaction = firebase.firestore().collection('transaction')

    React.useEffect(() => {
        handleMonth()
        refTransaction.onSnapshot(getTransaction)
    },[])

    const getTransaction = async (querySnapshot) => {
        refUser.doc('OU3msu1wfEIwNnBHLqmk').collection('transactions').doc('i6DHq9fa3bFO8Co1YyXp').get().then(doc => {
            const { name} = doc.data()
            console.log(name)
        })
    }


    const generateTransactions = () => {
        let row
        if (dataUser.length !== 0){
            row = (
                dataUser.map((item,index) => {
                    return(
                        <View key={index}>
                            <CardDashboard
                                id={item.key}
                                name={item.name}
                                status={item.status}
                                handleDetailUser={handleDetailUser}
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
        setVisible(!visible)
    }

    return(
        <View style={styles.container}>
            <Card>
                <Card.Title>{month}</Card.Title>
                <Card.Divider/>
                <View style={styles.vCard}>
                    <View style={{width: 165, alignItems: 'center'}}>
                        <Text style={styles.txt}>Lunas</Text>
                        <Text style={styles.txt}>0</Text>
                    </View>
                    <View style={{width: 165, alignItems: 'center'}}>
                        <Text style={styles.txt}>Belum Lunas</Text>
                        <Text style={styles.txt}>0</Text>
                    </View>
                </View>
            </Card>
            <ScrollView style={styles.scroll}>
                {generateTransactions()}
            </ScrollView>
            <Modal visible={visible} onDismiss={handleModal} contentContainerStyle={{ width: 373, paddingBottom: 10, marginLeft: 10}} >
                <Card>
                    <Card.Title>Transaksi</Card.Title>
                    <Card.Divider/>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Input
                            placeholder='Masukan Nama Pelanggan'
                            leftIcon={{ type: 'ionicons', name: 'person' }}
                            value={user.name}
                            disabled={true}
                        />
                        <Button
                            icon={{
                                name: "close",
                                type: 'materialIcons',
                                size: 20,
                                color: "white"
                            }}
                            buttonStyle={{marginLeft: 10, marginRight: 15, marginBottom: 10, marginTop: 10}}
                            title="Bayar"
                            onPress={handleModal}
                        />
                        <Button
                            icon={{
                                name: "close",
                                type: 'materialIcons',
                                size: 20,
                                color: "white"
                            }}
                            buttonStyle={{backgroundColor: '#d41313', marginLeft: 10, marginRight: 15}}
                            title="Batal"
                            onPress={handleModal}
                        />
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
