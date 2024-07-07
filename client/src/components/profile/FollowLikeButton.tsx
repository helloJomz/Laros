import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa6";
import {
  useIncrementAndDecrementHeartCountMutation,
  useIncrementAndDecrementFollowCountMutation,
} from "@/app/features/profile/profileApiSlice";
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

  const { userProfileObject, isAuthProfile, isHeartUser, isFollowingUser } =
    useProfileContext();

  const {
    userid: otherUserUID,
    heartcount: heartCountFromAPI,
    follower: followerCountFromAPI,
  } = userProfileObject || {};

  const [incrementAndDecrementHeartCount, { isLoading: isHeartCountLoading }] =
    useIncrementAndDecrementHeartCountMutation();

  const [
    incrementAndDecrementFollowCount,
    { isLoading: isFollowCountLoading },
  ] = useIncrementAndDecrementFollowCountMutation();

  // TODO:
  // HAVE AN API THAT CHECKS IF THE USERID OF THIS PROFILE IS IN YOUR HEARTCOUNT
  const [isHeartClicked, setIsHeartClicked] = useState<boolean>(isHeartUser);
  const [isFollowClicked, setIsFollowClicked] =
    useState<boolean>(isFollowingUser);

  const [heartCount, setHeartCount] = useState<number>(heartCountFromAPI || 0);
  const [followerCount, setFollowerCount] = useState<number>(
    followerCountFromAPI || 0
  );

  const handleHeartClick = async () => {
    setIsHeartClicked((click: boolean) => !click);
    setHeartCount((heart: number) => (isHeartClicked ? heart - 1 : heart + 1));

    await incrementAndDecrementHeartCount({
      yourUID: yourUID,
      otherUserUID: otherUserUID ? otherUserUID : "",
    });
  };

  const handleFollowClick = async () => {
    setIsFollowClicked((click: boolean) => !click);
    setFollowerCount((follow: number) =>
      !isFollowClicked ? follow + 1 : follow - 1
    );
    await incrementAndDecrementFollowCount({
      yourUID: yourUID,
      otherUserUID: otherUserUID ? otherUserUID : "",
    });
  };

  // FOR MOBILE SCREEN AND SMALLER
  //FIXME: Make the text background sort of grayish/blackish to indicate that they have not followed/liked the user.
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
                  <Button
                    className="cursor-pointer text-center bg-transparent hover:bg-transparent"
                    variant={"ghost"}
                    onClick={handleHeartClick}
                    disabled={isHeartCountLoading}
                  >
                    <FaHeart
                      className={`text-3xl ${
                        isHeartClicked ? "text-red-500" : "text-white"
                      }`}
                    />
                  </Button>
                )}

                <span className="text-xs bg-red-500 py-0.5 px-1 rounded">
                  {isAuthProfile ? "Likes" : isHeartClicked ? "Liked" : "Like"}
                </span>
              </div>

              <div className="flex flex-col items-center gap-y-2 w-14 ">
                <span className="text-base font-bold">{followerCount}</span>
                {!isAuthProfile && (
                  <Button
                    className="cursor-pointer text-center bg-transparent hover:bg-transparent"
                    variant={"ghost"}
                    onClick={handleFollowClick}
                    disabled={isFollowCountLoading}
                  >
                    <FaUserAstronaut
                      className={`text-3xl ${
                        isFollowClicked ? "text-emerald-500" : "text-white"
                      }`}
                    />
                  </Button>
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
            "hidden flex-col pe-2 pt-4 pb-1 shadow-sm w-fit gap-y-2 items-center justify-center text-2xl",
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
              <span
                className="text-xs bg-red-500
               px-1 py-0.5 rounded w-14 text-center"
              >
                {isAuthProfile ? "Likes" : isHeartClicked ? "Liked" : "Like"}
              </span>
            )}
          </div>

          <div className="w-full border-b border-slate-600" />

          <div
            className={cn("flex items-center gap-x-1", {
              "gap-x-2": isAuthProfile,
            })}
          >
            <span className="text-base font-bold">{followerCount}</span>
            {!isAuthProfile ? (
              <Button
                variant={"ghost"}
                className="cursor-pointer hover:text-emerald-500 rounded-full hover:bg-muted p-2 flex justify-center items-center"
                onClick={handleFollowClick}
                disabled={isFollowCountLoading}
              >
                <FaUserAstronaut
                  className={`text-2xl ${
                    isFollowClicked ? "text-emerald-500" : "text-white"
                  }`}
                />
              </Button>
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
