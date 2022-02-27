import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
    View,
    Text
} from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getSearchSuggetions } from '../redux/actions/SearchActions';
import { term } from '../Types/Search';


const Search = () => {



    const [search, setsearch] = useState<string>("")

    const dispatch = useAppDispatch()

    const data = useAppSelector(state => state.Search.searchResults)
    console.log(data)

    useEffect(
        () => {
            if (search != "")
                dispatch(getSearchSuggetions(search))

        },
        [search]
    )


    type renderItemPropType = {

        item: string,
        index: number

    }


    const renderItem = ({ item, index }: renderItemPropType) => {

        return (
            <TouchableOpacity
            style={{
                elevation:2,
                backgroundColor:"#fff",
                height:50,
                margin:5,
                borderRadius:15,
                justifyContent:"center",
                padding:10
            
            }}
            >
                <Text
                style={{
                    fontSize:15
                }}
                >{item}</Text>
            </TouchableOpacity>
        )

    }

    return (
        <View>
            <TextInput

                value={search}
                style={{
                    height: 50,
                    borderRadius: 15,
                    elevation: 2,
                    padding: 10,
                    backgroundColor: '#fff',

                }}
                onChangeText={val => setsearch(val)}
            >

            </TextInput>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item}


            ></FlatList>
        </View>
    )

}
export default Search