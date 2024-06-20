import { apiSlice } from "../../services/api";

export const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadAvatar: builder.mutation({
      query: (formData: any) => ({
        url: "/upload/avatar",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadAvatarMutation } = uploadApiSlice;
