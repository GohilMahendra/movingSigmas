

import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, RefreshControl, ActivityIndicator, Dimensions } from 'react-native';
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

    const getorination = (): string => {

        return Dimensions.get('screen').height >= Dimensions.get('screen').width ? "POTRAIT" : "LANDSCAPE"
    }


    const [orintation, setoriantation] = useState<string>(getorination())

    const loading = useAppSelector(state => state.Trending.isloading)
    const moreloading = useAppSelector(state => state.Trending.ismoreloading)

    console.log(data.length, "data")
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>()


    useEffect(() => {
        const dimentionListner = Dimensions.addEventListener('change', () => {

            let ortn = getorination()
            setoriantation(ortn)
        })
        return () => {
            Dimensions.removeEventListener('change', () => {
                let ortn = getorination()
                setoriantation(ortn)
            })
        }
    }, [Dimensions])

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
        const width = (orintation == "POTRAIT") ? Dimensions.get('window').width : Dimensions.get('window').height


        const height = orintation == "POTRAIT" ? Dimensions.get('window').height : Dimensions.get('window').width

        const imageWidth = (width / 2 < item.width) ? (width / item.width) * item.width : item.width

        return (
            <TouchableOpacity
                style={{

                    elevation: 10,
                    height:item.height
                }}
            >
                <ImageContaimer
                    data={{...item,width:imageWidth}}
                />

            </TouchableOpacity>
        )
    }
    return (
        <View
            style={{
                backgroundColor: '#fff',
                flex: 1
            }}
        >

            <TouchableOpacity
                onPress={() => navigation.navigate("Search")}
                style={{
                    height: 50,
                    borderRadius: 15,
                    margin: 10,
                    elevation: 2,
                    backgroundColor:"#fff",
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

            key={orintation}
            numColumns={orintation=="POTRAIT"?1:2}
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