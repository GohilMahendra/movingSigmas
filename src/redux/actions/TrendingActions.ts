import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action, AnyAction, Dispatch } from "redux";
import { GiphyGif } from "../../Types/Giphy.D";
import * as API from "../../services/GiphyApiServies";
import {
  TrendingactionType,
  GET_TRENDING_VIDEOS_FAILED,
  GET_TRENDING_VIDEOS_REQUEST,
  GET_TRENDING_VIDEOS_SUCCESS,
  GET_MORE_TRENDING_VIDEOS_REQUEST,
  GET_MORE_TRENDING_VIDEOS_FAILED,
  GET_MORE_TRENDING_VIDEOS_SUCCESS,
} from "../Types/TrendingTypes";
import { AppDispatch, RootState } from "../store/store";
import { intialTrendingStateTypes } from "../reducers/TrendingReducer";

const MAX_FETCH_LIMIT: number = 5;

export const getTrendingGifs = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_TRENDING_VIDEOS_REQUEST });
      const data = await API.geTranding(0, MAX_FETCH_LIMIT);

      const temp: GiphyGif[] = [];

      data.data.data.map((item: any) => {
        temp.push({
          id: item.id,
          height: Number(item.images.original.height),
          width: Number(item.images.original.width),
          url: item.images.original.url,
        });
      });

      dispatch({
        type: GET_TRENDING_VIDEOS_SUCCESS,
        payload: {
          data: temp,
          offset: temp.length,
          totalPages: data.data.pagination.total_count,
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

export const getMoreTrendingGifs = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState: () => RootState) => {
    console.log("called");
    try {
      const total = getState().Trending.totalitems;
      const lastOffeset = getState().Trending.lastOffset;

      console.log(lastOffeset, total);
      if (lastOffeset > total) {
        return;
      }

      dispatch({ type: GET_MORE_TRENDING_VIDEOS_REQUEST });
      const response = await API.geTranding(lastOffeset, MAX_FETCH_LIMIT);

      const temp: GiphyGif[] = [];

      response.data.data.map((item: any) => {
        temp.push({
          id: item.id,
          height: Number(item.images.original.height),
          width: Number(item.images.original.width),
          url: item.images.original.url,
        });
      });

      console.log(temp, "more load");
      dispatch({
        type: GET_MORE_TRENDING_VIDEOS_SUCCESS,
        payload: {
          data: temp,
          offset: temp.length + lastOffeset,
        },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_MORE_TRENDING_VIDEOS_FAILED,
        payload: { error: "error in more loading" },
      });
    }
  };
};
