import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HEADER_JSON } from "@/app/constants";

export const searchAPI = createApi({
  reducerPath: "searchAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/search",
  }),
  endpoints: (builder) => ({
    // FOR GETTING GAME BASED ON THE QUERY
    getGamesByName: builder.query({
      query: (gameName) => `/games/${gameName}`,
    }),

    // FOR ADDING THE CLICKED GAME TO THE RECENT HISTORY
    addGameToRecentHistory: builder.mutation({
      query: (newGameHistory) => ({
        url: "/recent_history",
        method: "POST",
        headers: HEADER_JSON,
        body: newGameHistory,
      }),
    }),

    // FOR GETTING ALL RECENT HISTORY
    getAllRecentHistory: builder.query({
      query: (userid) => `/recent_history/${userid}`,
    }),

    // FOR DELETING ONE RECENT HISTORY
    deleteOneRecentHistory: builder.mutation({
      query: (historyId) => ({
        url: "/recent_history/one_target",
        method: "DELETE",
        headers: HEADER_JSON,
        body: historyId,
      }),
    }),

    // FOR DELETING ALL THE RECENT HISTORY
    deleteAllRecentHistory: builder.mutation({
      query: (userid) => ({
        url: "/recent_history/all_target",
        method: "DELETE",
        headers: HEADER_JSON,
        body: userid,
      }),
    }),
  }),
});

export const {
  useGetGamesByNameQuery,
  useAddGameToRecentHistoryMutation,
  useGetAllRecentHistoryQuery,
  useDeleteAllRecentHistoryMutation,
  useDeleteOneRecentHistoryMutation,
} = searchAPI;
