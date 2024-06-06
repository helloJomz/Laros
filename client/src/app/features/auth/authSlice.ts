import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IState, CredentialsPayload } from "./authTypes";

export const initialState: IState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialsPayload>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },

    destroyUserSession: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, destroyUserSession } = authSlice.actions;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;

export default authSlice.reducer;
