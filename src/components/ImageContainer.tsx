import * as React from 'react';

import { View, Dimensions, Image, Text, ActivityIndicator } from 'react-native';
import { useStore } from 'react-redux';
import { GiphyGif } from '../Types/Giphy';



const { height, width } = Dimensions.get('window')

export type PropTypes = {
    data: GiphyGif
}
const ImageContaimer = (Props: PropTypes) => {

    const { data } = Props

    const [load, setload] = React.useState(false)
    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                // backgroundColor:'black'
            }}
        >
            <Image
                source={{
                    uri: data.url,

                }}

                onLoadStart={() => setload(true)}
                onLoadEnd={() => setload(false)}

                style={{
                    //   flex: 1,
                    height: data.height,
                    width: data.width,
                    alignSelf: "center",
                }}
                resizeMode='contain'
            >
            </Image>

            <ActivityIndicator

                animating={load}
                size="large"
                color={"black"}
                style={{
                    position: "absolute",
                    alignSelf: "center",
                    top: "40%"
                }}

            >

            </ActivityIndicator>
        </View>

    )
}

export default ImageContaimer