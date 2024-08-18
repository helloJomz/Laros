import { GiphyResultObject } from "@/types/giphy";
import { apiSlice } from "@/app/services/api";

export const giphyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    randomGif: builder.query<GiphyResultObject, void>({
      query: () => "/giphy/random_bg_gif",
    }),
  }),
});

export const { useRandomGifQuery } = giphyApiSlice;
