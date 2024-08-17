import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchAPI } from "../search/searchAPI";
import { RootState } from "@/app/store";

interface SearchHistory {
  _id: string;
  userid: string;
  anon: {
    query?: string;
  };
  user: {
    displayname: string;
    img_url: string;
  };
  game: {
    guid: string;
    gamename: string;
    icon_url: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface SearchResult {
  game: {
    guid: string;
    name: string;
    image: {
      image_tags: string;
      icon_url: string;
      medium_url: string;
      original_url: string;
      screen_large_url: string;
      screen_url: string;
      small_url: string;
      super_url: string;
      thumb_url: string;
      tiny_url: string;
    };
  }[];
  user: {
    _id: string;
    displayname: string;
    imgURL: string;
  }[];
}

interface initialState {
  isSearchResultLoading: boolean;
  searchHistories: SearchHistory[];
  searchResults: SearchResult;
}

const initialState: initialState = {
  isSearchResultLoading: true,
  searchHistories: [],
  searchResults: { game: [], user: [] },
};

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    addHistory: (state, action) => {
      state.searchHistories.unshift(action.payload);
    },
    deleteHistory: (state, action: PayloadAction<{ historyId: string }>) => {
      const { historyId } = action.payload;

      state.searchHistories = state.searchHistories.filter(
        (h) => h._id.toString() !== historyId
      );
    },
    deleteAllHistory: (state) => {
      state.searchHistories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        searchAPI.endpoints.getAllRecentHistory.matchFulfilled,
        (state, action) => {
          state.searchHistories = action.payload;
        }
      )
      .addMatcher(searchAPI.endpoints.searchQuery.matchPending, (state) => {
        state.isSearchResultLoading = true;
      })
      .addMatcher(
        searchAPI.endpoints.searchQuery.matchFulfilled,
        (state, action) => {
          state.isSearchResultLoading = false;
          state.searchResults = action.payload;
        }
      );
  },
});

export const { addHistory, deleteHistory, deleteAllHistory } =
  searchSlice.actions;

export const selectIsSearchResultLoading = (state: RootState) =>
  state.search.isSearchResultLoading;

export const selectSearchHistories = (state: RootState) =>
  state.search.searchHistories;
export const selectSearchResults = (state: RootState) =>
  state.search.searchResults;

export default searchSlice.reducer;
