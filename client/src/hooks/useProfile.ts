import { isError, isLoading, user } from "@/app/features/users/userSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCurrentUser } from "@/app/features/auth/authSlice";
import {
  selectBio,
  selectGenre,
  selectIsFollowing,
  selectIsHeart,
  setBio as setBioSlice,
  setGenre as setGenreSlice,
  setIsFollowing,
  setIsHeart,
} from "@/app/features/profile/profileSlice";
import { useDispatch } from "react-redux";
import { useUserContext } from "@/context/UserContext";
import { useCheckProfileRelationshipStatusQuery } from "@/app/features/profile/profileApiSlice";

type UserProfile = {
  bio: string;
  displayname: string;
  email: string;
  follower: number;
  following: number;
  genre: string[];
  heartcount: number;
  imgURL: string;
  post: number;
  userid: string;
};

export const useProfile = () => {
  const dispatch = useDispatch();

  const { authenticatedUserObject } = useUserContext();
  const { userid: yourUID } = authenticatedUserObject;

  const isProfileLoading: boolean = useSelector(isLoading);
  const isProfileError: boolean = useSelector(isError);
  const userObject: UserProfile = useSelector(user);

  const setBio = (bio: string) => dispatch(setBioSlice({ bio: bio }));
  const useBio = useSelector(selectBio);

  const setGenre = (genre: string[]) =>
    dispatch(setGenreSlice({ genre: [...genre] }));
  const useGenre: string[] = useSelector(selectGenre);

  const profilePageEndpoint = useParams()?.displayname;
  const isAuthProfile =
    useSelector(selectCurrentUser)?.displayname === profilePageEndpoint;

  useCheckProfileRelationshipStatusQuery(
    {
      yourUID: yourUID,
      otherUserUID: userObject?.userid,
    },
    {
      skip: userObject === undefined || isAuthProfile || !yourUID,
    }
  );

  const heartStatus = useSelector(selectIsHeart);
  const setHeartStatus = (status: boolean) =>
    dispatch(setIsHeart({ heartStatus: status }));

  const followingStatus = useSelector(selectIsFollowing);
  const setFollowingStatus = (status: boolean) =>
    dispatch(setIsFollowing({ followingStatus: status }));

  return {
    isProfileLoading,
    isProfileError,
    userObject,
    isAuthProfile,
    setBio,
    useBio,
    setGenre,
    useGenre,
    profilePageEndpoint,
    heartStatus,
    setHeartStatus,
    followingStatus,
    setFollowingStatus,
  };
};
