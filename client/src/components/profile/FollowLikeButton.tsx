import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa6";
import {
  useGetUserByIdMutation,
  useIncrementAndDecrementHeartCountMutation,
} from "@/app/features/users/userApiSlice";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/UserContext";
import { useProfileContext } from "@/context/ProfileContext";

type FollowLikeButtonProps = {
  variant: "small" | "large";
};

const FollowLikeButton = ({ variant }: FollowLikeButtonProps) => {
  const { windowWidth } = useNavbarContext();

  const { authenticatedUserObject } = useUserContext();
  const { userid: yourUID } = authenticatedUserObject;

  const { userProfileObject, isAuthProfile } = useProfileContext();
  const {
    userid: otherUserUID,
    heartcount: heartCountFromAPI,
    follower: followerCountFromAPI,
  } = userProfileObject || {};

  // const [
  //   getUserById,
  //   // { isLoading: isLoadingGettingUserInfo, data: visitedUserData },
  // ] = useGetUserByIdMutation();

  const [
    incrementAndDecrementHeartCount,
    { isLoading: isHeartCountLoading, data },
  ] = useIncrementAndDecrementHeartCountMutation();

  // TODO:
  // HAVE AN API THAT CHECKS IF THE USERID OF THIS PROFILE IS IN YOUR HEARTCOUNT
  const [isHeartClicked, setIsHeartClicked] = useState<boolean>(false);
  const [isFollowClicked, setIsFollowClicked] = useState<boolean>(false);

  const [heartCount, setHeartCount] = useState<number>(heartCountFromAPI || 0);
  const [followerCount, setFollowerCount] = useState<number>(
    followerCountFromAPI || 0
  );

  // useEffect(() => {
  //   const getVisitedUserProfileInfo = async (uid: string) => {
  //     const user = await getUserById(uid);
  //     if (user) {
  //       const userHeartCount = user.data?.heartcount;
  //       const userFollowerCount = user.data?.follower;

  //       // Count States
  //       setHeartCount(userHeartCount);
  //       setFollowerCount(userFollowerCount);

  //       // Click States
  //       //TODO: Create an api to verify if i am following to this person.

  //       // setIsHeartClicked(userHeartCoun);
  //     }
  //   };
  //   if (userid) getVisitedUserProfileInfo(userid);
  // }, []);

  const handleHeartClick = async () => {
    setIsHeartClicked((click: boolean) => !click);
    setHeartCount((heart: number) => heart + 1);
    await incrementAndDecrementHeartCount({
      yourUID: yourUID,
      otherUserUID: otherUserUID || "",
    });
  };

  const handleFollowClick = async () => {
    setIsFollowClicked((click: boolean) => !click);
    setFollowerCount((follow: number) =>
      !isFollowClicked ? follow + 1 : follow - 1
    );
    if (isFollowClicked) {
      // Increment in the database
    } else {
      // Decrement in the database
    }
  };

  // FOR MOBILE SCREEN AND SMALLER
  if (variant === "small")
    return (
      <>
        <div
          className={cn(
            "absolute block bottom-0 right-0 text-3xl text-white z-50 w-fit",
            {
              hidden: windowWidth > 500,
            }
          )}
        >
          <div className="flex justify-end gap-x-5 px-4 py-3">
            <div className="flex flex-row gap-x-1">
              <div className="flex flex-col items-center gap-y-2 w-14 ">
                <span className="text-base font-bold">{heartCount}</span>
                {!isAuthProfile && (
                  <div
                    className="cursor-pointer text-center"
                    onClick={handleHeartClick}
                  >
                    <FaHeart
                      className={`text-3xl ${
                        isHeartClicked ? "text-red-500" : "text-white"
                      }`}
                    />
                  </div>
                )}

                <span className="text-xs bg-red-500 py-0.5 px-1 rounded">
                  {isAuthProfile ? "Likes" : isHeartClicked ? "Liked" : "Like"}
                </span>
              </div>

              <div className="flex flex-col items-center gap-y-2 w-14 ">
                <span className="text-base font-bold">{followerCount}</span>
                {!isAuthProfile && (
                  <div
                    className="cursor-pointer text-center"
                    onClick={handleFollowClick}
                  >
                    <FaUserAstronaut
                      className={`text-3xl ${
                        isFollowClicked ? "text-emerald-500" : "text-white"
                      }`}
                    />
                  </div>
                )}
                <span className="text-xs bg-emerald-500 py-0.5 px-1 rounded">
                  {isAuthProfile
                    ? "Followers"
                    : isFollowClicked
                    ? "Followed"
                    : "Follow"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );

  // FOR TABLET SIZE AND LARGER
  if (variant === "large")
    return (
      <>
        <div
          className={cn(
            "hidden flex-col pe-2 py-1 shadow-sm w-fit gap-y-1 items-center justify-center text-2xl",
            {
              flex: windowWidth > 500,
            }
          )}
        >
          <div
            className={cn("flex items-center gap-x-1", {
              "gap-x-2": isAuthProfile,
            })}
          >
            <span className="text-base font-bold">{heartCount}</span>
            {!isAuthProfile ? (
              <Button
                variant={"ghost"}
                className="cursor-pointer hover:text-red-500 rounded-full hover:bg-muted p-2 flex justify-center items-center"
                onClick={handleHeartClick}
                disabled={isHeartCountLoading}
              >
                <FaHeart
                  className={`text-2xl ${
                    isHeartClicked ? "text-red-500" : "text-white"
                  }`}
                />
              </Button>
            ) : (
              <span className="text-xs bg-red-500 px-1 py-0.5 rounded w-14 text-center">
                {isAuthProfile ? "Likes" : isHeartClicked ? "Liked" : "Like"}
              </span>
            )}
          </div>

          <div className="w-full border-dotted border-t-2 border-muted" />

          <div
            className={cn("flex items-center gap-x-1", {
              "gap-x-2": isAuthProfile,
            })}
          >
            <span className="text-base font-bold">{followerCount}</span>
            {!isAuthProfile ? (
              <div
                className="cursor-pointer hover:text-emerald-500 rounded-full hover:bg-muted p-2 text-center"
                onClick={handleFollowClick}
              >
                <FaUserAstronaut
                  className={`text-2xl ${
                    isFollowClicked ? "text-emerald-500" : "text-white"
                  }`}
                />
              </div>
            ) : (
              <span className="text-xs bg-emerald-500 px-1 py-0.5 rounded">
                {isAuthProfile
                  ? "Followers"
                  : isFollowClicked
                  ? "Followed"
                  : "Follow"}
              </span>
            )}
          </div>
        </div>
      </>
    );
};

export default FollowLikeButton;
