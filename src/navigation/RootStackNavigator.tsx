
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../screens/Home';
import Search from '../screens/Search';




export type RootStackProps = {
    Home: undefined,
    Search:undefined,
}

const RootStackNavigator = () => {

    const Stack = createStackNavigator()
    return (

        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
            >
                <Stack.Screen
                    name='Home'
                    component={Home}
                />
                <Stack.Screen
                    name='Search'
                    component={Search}
                />



            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default RootStackNavigator
