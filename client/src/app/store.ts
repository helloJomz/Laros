import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import profileReducer from "./features/profile/profileSlice";
import userReducer from "./features/users/userSlice";
import modalReducer from "./features/modal/modalSlice";
import postReducer from "./features/post/postSlice";
import postUIReducer from "./features/post/uiSlice";
import viewPostReducer from "./features/modal/viewpostSlice";
import navReducer from "./features/nav/navSlice";
import searchReducer from "./features/search/searchSlice";
import gameReducer from "./features/game/gameSlice";
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

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedAuthReducer,
    profile: profileReducer,
    users: userReducer,
    modal: modalReducer,
    viewpostmodal: viewPostReducer,
    post: postReducer,
    postUI: postUIReducer,
    nav: navReducer,
    search: searchReducer,
    game: gameReducer,
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
    }).concat(apiSlice.middleware),

  // concat here the other middleware APIs
});

// TODO: need to remove this and just get the user's info with the cookie.
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
