import { configureStore } from "@reduxjs/toolkit";
import { searchAPI } from "./features/search/searchAPI";
import { giphyApiSlice } from "./features/giphy/giphySlice";
import { userApiSlice } from "./features/users/userApiSlice";
import authReducer from "./features/auth/authSlice";
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
    [searchAPI.reducerPath]: searchAPI.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [giphyApiSlice.reducerPath]: giphyApiSlice.reducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(searchAPI.middleware)
      .concat(apiSlice.middleware)
      .concat(giphyApiSlice.middleware),
  // concat here the other middleware APIs
  devTools: true,
});

// TODO: need to remove this and just get the user's info with the cookie.
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
