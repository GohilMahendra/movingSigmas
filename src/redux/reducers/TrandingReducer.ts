

import * as React from 'react';

import {
    GiphyGif
} from '../../Types/Giphy'



type intialTrendingStateTypes={
    data:GiphyGif[],
    isloading:boolean,
    ismoreloading:boolean,
    totalitems:number,
    loadingError:string|null,
    moreloadingError:string|null,

}


const initialState:intialTrendingStateTypes={
    data:[],
    isloading:false,
    ismoreloading:false,
    loadingError:null,
    moreloadingError:null,
    totalitems:0
}


type Action={
    type:string,
    payload?:any
}

const TrendingReducer=(state:intialTrendingStateTypes=initialState,action:Action)=>
{

    switch(action.type)
    {
        default:
            return state
    }
   

}

export default TrendingReducer