

import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import ImageContaimer from '../components/ImageContainer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../navigation/RootStackNavigator';
import { GiphyGif } from '../Types/Giphy.D';
import { getMoreTrendingGifs, getTrendingGifs } from '../redux/actions/TrendingActions';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useSafeArea } from 'react-native-safe-area-context';
const Home = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.Trending.data)


    const loading = useAppSelector(state => state.Trending.isloading)
    const moreloading = useAppSelector(state => state.Trending.ismoreloading)

    console.log(data.length,"data")
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
        <View
        style={{
            backgroundColor:'#fff',
            flex:1
        }}
        >

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
                refreshControl={<RefreshControl
                    onRefresh={() => dispatch(getTrendingGifs())}
                    refreshing={loading}
                ></RefreshControl>}

                data={data}
                style={{
                    margin: 5

                }}

                maxToRenderPerBatch={5}

                ListFooterComponent={
                    <ActivityIndicator
                        animating={moreloading}
                        size={'large'}
                        color={'black'}
                        style={{
                            justifyContent: "center",
                            alignItems: 'center',
                            alignSelf: "center"
                        }}
                    ></ActivityIndicator>
                }

                onEndReached={() => dispatch(getMoreTrendingGifs())}
                renderItem={renderItem}
                keyExtractor={item => item.id}


            ></FlatList>





        </View>
    )
}
export default Home