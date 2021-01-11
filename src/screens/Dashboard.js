import React from "react";
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Card, PricingCard} from "react-native-elements";
import {FAB} from "react-native-paper";
import Icon from 'react-native-vector-icons/Entypo'
import CardDashboard from "../components/CardDashboard";

const Dashboard = () => {
    const [transactions, setTransactions] = React.useState([
        {
            id: 0,
            name: 'Aulia',
            amount: 152,
            total: 50000,
            dateTransaction: '04-01-2021',
            status: 'Lunas',
        },
        {
            id: 1,
            name: 'Riski',
            amount: 100,
            total: 30000,
            dateTransaction: '03-01-2021',
            status: 'Lunas',
        },
        {
            id: 2,
            name: 'Orang',
            amount: 321,
            total: 45000,
            dateTransaction: '',
            status: 'Belum Terbayar',
        },
    ])
    const [month, setMonth] = React.useState('')
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mai", "Juni",
        "Juli", "Augustus", "September", "Oktober", "November", "Desember"
    ];

    React.useEffect(() => {
        handleMonth()
    })

    const generateTransactions = () => {
        let row
        if (transactions.length !== 0){
            row = (
                transactions.map((item,index) => {
                    return(
                        <View key={index}>
                            <CardDashboard
                                name={item.name}
                                status={item.status}
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
    const widht = Dimensions.get('window').width


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
