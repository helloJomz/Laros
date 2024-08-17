import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

interface initialState {
  isSearchOpen: boolean;
  searchVal: String | null;
}

const initialState: initialState = {
  isSearchOpen: false,
  searchVal: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState: initialState,
  reducers: {
    setSearchVal: (state, action: PayloadAction<{ search: string | null }>) => {
      const { search } = action.payload;
      state.searchVal = search;
    },
    setIsSearchOpen: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      const { isOpen } = action.payload;
      state.isSearchOpen = isOpen;
    },
  },
});

export const { setSearchVal, setIsSearchOpen } = navSlice.actions;

export const selectSearchVal = (state: RootState) => state.nav.searchVal;
export const selectIsSearchOpen = (state: RootState) => state.nav.isSearchOpen;

export default navSlice.reducer;
