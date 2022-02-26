

import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import ImageContaimer from '../components/ImageContainer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../navigation/RootStackNavigator';
import { GiphyGif } from '../Types/Giphy.D';
import { getTrendingGifs } from '../redux/actions/TrendingActions';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
const Home = () => {



    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.Trending.data)
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>()


    useEffect
        (
            () => {
                dispatch(getTrendingGifs())

            },
            []
        )


    type renderProps = {
        item: GiphyGif, index: number
    }

    const renderItem = ({ item, index }: renderProps) => {
        return (
            <TouchableOpacity
                style={{

                    elevation: 10,
                    margin: 5
                }}
            >
                <ImageContaimer
                    data={item}
                />

            </TouchableOpacity>
        )
    }
    return (
        <View>


            <TouchableOpacity
                onPress={() => navigation.navigate("Search")}
                style={{
                    height: 50,
                    borderRadius: 15,
                    margin: 10,
                    elevation: 2,
                    justifyContent: "center",

                    paddingLeft: 10
                }}
            >
                <Text
                    style={{
                        color: "grey"
                    }}
                >Search here ....</Text>
            </TouchableOpacity>
            <FlatList
                data={data}

                style={{
                    margin: 5,

                }}
                numColumns={2}
                renderItem={renderItem}


                keyExtractor={item => item.id}


            ></FlatList>



        </View>
    )
}
export default Home