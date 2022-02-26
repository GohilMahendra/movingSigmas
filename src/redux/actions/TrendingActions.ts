import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action, AnyAction, Dispatch } from "redux";
import { GiphyGif } from "../../Types/Giphy.D";
import * as API from "../../services/GiphyApiServies";
import {
  TrendingactionType,
  GET_TRENDING_VIDEOS_FAILED,
  GET_TRENDING_VIDEOS_REQUEST,
  GET_TRENDING_VIDEOS_SUCCESS,
} from "../Types/TrendingTypes";
import { AppDispatch, RootState } from "../store/store";
import { intialTrendingStateTypes } from "../reducers/TrendingReducer";

const MAX_FETCH_LIMIT: number = 2;

export const getTrendingGifs = ()=> {
  return async (dispatch: Dispatch<TrendingactionType>) => {
    try {
      dispatch({ type: GET_TRENDING_VIDEOS_REQUEST });
      const data = await API.geTranding(1, MAX_FETCH_LIMIT);

      const temp: GiphyGif[] = [];

      data.data.data.map((item: any) => {
        temp.push({
          id: item.id,
          height: Number(item.images.original.height),
          width: Number(item.images.original.width),
          url: item.images.original.url,
        });
      });

      console.log(temp, "called");
      dispatch({
        type: GET_TRENDING_VIDEOS_SUCCESS,
        payload: {
          data: temp,
          offset: 2,
          totalPages: 15,
        },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_TRENDING_VIDEOS_FAILED,
        payload: { error: "error" },
      });
    }
  };
};

export const getMoreTrendingGifs = () => {};
