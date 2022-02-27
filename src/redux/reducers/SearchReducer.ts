import { AnyAction } from "redux";
import {
  GET_SEARCH_SUGGETION_REQUEST,
  GET_SEARCH_SUGGETION_SUCCESS,
} from "../Types/SearchTypes";
import { GET_MORE_TRENDING_VIDEOS_FAILED } from "../Types/TrendingTypes";

export type SearchPropTypes = {
  searchResults: string[];
  error: null | string;
};

const intialState: SearchPropTypes = {
  searchResults: [],
  error: null,
};

const SearchReducer = (
  state: SearchPropTypes = intialState,
  action: AnyAction
): SearchPropTypes => {
  switch (action.type) {
    case GET_SEARCH_SUGGETION_REQUEST:
      return {
        ...state,
        searchResults: [],
        error: null,
      };
    case GET_SEARCH_SUGGETION_SUCCESS:
      return {
        ...state,
        searchResults: action.payload.data,
      };
    case GET_MORE_TRENDING_VIDEOS_FAILED:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default SearchReducer;
