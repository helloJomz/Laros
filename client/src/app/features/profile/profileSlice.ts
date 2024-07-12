import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileApiSlice } from "./profileApiSlice";

interface initialStateProps {
  genre: [string];
  heart: [string];
  relationshipStatus: null;
  isLoading: boolean;
  error: boolean;
}

const initialState: initialStateProps = {
  genre: [""],
  heart: [""],
  relationshipStatus: null,
  isLoading: false,
  error: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<{ genre: [string] }>) => {
      const { genre } = action.payload;
      state.genre = genre;
    },
  },
  extraReducers: (builder) => {
    builder
      //Relationship Status
      .addMatcher(
        profileApiSlice.endpoints.checkProfileRelationshipStatus.matchPending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        profileApiSlice.endpoints.checkProfileRelationshipStatus.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.relationshipStatus = action.payload;
        }
      )
      .addMatcher(
        profileApiSlice.endpoints.checkProfileRelationshipStatus.matchRejected,
        (state) => {
          state.isLoading = false;
          state.error = true;
        }
      );
  },
});

export const { setGenre } = profileSlice.actions;

export const useModal = (state: any) => state.profile.modal;
export const useGenre = (state: any) => state.profile.genre;

// -------------- API DEPENDENT ----------------------------

// - Relationship
export const useRelationshipStatus = (state: any) =>
  state.profile.relationshipStatus;

export default profileSlice.reducer;
