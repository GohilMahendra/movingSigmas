import axios from "axios";
import { APikey, endPoint } from "../constants/Api";

export const geTranding = async (offset: number, batchsize: number) => {
  const response = await axios.get(endPoint + "/trending", {
    params: {
      api_key: APikey,
      limit: batchsize,
      offset: offset,
    },
  });

  return response;
};

export const SearchSuggestions = async (search: string) => {
  const response = await axios.get(endPoint + "/search/tags", {
    params: {
      api_key: APikey,
      q: search,
      limit: 10,
    },
  });

  return response;
};

export const getSearchResults = async (
  offset: number,
  batchsize: number,
  term: string
) => {
  const response = await axios.get(endPoint + "/search", {
    params: {
      api_key: APikey,
      limit: batchsize,
      offset: offset,
      q: term,
   
    },
  });

  return response;
};
