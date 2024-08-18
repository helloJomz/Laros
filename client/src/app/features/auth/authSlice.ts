import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IState, CredentialsPayload } from "./authTypes";

export const initialState: IState = {
  user: {
    displayname: null,
    userid: null,
    imgURL: null,
  },
};

const authSlice: any = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialsPayload>) => {
      const { user } = action.payload;
      state.user = user;
    },

    setUpdateImgURL: (state, action: PayloadAction<{ imgURL: string }>) => {
      const { imgURL } = action.payload;
      state.user.imgURL = imgURL;
    },

    destroyUserSession: (state) => {
      state.user.displayname = null;
      state.user.imgURL = null;
      state.user.userid = null;
    },
  },
});

export const { setCredentials, setUpdateImgURL, destroyUserSession } =
  authSlice.actions;

export const selectCurrentUser = (state: any) => state.auth.user;

export default authSlice.reducer;
