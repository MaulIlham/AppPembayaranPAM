import React from "react";
import {View, StyleSheet, Text, ScrollView} from "react-native";
import {Divider, SearchBar, Card, Input, Button} from "react-native-elements";
import {FAB, Modal} from "react-native-paper";
import CardUser from "../components/CardUser";
import Icon from 'react-native-vector-icons/Entypo'
import firebase from '../services/firebase'
import {Fold, Wander} from 'react-native-animated-spinkit'

const User = props => {
    const [user, setUser] = React.useState({
        name: 'Rudi',
        description: 'oo',
        status: 'Aktif',
    })
    const [dataUser, setDataUser] = React.useState([])
    const [search, setSearch] = React.useState('')
    const refFire = firebase.firestore().collection('user')
    const [visible, setVisible] = React.useState(false)
    const [flag, setFlag] = React.useState('save')

    React.useEffect(() => {
        if (search === '') {
            refFire.onSnapshot(getAllDataUser)
        }else {
            handleSearch(search)
        }
    },[search])

    const getAllDataUser = (queysnapshot) => {
        const users = [];
        queysnapshot.forEach((doc) => {
            const { name, description, status} = doc.data()
            users.push({
                name,
                description,
                status,
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

    const handleSave = () => {
        if (flag === 'save') {
            refFire.add({
                name: user.name,
                description: user.description,
                status: user.status,
            }).then((docRef) => {
                console.log("")
            })
                .catch((error) => {
                    console.log('Save Data Error ' + error)

                })
        }else {
            
        }
        setVisible(!visible)
    }

    const handleUpdate = (name, description) => {
        setFlag('update')
        setVisible(!visible)
        setUser({...user, name: name, description: description})
    }

    const handleButtonUpdate = () => {
        if (flag === 'update'){
            return(
                <View style={{marginBottom: 20}}>
                    <Text style={{marginBottom: 10}}>Status</Text>
                    <Button
                        icon={{
                            name: "user-unfollow",
                            type: 'simple-line-icon',
                            size: 18,
                            color: "white",
                        }}
                        buttonStyle={{backgroundColor: '#d41313'}}
                        title="Non-Aktifkan Pelanggan"
                        onPress={handleSave}
                    />
                </View>
            )
        }
    }

    const generateUser = () => {
        let row
        if (dataUser.length !== 0){
            row = (
                dataUser.map((item,index) => {
                    return(
                        <View key={index}>
                            <CardUser
                                name={item.name}
                                description={item.description}
                                status={item.status}
                                handleUpdate={handleUpdate}
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
                    placeholder='Inputkan Nama'
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
                    <Text style={{fontSize: 15}}>Deskripsi</Text>
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
                            onChangeText={(value) => setUser({...user, name: value})}
                        />
                        <Text style={{marginBottom: 10}}>Deskripsi</Text>
                        <Input
                            placeholder='Masukan Deskripsi'
                            leftIcon={{ type: 'entypo', name: 'open-book' }}
                            onChangeText={(value) => setUser({...user, description: value})}
                        />
                        {handleButtonUpdate()}
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
                                onPress={handleModal}
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
