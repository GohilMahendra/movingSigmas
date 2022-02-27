import * as React from 'react';

import { View, Dimensions, Image, Text, ActivityIndicator } from 'react-native';
import { GiphyGif } from '../Types/Giphy';



const { height, width } = Dimensions.get('window')

export type PropTypes = {
    data: GiphyGif
}
const ImageContaimer = (Props: PropTypes) => {

    const { data } = Props
    return (
        <View
        style={{
            justifyContent:"center",
            alignItems:"center",
            flex:1,
            backgroundColor:'black'
        }}
        >
        <Image
            source={{
                uri: data.url,

            }}

           

            style={{
                //   flex: 1,
                height: data.height,
                width: data.width,
                alignSelf: "center",



            }}

            resizeMode='contain'
        >
        </Image>
        </View>

    )
}

export default ImageContaimer