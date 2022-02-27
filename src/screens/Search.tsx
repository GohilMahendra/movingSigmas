import { useNavigationState } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
    View,
    Text,
    TextInput
} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { RootStackProps } from '../navigation/RootStackNavigator';
import { getSearchSuggetions } from '../redux/actions/SearchActions';
import { term } from '../Types/Search';

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef } from 'react';
import { MutableRefObject } from 'react';


const Search = () => {


    const [search, setsearch] = useState<string>("")

    const dispatch = useAppDispatch()

    const ref=useRef<TextInput|null>()

    const navigation = useNavigation<StackNavigationProp<RootStackProps, 'Search'>>()
    const data = useAppSelector(state => state.Search.searchResults)


    // useEffect(
    // ()=>
    // {

    //     ref.current.?focus=true
    // },
    // []
    // )


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
                    elevation: 2,
                    backgroundColor: "#fff",
                    height: 50,
                    margin: 5,
                    borderRadius: 15,
                    justifyContent: "center",
                    padding: 10

                }}

                onPress={() => navigation.replace("SearchResults", { search: item })}
            >
                <Text
                    style={{
                        fontSize: 15
                    }}
                >{item}</Text>
            </TouchableOpacity>
        )

    }

    return (
        <SafeAreaView
        style={{
            flex:1
        }}
        >
            <TextInput

              //  ref={ref}
                value={search}
                style={{
                    height: 50,
                    marginLeft:50,
                    borderRadius: 15,
                    elevation: 2,
                    margin:5,
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
        </SafeAreaView>
    )

}
export default Search