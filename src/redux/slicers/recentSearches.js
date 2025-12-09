import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searches: [],
};

const recentSearchesSlice = createSlice({
  name: 'recentSearches',
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.searches = [action.payload, ...state.searches].slice(0, 10); // Keep only the last 10 searches
    },
    clearSearches: (state) => {
      state.searches = [];
    },
  },
});

export const { addSearch, clearSearches } = recentSearchesSlice.actions;
export default recentSearchesSlice.reducer;