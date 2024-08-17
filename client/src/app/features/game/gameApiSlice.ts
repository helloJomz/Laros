import { apiSlice } from "../../services/api";

export const gameApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGameByGuid: builder.query({
      query: (guid: string) => `/game/?guid=${guid}`,
    }),
  }),
});

export const { useGetGameByGuidQuery } = gameApiSlice;
