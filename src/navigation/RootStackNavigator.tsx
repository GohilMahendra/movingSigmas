
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../screens/Home';
import Search from '../screens/Search';
import SearchResults from '../screens/SearchResults';




export type RootStackProps = {
    Home: undefined,
    Search: undefined,
    SearchResults: {
        search: string
    }
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
                    options={{
                        title:"Trending"
                    }}
                    component={Home}
                />
                <Stack.Screen
                    name='Search'
                    options={{

                        headerTransparent: true,
                        title:""
                    }}
                    component={Search}
                />
                <Stack.Screen
                    name='SearchResults'
                    options={{
                        title: ""
                    }}
                    component={SearchResults}
                />



            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default RootStackNavigator
