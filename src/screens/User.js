import React from "react";
import {View, StyleSheet, Text, ScrollView, Alert} from "react-native";
import {Divider, SearchBar, Card, Input, Button} from "react-native-elements";
import {FAB, Modal} from "react-native-paper";
import CardUser from "../components/CardUser";
import firebase from '../services/firebase'
import {Fold} from 'react-native-animated-spinkit'

const User = props => {
    const [user, setUser] = React.useState({
        name: '',
        amount: '',
        status: 'Aktif',
        transactions: [],
    })
    const [dataUser, setDataUser] = React.useState([])
    const [search, setSearch] = React.useState('')
    const refFire = firebase.firestore().collection('user')
    const [visible, setVisible] = React.useState(false)

    React.useEffect(() => {
        if (search === '') {
            refFire.onSnapshot(getAllDataUser)
        }else {
            handleSearch(search)
        }
    },[search])

    const getAllDataUser = (querySnapshot) => {
        const users = [];
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
        let users = [];
        setSearch(value)
        users = dataUser.filter( item => {
            return item.name.toLowerCase().match(value.toLowerCase())
        })
        setDataUser(users)
    }

    const saveData = () => {
        let er = ''
        refFire.add({
            name: user.name,
            amount: user.amount,
            status: user.status,
            transactions: user.transactions,
        }).then((docRef) => {
            Alert.alert(
                "",
                'Data Berhasil Tersimpan',
                [
                    {
                        Text: "OK",
                    }
                ], { cancelable: false })
        })
            .catch((error) => {
                console.log('Save Data Error ' + error)
                er = 'error'
                Alert.alert(
                    "",
                    'Data Gagal Tersimpan',
                    [
                        {
                            Text: "OK",
                        }
                    ], { cancelable: false })
            })
        setUser({...user, name: '', amount: ''})
    }

    const handleSave = () => {
       if (user.name !== '' || user.amount !== ''){
           saveData()
           handleModal()
       }else {
           Alert.alert(
               "",
               'Mohon lengkapi data terlebih dahulu!',
               [
                   {
                       Text: "OK",
                   }
               ], { cancelable: false })
       }
    }

    const handleClose = () => {
        setUser({...user, name: '', amount: ''})
        handleModal()
    }

    const handleDetail = (user) => {
        props.navigation.navigate('DetailUser',{
            user: user
        })
    }

    const generateUser = () => {
        let row
        if (dataUser.length !== 0){
            row = (
                dataUser.map((item,index) => {
                    return(
                        <View key={index}>
                            <CardUser
                                user={item}
                                handleDetail={handleDetail}
                            />
                        </View>
                    )
                })
            )
        }else {
            row = (
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column',marginTop: 240}}>
                    <Fold size={100} color='#00d3eb'/>
                </View>
            );
        }
        return row
    }

    const handleModal = () => {
        setVisible(!visible)
    }

    return(
        <View style={styles.container}>
            <View style={styles.vSearch}>
                <SearchBar
                    placeholder='Masukan Nama'
                    lightTheme={true}
                    onChangeText={(value) => setSearch(value)}
                    value={search}
                />
            </View>
            <Divider style={{ backgroundColor: 'black', marginRight: 5, marginLeft: 5}} />
            <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 5, marginRight: 5}}>
                <View style={[styles.vTitle,{width: 190, borderWidth: 1}]}>
                    <Text style={{fontSize: 15}}>Nama</Text>
                </View>
                <View style={[styles.vTitle,{width: 190, borderRightWidth: 1, borderBottomWidth: 1, borderTopWidth: 1}]}>
                    <Text style={{fontSize: 15}}>Meteran Terakhir</Text>
                </View>
            </View>
            <ScrollView style={{marginTop: 5}}>
                {generateUser()}
            </ScrollView>

            <Modal visible={visible} onDismiss={handleModal} contentContainerStyle={{backgroundColor: 'white', width: 373, paddingBottom: 10, marginLeft: 10}} >
                <Card>
                    <Card.Title>Tambah Pelanggan Baru</Card.Title>
                    <Card.Divider/>
                    <View>
                        <Text style={{marginBottom: 10}}>Nama Pelanggan</Text>
                        <Input
                            placeholder='Masukan Nama Pelanggan'
                            leftIcon={{ type: 'ionicons', name: 'person' }}
                            value={user.name}
                            onChangeText={(value) => setUser({...user, name: value})}
                        />
                        <Text style={{marginBottom: 10}}>Jumlah Meteran</Text>
                        <Input
                            placeholder='Masukan Jumlah Meteran'
                            leftIcon={{ type: 'antdesign', name: 'dashboard' }}
                            value={user.amount}
                            keyboardType={'numeric'}
                            onChangeText={(value) => setUser({...user, amount: value})}
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
                icon="account-plus"
                style={styles.btnUser}
                onPress={ () => handleModal()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    vTitle: {
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        borderColor: '#989a9c'
    },
    vSearch: {
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5
    },
    btnUser: {
        position: 'absolute',
        margin: 16,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#22c4d6'
    },
})

export default User;
