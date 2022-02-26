import { GiphyGif } from "../../Types/Giphy.D";

export const GET_TRENDING_VIDEOS_REQUEST = "GET_TRENDING_VIDEOS_REQUEST";
export const GET_TRENDING_VIDEOS_SUCCESS = "GET_TRENDING_VIDEOS_SUCCESS";
export const GET_TRENDING_VIDEOS_FAILED = "GET_TRENDING_VIDEOS_FAILED";

export const GET_MORE_TRENDING_VIDEOS_REQUEST =
  "GET_MORE_TRENDING_VIDEOS_REQUEST";
export const GET_MORE_TRENDING_VIDEOS_SUCCESS =
  "GET_MORE_TRENDING_VIDEOS_SUCCESS";
export const GET_MORE_TRENDING_VIDEOS_FAILED =
  "GET_MORE_TRENDING_VIDEOS_FAILED";


type GiphySuccessPayload= {
  data: GiphyGif[];
  totalPages: number;
  offset: number;
};
interface TrendingVideoSuccessAction {
  readonly type: string;
  payload:GiphySuccessPayload
};

interface TrendgVideoFailedAction  {
  readonly type: string;
  payload: {
    error: string;
  };
};
interface TrendgVideoLoadingAction  {
  readonlytype: string;
  
};

export type TrendingactionType =
  | TrendgVideoLoadingAction
  | TrendgVideoFailedAction
  | TrendingVideoSuccessAction;
