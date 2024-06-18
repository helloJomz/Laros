import { BASE_API_URL } from "@/app/constants";
import { GiphyResultObject } from "@/types/giphy";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const giphyApiSlice = createApi({
  reducerPath: "giphy",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_URL}/giphy`,
  }),
  endpoints: (builder) => ({
    randomGif: builder.query<GiphyResultObject, void>({
      query: () => "/random_bg_gif",
    }),
  }),
});

export const { useRandomGifQuery } = giphyApiSlice;
