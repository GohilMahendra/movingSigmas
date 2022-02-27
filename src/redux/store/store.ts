import TrendingReducer from "../reducers/TrendingReducer";

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkAction, ThunkMiddleware } from "redux-thunk";
import SearchReducer from "../reducers/SearchReducer";
import SearchResultsReducer from "../reducers/SearchResultsReducer";

const RootReducer = combineReducers({
  Trending: TrendingReducer,
  Search: SearchReducer,
  SearchResults: SearchResultsReducer,
});

const middleware = applyMiddleware(thunk as ThunkMiddleware);

const store = createStore(RootReducer, middleware);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
