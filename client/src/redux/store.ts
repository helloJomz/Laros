import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { searchAPI } from "./features/search/searchAPI";

const store = configureStore({
  reducer: {
    [searchAPI.reducerPath]: searchAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchAPI.middleware),
  // concat here the other middleware APIs
});

setupListeners(store.dispatch);

export default store;
