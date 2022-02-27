import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store/store";

import * as API from "../../services/GiphyApiServies";
import {
  GET_SEARCH_SUGGETION_FAILES,
  GET_SEARCH_SUGGETION_REQUEST,
  GET_SEARCH_SUGGETION_SUCCESS,
} from "../Types/SearchTypes";

export const getSearchSuggetions = (
  search: string
): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_SEARCH_SUGGETION_REQUEST });
      const response = await API.SearchSuggestions(search);

      const terms: string[] = [];

      response.data.data.map(function (child: any) {
        terms.push(child.name);
      });

      dispatch({
        type: GET_SEARCH_SUGGETION_SUCCESS,
        payload: {
          data: terms,
        },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_SEARCH_SUGGETION_FAILES,
        payload: {
          error: "erro in search," + JSON.stringify(err),
        },
      });
    }
  };
};
