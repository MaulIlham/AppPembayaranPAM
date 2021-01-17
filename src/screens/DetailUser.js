import React from "react";
import {View, Text, ScrollView} from "react-native";
import {FAB, Modal} from "react-native-paper";
import CardIdentityUser from "../components/CardIdentityUser";
import Icon from "react-native-vector-icons/Entypo";
import CardHistoryTransaction from "../components/CardHistoryTransaction";
import {Button, Card, Input} from "react-native-elements";
import firebase from "../services/firebase";

const DetailUser = props => {
    const {user} = (props.route.params)
    const [visible, setVisible] = React.useState(false)
    const [dUser, setDUser] = React.useState({
        name: '',
        amount: '',
    })

    const handleModal = () => {
        setVisible(!visible)
    }

    const handleClose = () => {
        setDUser({...dUser, name: '', amount: ''})
        handleModal()
    }

    React.useEffect(() => {
        setDUser({...dUser, name: user.name, amount: user.amount})
    },[])

    const handleSave = () => {
        const updateRef = firebase.firestore().collection('user').doc(user.key)
        updateRef.set({
            name: dUser.name,
            amount: dUser.amount,
            status: user.status,
            transactions: user.transactions
        }).then((docRef) => {
            setDUser({...dUser, name: '', amount: ''})
            setVisible(!visible)
        }).catch(error => {
            console.log('update ' +error )
        })


    }

    const generateHistoryTransaction = () => {
        let row
        if (user.transactions.length !== 0){
            row = (
                user.transactions.map((item,index) => {
                    return(
                        <View key={index}>
                            <CardHistoryTransaction
                                idTransaction={item}
                            />
                        </View>
                    )
                })
            )
        }else {
            row = (
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column',marginTop: 340}}>
                    <Icon name="folder" size={90} color={"#1eb8e3"}/>
                    <Text style={{fontSize: 15}}>Data Masih Kosong</Text>
                </View>
            );
        }
        return row
    }

    return(
        <View>
            <ScrollView>
                <CardIdentityUser
                    user={user}
                />
                {generateHistoryTransaction()}
            </ScrollView>

            <Modal visible={visible} onDismiss={handleModal} contentContainerStyle={{backgroundColor: 'white', width: 373, paddingBottom: 10, marginLeft: 10}} >
                <Card>
                    <Card.Title>Ubah Data Pelanggan</Card.Title>
                    <Card.Divider/>
                    <View>
                        <Text style={{marginBottom: 10}}>Nama Pelanggan</Text>
                        <Input
                            placeholder='Masukan Nama Pelanggan'
                            leftIcon={{ type: 'ionicons', name: 'person' }}
                            value={dUser.name}
                            onChangeText={(value) => setDUser({...user, name: value})}
                        />
                        <Text style={{marginBottom: 10}}>Jumlah Meteran</Text>
                        <Input
                            placeholder='Masukan Jumlah Meteran'
                            leftIcon={{ type: 'antdesign', name: 'dashboard' }}
                            value={dUser.amount}
                            keyboardType={'numeric'}
                            onChangeText={(value) => setDUser({...user, amount: value})}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <Button
                                icon={{
                                    name: "close",
                                    type: 'materialIcons',
                                    size: 20,
                                    color: "white"
                                }}
                                buttonStyle={{backgroundColor: '#d41313', marginLeft: 10, marginRight: 15, width: 130}}
                                title="Batal"
                                onPress={handleClose}
                            />
                            <Button
                                icon={{
                                    name: "done",
                                    type: 'materialIcons',
                                    size: 20,
                                    color: "white"
                                }}
                                buttonStyle={{marginLeft: 15, width: 130}}
                                title="Simpan"
                                onPress={handleSave}
                            />
                        </View>

                    </View>
                </Card>
            </Modal>

            <FAB
                icon="account-edit"
                style={{
                    position: 'absolute',
                    margin: 16,
                    bottom: 0,
                    right: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#22c4d6'
                }}
                onPress={ () => handleModal()}
            />
        </View>
    )
}

export default DetailUser;
