import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileApiSlice } from "./profileApiSlice";

interface initialStateProps {
  isLoading: boolean;
  isError: boolean;
  bio: string;
  genre: string[];
  heart: string[];
  isHeart: boolean;
  isFollowing: boolean;
}

const initialState: initialStateProps = {
  isLoading: false,
  isError: false,
  bio: "",
  genre: [],
  heart: [],
  isHeart: false,
  isFollowing: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<{ genre: string[] }>) => {
      const { genre } = action.payload;
      state.genre = genre;
    },

    setBio: (state, action: PayloadAction<{ bio: string }>) => {
      const { bio } = action.payload;
      state.bio = bio;
    },

    setIsHeart: (state, action: PayloadAction<{ heartStatus: boolean }>) => {
      const { heartStatus } = action.payload;
      state.isHeart = heartStatus;
    },

    setIsFollowing: (
      state,
      action: PayloadAction<{ followingStatus: boolean }>
    ) => {
      const { followingStatus } = action.payload;
      state.isFollowing = followingStatus;
    },
  },
  extraReducers: (builder) => {
    builder
      //Relationship Status
      .addMatcher(
        profileApiSlice.endpoints.checkProfileRelationshipStatus.matchFulfilled,
        (state, action) => {
          const { heart, following } = action.payload;
          state.isHeart = heart;
          state.isFollowing = following;
        }
      )

      // Bio
      .addMatcher(
        profileApiSlice.endpoints.addBio.matchFulfilled,
        (state, action) => {
          state.bio = action.payload;
        }
      );
  },
});

export const { setGenre, setBio, setIsHeart, setIsFollowing } =
  profileSlice.actions;

export const selectGenre = (state: any) => state.profile.genre;
export const selectBio = (state: any) => state.profile.bio;

export const selectIsHeart = (state: any) => state.profile.isHeart;
export const selectIsFollowing = (state: any) => state.profile.isFollowing;

export default profileSlice.reducer;
