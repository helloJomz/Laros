import { createSlice } from "@reduxjs/toolkit";
import { UserObject } from "@/types/Profile";
import { userApiSlice } from "./userApiSlice";
import { profileApiSlice } from "../profile/profileApiSlice";

interface initialStateProps {
  UserObject: UserObject | undefined;
  isLoading: boolean;
  isError: boolean;
}

const initialState: initialStateProps = {
  UserObject: undefined,
  isLoading: true,
  isError: false,
};

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApiSlice.endpoints.getUserByDisplayName.matchPending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        userApiSlice.endpoints.getUserByDisplayName.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.UserObject = action.payload;
        }
      )
      .addMatcher(
        userApiSlice.endpoints.getUserByDisplayName.matchRejected,
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      )
      .addMatcher(
        profileApiSlice.endpoints.unfollowUser.matchFulfilled,
        (state) => {
          if (state.UserObject) {
            state.UserObject.following = (state.UserObject.following || 0) - 1;
          }
        }
      );
  },
});

export const isLoading = (state: any) => state.users.isLoading;
export const isError = (state: any) => state.users.isError;
export const user = (state: any) => state.users.UserObject;

export default userSlice.reducer;
