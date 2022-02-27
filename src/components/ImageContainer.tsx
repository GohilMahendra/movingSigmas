import * as React from 'react';

import { View, Image, Text } from 'react-native';
import { GiphyGif } from '../Types/Giphy';

export type PropTypes = {
    data: GiphyGif
}
const ImageContaimer = (Props: PropTypes) => {

    const { data } = Props
    return (
        <View
            style={{
                elevation: 10,
                borderRadius: 15,
                height: data.height,
                alignSelf:"center",
                width: data.width

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
                    backgroundColor: "skyblue"
                }}
                resizeMode='cover'
            >
            </Image>

        </View>
    )
}

export default ImageContaimer