import React from "react";
import {View, Text, ScrollView} from "react-native";
import {SearchBar} from "react-native-elements";
import firebase from "../services/firebase";
import Icon from "react-native-vector-icons/Entypo";
import CardTransaction from "../components/CardTransaction";
import moment from "moment";

const Transaction = props => {
    const [dataUser, setDataUser] = React.useState([])
    const [dataTransaction, setDataTransaction] = React.useState([])
    const [search, setSearch] = React.useState('')
    const refUser = firebase.firestore() .collection('transaction')

    React.useEffect(() => {
        if (search === '') {
            refUser.onSnapshot(getAllDataUser)
        }else {
            handleSearch(search)
        }
    },[])

    const getAllDataUser = (querySnapshot) => {
        const users = []
        querySnapshot.forEach((doc) => {
            const { userId, total, status, date_transaction, date_record, amount} = doc.data()
            if (moment(date_record, 'YYYY-MM-DD').month() === new Date().getMonth()) {
                users.push({
                    key: doc.id,
                    userId,
                    amount,
                    total,
                    date_transaction,
                    date_record,
                    status
                });
            }
        });
        setDataUser(users)
    }

    const getName = (idUser) => {
        let result

    }

    const handleSearch = (value) => {
        let users = []
        users = dataUser.filter( item => {
            return item.name.toLowerCase().match(value.toLowerCase())
        })
        setDataUser(users)
    }

    const generateUser = () => {
        let row
        if (dataUser.length !== 0){
            row = (
                dataUser.map((item,index) => {
                    return(
                        <View key={index}>
                            <CardTransaction
                                user={item}
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
        </View>
    )
}

export default Transaction;

