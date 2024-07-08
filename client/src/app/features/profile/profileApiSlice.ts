import { apiSlice } from "../../services/api";

const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    incrementAndDecrementHeartCount: builder.mutation({
      query: ({
        yourUID,
        otherUserUID,
      }: {
        yourUID: string;
        otherUserUID: string;
      }) => ({
        url: "/profile/update-heartcount",
        method: "POST",
        body: { yourUID, otherUserUID },
      }),
    }),

    incrementAndDecrementFollowCount: builder.mutation({
      query: ({
        yourUID,
        otherUserUID,
      }: {
        yourUID: string;
        otherUserUID: string;
      }) => ({
        url: "/profile/update-followercount",
        method: "POST",
        body: { yourUID, otherUserUID },
      }),
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
  useIncrementAndDecrementHeartCountMutation,
  useIncrementAndDecrementFollowCountMutation,
  useCheckProfileRelationshipStatusQuery,
  useAddBioMutation,
  useAddGenreMutation,
  useGetUserFollowingQuery,
  useUnfollowUserMutation,
} = profileApiSlice;
