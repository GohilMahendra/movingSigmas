import * as React from 'react';

import { View, Image, Text } from 'react-native';
import { GiphyGif } from '../Types/Giphy.D';

import {
    useAppDispatch,
    useAppSelector
} from '../hooks/hooks'

export type PropTypes = {
    data: GiphyGif
}
const ImageContaimer = (Props: PropTypes) => {


    const { data } = Props

    return (
        <View
            style={{
                elevation: 10,
                height: data.height,
                width: data.width,
                borderRadius: 15

            }}
        >

            <Image

                source={{
                    uri: data.url,


                }}

                style={{
                    flex: 1,
                    backgroundColor: "skyblue"

                }}
                resizeMode='cover'
            >

            </Image>

        </View>
    )
}

export default ImageContaimer