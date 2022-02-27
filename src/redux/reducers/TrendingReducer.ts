import * as React from "react";
import { Action, AnyAction } from "redux";

import { GiphyGif } from "../../Types/Giphy";
import {
  GET_MORE_TRENDING_VIDEOS_FAILED,
  GET_MORE_TRENDING_VIDEOS_REQUEST,
  GET_MORE_TRENDING_VIDEOS_SUCCESS,
  GET_TRENDING_VIDEOS_FAILED,
  GET_TRENDING_VIDEOS_REQUEST,
  GET_TRENDING_VIDEOS_SUCCESS,
  TrendingactionType,
} from "../Types/TrendingTypes";

export type intialTrendingStateTypes = {
  data: GiphyGif[];
  isloading: boolean;
  ismoreloading: boolean;
  lastOffset: number;
  totalitems: number;
  loadingError: string | null;
  moreloadingError: string | null;
};

const initialState: intialTrendingStateTypes = {
  data: [],
  isloading: false,
  lastOffset: 0,
  ismoreloading: false,
  loadingError: null,
  moreloadingError: null,
  totalitems: 0,
};

const TrendingReducer = (
  state: intialTrendingStateTypes = initialState,
  action: AnyAction
): intialTrendingStateTypes => {
  switch (action.type) {
    case GET_TRENDING_VIDEOS_REQUEST:
      return {
        ...state,
        isloading: true,

        loadingError: null,
      };

    case GET_TRENDING_VIDEOS_SUCCESS:
     
      return {
        ...state,
        isloading: false,
        lastOffset: action.payload.offset,
        totalitems: action.payload.totalPages,
        data: action.payload.data,
      };
    case GET_TRENDING_VIDEOS_FAILED:
      return {
        ...state,
        isloading: false,
      };

    case GET_MORE_TRENDING_VIDEOS_REQUEST:
      return {
        ...state,
        ismoreloading:true,


      }

    case GET_MORE_TRENDING_VIDEOS_SUCCESS:
    //  console.log(action.payload)
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        ismoreloading: false,
        lastOffset: action.payload.offset,
      };
    case GET_MORE_TRENDING_VIDEOS_FAILED:
      return {
        ...state,
        moreloadingError: action.payload.error,
        ismoreloading: false,
      };
    default:
      return state;
  }
};

export default TrendingReducer;
