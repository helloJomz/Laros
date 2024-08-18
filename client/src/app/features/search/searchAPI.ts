import { HEADER_JSON } from "@/app/constants";
import { apiSlice } from "@/app/services/api";

export const searchAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // FOR GETTING GAME BASED ON THE QUERY
    searchQuery: builder.query({
      query: (query) => `/search/?query=${query}`,
    }),

    // FOR ADDING THE CLICKED GAME TO THE RECENT HISTORY
    addGameToRecentHistory: builder.mutation({
      query: (newGameHistory) => ({
        url: "/search/recent_history",
        method: "POST",
        headers: HEADER_JSON,
        body: newGameHistory,
      }),
    }),

    // FOR GETTING ALL RECENT HISTORY
    getAllRecentHistory: builder.query({
      query: (userid) => `/search/recent_history/?userid=${userid}`,
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
        url: "/search/recent_history/one_target",
        method: "DELETE",
        body: { userId, historyId },
      }),
    }),

    // FOR DELETING ALL THE RECENT HISTORY
    deleteAllRecentHistory: builder.mutation({
      query: (userid) => ({
        url: "/search/recent_history/all_target",
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
