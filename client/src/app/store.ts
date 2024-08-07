import { configureStore } from "@reduxjs/toolkit";
import { searchAPI } from "./features/search/searchAPI";
import { giphyApiSlice } from "./features/giphy/giphySlice";
import authReducer from "./features/auth/authSlice";
import profileReducer from "./features/profile/profileSlice";
import userReducer from "./features/users/userSlice";
import modalReducer from "./features/modal/modalSlice";
import postReducer from "./features/post/postSlice";
import postUIReducer from "./features/post/uiSlice";
import viewPostReducer from "./features/modal/viewpostSlice";
import { apiSlice } from "./services/api";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { features } from "process";

const persistConfig = {
  key: "root",
  storage,
};

const defaultMiddlewareConfig = {
  serializableCheck: {
    ignoredPaths: ["filters.startDate", "filters.endDate"],
  },
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [searchAPI.reducerPath]: searchAPI.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [giphyApiSlice.reducerPath]: giphyApiSlice.reducer,
    auth: persistedAuthReducer,
    profile: profileReducer,
    users: userReducer,
    modal: modalReducer,
    viewpostmodal: viewPostReducer,
    post: postReducer,
    postUI: postUIReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "post/setPreviewPost",
        ],
        ignoredPaths: ["post.postPreview"],
      },
    })
      .concat(searchAPI.middleware)
      .concat(apiSlice.middleware)
      .concat(giphyApiSlice.middleware),
  // concat here the other middleware APIs
});

// TODO: need to remove this and just get the user's info with the cookie.
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
