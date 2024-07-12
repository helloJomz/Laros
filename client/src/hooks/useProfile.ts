import { isError, isLoading, user } from "@/app/features/users/userSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCurrentUser } from "@/app/features/auth/authSlice";

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
  const isProfileLoading: boolean = useSelector(isLoading);
  const isProfileError: boolean = useSelector(isError);
  const userObject: UserProfile = useSelector(user);

  const isAuthProfile =
    useSelector(selectCurrentUser)?.displayname === useParams()?.displayname;

  return {
    isProfileLoading,
    isProfileError,
    userObject,
    isAuthProfile,
  };
};
