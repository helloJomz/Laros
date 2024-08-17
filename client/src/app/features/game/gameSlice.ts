import { createSlice } from "@reduxjs/toolkit";
import { gameApiSlice } from "./gameApiSlice";
import { RootState } from "@/app/store";

interface initialState {
  isGameLoading: boolean;
  isGameError: boolean;
  gameObject: any;
}

const initialState: initialState = {
  isGameLoading: true,
  isGameError: false,
  gameObject: {},
};

export const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        gameApiSlice.endpoints.getGameByGuid.matchPending,
        (state) => {
          state.isGameLoading = true;
        }
      )
      .addMatcher(
        gameApiSlice.endpoints.getGameByGuid.matchFulfilled,
        (state, action) => {
          state.isGameLoading = false;
          state.gameObject = action.payload;
        }
      )
      .addMatcher(
        gameApiSlice.endpoints.getGameByGuid.matchFulfilled,
        (state) => {
          state.isGameLoading = false;
          state.isGameError = false;
        }
      );
  },
});

export const selectIsGameLoading = (state: RootState) =>
  state.game.isGameLoading;
export const selectIsGameError = (state: RootState) => state.game.isGameError;

export const selectGameObject = (state: RootState) => state.game.gameObject;

export default gameSlice.reducer;
