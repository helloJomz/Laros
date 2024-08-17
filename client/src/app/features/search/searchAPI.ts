import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HEADER_JSON } from "@/app/constants";

export const searchAPI = createApi({
  reducerPath: "searchAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://laros-backend.onrender.com/api/search",
  }),
  endpoints: (builder) => ({
    // FOR GETTING GAME BASED ON THE QUERY
    searchQuery: builder.query({
      query: (query) => `/?query=${query}`,
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
      query: (userid) => `/recent_history/?userid=${userid}`,
    }),

    // FOR DELETING ONE RECENT HISTORY
    deleteOneRecentHistory: builder.mutation({
      query: ({
        userId,
        historyId,
      }: {
        userId: string;
        historyId: string;
      }) => ({
        url: "/recent_history/one_target",
        method: "DELETE",
        body: { userId, historyId },
      }),
    }),

    // FOR DELETING ALL THE RECENT HISTORY
    deleteAllRecentHistory: builder.mutation({
      query: (userid) => ({
        url: "/recent_history/all_target",
        method: "DELETE",
        body: { userid },
      }),
    }),
  }),
});

export const {
  useSearchQueryQuery,
  useAddGameToRecentHistoryMutation,
  useGetAllRecentHistoryQuery,
  useDeleteAllRecentHistoryMutation,
  useDeleteOneRecentHistoryMutation,
} = searchAPI;
