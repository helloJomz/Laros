import { apiSlice } from "../../services/api";

const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addHeart: builder.mutation({
      query: ({
        yourUID,
        otherUserUID,
      }: {
        yourUID: string;
        otherUserUID: string;
      }) => ({
        url: "/profile/addHeart",
        method: "POST",
        body: { yourUID, otherUserUID },
      }),
    }),

    minusHeart: builder.mutation({
      query: ({
        yourUID,
        otherUserUID,
      }: {
        yourUID: string;
        otherUserUID: string;
      }) => ({
        url: "/profile/minusHeart",
        method: "POST",
        body: { yourUID, otherUserUID },
      }),
    }),

    getAllHeartList: builder.query({
      query: (uid: string) => `/profile/heart?uid=${uid}`,
    }),

    addFollow: builder.mutation({
      query: ({
        yourUID,
        otherUserUID,
      }: {
        yourUID: string;
        otherUserUID: string;
      }) => ({
        url: "/profile/addFollow",
        method: "POST",
        body: { yourUID, otherUserUID },
      }),
    }),

    minusFollow: builder.mutation({
      query: ({
        yourUID,
        otherUserUID,
      }: {
        yourUID: string;
        otherUserUID: string;
      }) => ({
        url: "/profile/minusFollow",
        method: "POST",
        body: { yourUID, otherUserUID },
      }),
    }),

    getAllFollowerList: builder.query({
      query: (uid: string) => `/profile/follow?uid=${uid}`,
    }),

    checkProfileRelationshipStatus: builder.query({
      query: ({
        yourUID,
        otherUserUID,
      }: {
        yourUID: string;
        otherUserUID: string;
      }) => `/profile/${yourUID}/${otherUserUID}/relationship`,
    }),

    addBio: builder.mutation({
      query: ({ yourUID, bio }: { yourUID: string; bio: string }) => ({
        url: "/profile/addbio",
        method: "POST",
        body: { yourUID, bio },
      }),
    }),

    addGenre: builder.mutation({
      query: ({ yourUID, genre }: { yourUID: string; genre: string[] }) => ({
        url: "/profile/addgenre",
        method: "POST",
        body: { yourUID, genre },
      }),
    }),

    getUserFollowing: builder.query({
      query: (uid: string) => `profile/getfollowing?uid=${uid}`,
    }),

    unfollowUser: builder.mutation({
      query: ({
        yourUID,
        otherUserUID,
      }: {
        yourUID: string;
        otherUserUID: string;
      }) => ({
        url: "/profile/unfollow",
        method: "POST",
        body: { yourUID, otherUserUID },
      }),
    }),
  }),
});

export const {
  useAddHeartMutation,
  useMinusHeartMutation,
  useGetAllHeartListQuery,
  useAddFollowMutation,
  useMinusFollowMutation,
  useGetAllFollowerListQuery,
  useCheckProfileRelationshipStatusQuery,
  useAddBioMutation,
  useAddGenreMutation,
  useGetUserFollowingQuery,
  useUnfollowUserMutation,
} = profileApiSlice;
