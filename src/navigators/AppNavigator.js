import React from "react";
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import IconOctions from 'react-native-vector-icons/Octicons'

// Screens
import SplashScreen from "../screens/SplashScreen";
import Dashboard from "../screens/Dashboard";
import User from "../screens/User";


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
                component={Dashboard}
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
                name="User"
                component={User}
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

export default AppNavigator;
