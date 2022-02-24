

import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import ImageContaimer from '../components/ImageContainer';
import * as API from "../services/GiphyApiServies";
import tempdata from '../data/dummydata.json'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../navigation/RootStackNavigator';
import { GiphyGif } from '../Types/Giphy.D';
const Home = () => {

    const [data, setdata] = useState<GiphyGif[]>()

    const navigation=useNavigation<StackNavigationProp<RootStackProps>>()

    const getTrandingData = async () => {
        const data = await API.geTranding(1, 3)
      
        const temp:GiphyGif[]=[]

        
        data.data.data.map(
            (item:any)=>
            {
                temp.push(
                    {
                        id:item.id,
                        height:Number(item.images.original.height),
                        width:Number(item.images.original.width),
                        url:item.images.original.url
                    }
                )

            }
        )


        setdata(temp)

    }


    useEffect
        (
            () => {
                 getTrandingData()


            },
            []
        )


     type renderProps={
        item:GiphyGif, index:number
    }

    const renderItem = ({item,index}:renderProps) => {
        return (
            <TouchableOpacity
            style={{
               
                elevation:10,
                margin:5
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
                onPress={()=>navigation.navigate("Search")}
                style={{
                    height:50,
                    borderRadius:15,
                    margin:10,
                    elevation:2,
                    justifyContent:"center",
                  
                    paddingLeft:10
                }}
            >
                <Text
                style={{
                    color:"grey"
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