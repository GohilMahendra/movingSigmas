import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { getSearchResults } from "../../services/GiphyApiServies";
import { GiphyGif } from "../../Types/Giphy";
import { RootState } from "../store/store";
import {
    GET_MORE_SEARCH_FAILED,
    GET_MORE_SEARCH_REQUEST,
    GET_MORE_SEARCH_SUCCESS,
  GET_SEARCH_FAILED,
  GET_SEARCH_REQUEST,
  GET_SEARCH_SUCCESS,
} from "../Types/SearchResultTypes";

const MAX_FETCH_LIMIT: number = 5;

export const getSearchGIFResults = (
  term: string
): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_SEARCH_REQUEST });
      const response = await getSearchResults(0, MAX_FETCH_LIMIT, term);

      const temp: GiphyGif[] = [];

      response.data.data.map((item: any) => {
        temp.push({
          id: item.id,
          height: Number(item.images.original.height),
          width: Number(item.images.original.width),
          url: item.images.original.url,
        });

        dispatch({
          type: GET_SEARCH_SUCCESS,
          payload: {
            data: temp,
            offset: temp.length,
            totalCount: response.data.pagination.total_count,
          },
        });
      });
    } catch (err) {
      dispatch({
        type: GET_SEARCH_FAILED,
        payload: { error: JSON.stringify(err) },
      });
    }
  };
};

export const getMoreSearchGIFResults = (
  term: string

  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
  return async (dispatch, getState: () => RootState) => {
    const offset = getState().SearchResults.offset;
    const total = getState().SearchResults.totalCount;

    if (offset > total) {
      console.log("ending of the database");
      return;
    }

    console.log(offset,total)
    try {
      dispatch({ type: GET_MORE_SEARCH_REQUEST });
      const response = await getSearchResults(offset, MAX_FETCH_LIMIT, term);

      const temp: GiphyGif[] = [];

      response.data.data.map((item: any) => {
        temp.push({
          id: item.id,
          height: Number(item.images.fixed_width_small.height),
          width: Number(item.images.fixed_width_small.width),
          url: item.images.original.url,
        });

        dispatch({
          type: GET_MORE_SEARCH_SUCCESS,
          payload: {
            data: temp,
            offset: response.data.pagination.count + response.data.pagination.offset,
            totalCount: response.data.pagination.total_count,
          },
        });
      });
    } catch (err) {

        console.log(err)
      dispatch({
        type: GET_MORE_SEARCH_FAILED,
        payload: { error: JSON.stringify(err) },
      });
    }
  };
};
