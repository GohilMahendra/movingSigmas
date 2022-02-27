export type SearchPropTypes = {
  searchTerm: string;
  searchResults: string[];
  error: null | string;
};

const intialState: SearchPropTypes = {
  searchTerm: "",
  searchResults: [],
  error: null,
};

const SearchReducer = (state: SearchPropTypes = intialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default SearchReducer;
