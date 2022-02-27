import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useState } from "react"
import { useEffect } from "react"
import { View, Dimensions, Text, RefreshControl, ActivityIndicator, StyleSheet } from "react-native"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import ImageContaimer from "../components/ImageContainer"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { RootStackProps } from "../navigation/RootStackNavigator"
import { getMoreSearchGIFResults, getSearchGIFResults } from "../redux/actions/SearchResultsActions"
import { GiphyGif } from "../Types/Giphy"

const SearchResults = () => {




    const data = useAppSelector(state => state.SearchResults.searchData)
    const loading = useAppSelector(state => state.SearchResults.loading)
    const moreloading = useAppSelector(state => state.SearchResults.moreloading)

    const getorination = (): string => {

        return Dimensions.get('screen').height >= Dimensions.get('screen').width ? "POTRAIT" : "LANDSCAPE"
    }


    const [orintation, setoriantation] = useState<string>(getorination())

    console.log(orintation)

    const dispatch = useAppDispatch()
    const route = useRoute<RouteProp<RootStackProps, 'SearchResults'>>()
    const navigation = useNavigation<StackNavigationProp<RootStackProps, 'SearchResults'>>()

    console.log(data.length, "lenght data")

    const [temp, settemp] = useState<boolean>(false)
    const getSearchGifs = async () => {
        dispatch(getSearchGIFResults(route.params.search))
    }
    const getMoreSearchGifs = async () => {

        if (temp)
            return

        settemp(true)
        dispatch(getMoreSearchGIFResults(route.params.search))
    }



    useEffect(() => {
        const dimentionListner = Dimensions.addEventListener('change', () => {

            let ortn = getorination()
            setoriantation(ortn)
        })
        return Dimensions.removeEventListener('change', () => {
            let ortn = getorination()
            setoriantation(ortn)
        })
    }, [Dimensions])
    useEffect(
        () => {

            navigation.setOptions({
                title: route.params.search
            })

            getSearchGifs()
        },
        [route]
    )


    type RenderItemPropTypes = {
        index: number,
        item: GiphyGif
    }



    const renderItem = ({ item, index }: RenderItemPropTypes) => {



        const width = (orintation == "POTRAIT") ? Dimensions.get('window').width : Dimensions.get('window').height


        const height = orintation == "POTRAIT" ? Dimensions.get('window').height : Dimensions.get('window').width

        const imageWidth = (width / 2 < item.width) ? (width / item.width) * item.width : item.width


        return (
            <TouchableOpacity

                style={{
                    justifyContent: 'center',
                    alignItems: "center"
                }}
            >
                <ImageContaimer
                    data={{ ...item, width: imageWidth }}
                />

            </TouchableOpacity>
        )

    }

    return (
        <View
            style={styles.Container}
        >
            <FlatList

                key={orintation}
                numColumns={orintation == "POTRAIT" ? 1 : 2}
                refreshControl={<RefreshControl
                    onRefresh={() => getSearchGifs()}
                    refreshing={loading}
                ></RefreshControl>}
                style={{
                    flex: 1,
                    margin: 5,

                }}
                data={data}


                //    onEndReached={() => getMoreSearchGifs()}
                renderItem={renderItem}
                ListFooterComponent={
                    <ActivityIndicator
                        animating={moreloading}
                        size='large'
                        color={"black"}
                        style={{ alignSelf: "center" }}
                    ></ActivityIndicator>
                }
                keyExtractor={item => item.id}
            ></FlatList>



        </View>
    )

}
export default SearchResults


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})