import React from "react";
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconOctions from 'react-native-vector-icons/Octicons'

// Screens
import SplashScreen from "../screens/SplashScreen";
import Dashboard from "../screens/Dashboard";
import User from "../screens/User";
import DetailUser from "../screens/DetailUser";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen
                    name="Dashboard"
                    component={TabNavigator}
                    options={{
                        title: 'Dashboard',
                        headerStyle: {
                            backgroundColor: '#0077e6',
                        },
                        headerTintColor: '#fff',
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const TabNavigator = () => {
    return(
        <Tab.Navigator
            initialRouteName="HomeNavigator"
            tabBarOptions={{
                inactiveBackgroundColor: 'white',
                activeBackgroundColor: '#449ef2',
                activeTintColor: '#000000',
                inactiveTintColor: '#000000',
                keyboardHidesTabBar: true,
                tabStyle: {
                    marginVertical: 5,
                    marginHorizontal: 15,
                    borderRadius: 50,
                }
            }}>
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarLabel: '',
                    tabBarColor: 'white',
                    tabBarIcon: ({ color }) =>(
                        <View style={{marginTop: 10}}>
                            <IconOctions name="home" color={color} size={25}/>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="UserNavigator"
                component={UserNagigator}
                options={{
                    tabBarLabel: '',
                    tabBarColor: 'white',
                    tabBarIcon: ({ color }) =>(
                        <View style={{marginTop: 10}}>
                            <IconOctions name="person" color={color} size={25}/>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const HomeNavigator = () =>{
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Dashboard}
                options={{
                    title: 'Dashboard',
                    headerStyle: {
                        backgroundColor: '#0077e6',
                    },
                    headerTintColor: '#fff',
                    headerLeft: null,
                }}
            />
        </Stack.Navigator>
    );
}

const UserNagigator = () =>{
    return (
        <Stack.Navigator initialRouteName="User">
            <Stack.Screen
                name="User"
                component={User}
                options={{
                    title: 'Data User',
                    headerStyle: {
                        backgroundColor: '#0077e6',
                    },
                    headerTintColor: '#fff',
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name="DetailUser"
                component={DetailUser}
                options={{
                    title: 'Detail User',
                    headerStyle: {
                        backgroundColor: '#0077e6',
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    );
}

export default AppNavigator;
