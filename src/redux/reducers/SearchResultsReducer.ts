import { State } from "react-native-gesture-handler";
import { AnyAction } from "redux";
import { GiphyGif } from "../../Types/Giphy";
import {
  GET_MORE_SEARCH_FAILED,
  GET_MORE_SEARCH_REQUEST,
  GET_MORE_SEARCH_SUCCESS,
  GET_SEARCH_FAILED,
  GET_SEARCH_REQUEST,
  GET_SEARCH_SUCCESS,
} from "../Types/SearchResultTypes";

type SearchResultPropTypes = {
  searchData: GiphyGif[];
  loading: boolean;
  moreloading: boolean;
  searchError: null | string;
  moreSearchError: null | string;
  offset: number;
  totalCount: number;
};

const initialState: SearchResultPropTypes = {
  loading: false,
  moreSearchError: null,
  moreloading: false,
  offset: 0,
  searchData: [],
  searchError: null,
  totalCount: 0,
};

const SearchResultsReducer = (
  state: SearchResultPropTypes = initialState,
  action: AnyAction
): SearchResultPropTypes => {
  switch (action.type) {
    case GET_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        searchData:[],
        searchError: null,
      };
    case GET_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        totalCount: action.payload.totalCount,
        offset: action.payload.offset,
        searchData: action.payload.data,
      };
    case GET_SEARCH_FAILED:
      return {
        ...state,
        loading: false,
        searchError: action.payload.error,
      };
    case GET_MORE_SEARCH_REQUEST:
      return {
        ...state,
        moreSearchError: null,
        moreloading: true,
      };
    case GET_MORE_SEARCH_SUCCESS:
      return {
        ...state,

        offset: action.payload.offset,
        moreloading: false,
        searchData: [...state.searchData, ...action.payload.data],
      };
    case GET_MORE_SEARCH_FAILED:
      return {
        ...state,
        moreSearchError: action.payload.error,
        moreloading: false,
      };
    default:
      return state;
  }
};

export default SearchResultsReducer;
