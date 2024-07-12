import {
  useAddHeartMutation,
  useMinusHeartMutation,
  useAddFollowMutation,
  useMinusFollowMutation,
} from "@/app/features/profile/profileApiSlice";
import { useUserContext } from "@/context/UserContext";
import { useModal } from "@/hooks/useModal";
import { useProfile } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaHeart, FaUserAstronaut } from "react-icons/fa";

type ButtonIcons = {
  heart: React.ReactNode;
  follow: React.ReactNode;
};

type ComponentFollowLikeButton = React.HTMLAttributes<HTMLDivElement> & {
  variant: "small" | "large";
  type: "heart" | "follow";
};

const ComponentFollowLikeButton = ({
  variant,
  type,
}: ComponentFollowLikeButton) => {
  const { authenticatedUserObject } = useUserContext();
  const { userid: yourUID } = authenticatedUserObject;

  const { setModalOpen } = useModal();

  const {
    isAuthProfile,
    userObject,
    heartStatus,
    setHeartStatus,
    followingStatus,
    setFollowingStatus,
  } = useProfile();

  const {
    heartcount: heartCountFromAPI,
    follower: followerCountFromAPI,
    userid: otherUserUID,
  } = userObject || {};

  const [heartCount, setHeartCount] = useState<number>(heartCountFromAPI || 0);
  const [followerCount, setFollowerCount] = useState<number>(
    followerCountFromAPI || 0
  );

  const [addHeart] = useAddHeartMutation();
  const [minusHeart] = useMinusHeartMutation();

  const [addFollow] = useAddFollowMutation();
  const [minusFollow] = useMinusFollowMutation();

  const handleHeartClick = async () => {
    setHeartCount((heart) => (heartStatus ? heart - 1 : heart + 1));
    setHeartStatus(!heartStatus);
    if (!heartStatus) {
      await addHeart({
        yourUID: yourUID,
        otherUserUID: otherUserUID ? otherUserUID : "",
      });
    } else {
      await minusHeart({
        yourUID: yourUID,
        otherUserUID: otherUserUID ? otherUserUID : "",
      });
    }
  };

  const handleFollowClick = async () => {
    setFollowerCount((follow) => (followingStatus ? follow - 1 : follow + 1));
    setFollowingStatus(!followingStatus);
    if (!followingStatus) {
      await addFollow({
        yourUID: yourUID,
        otherUserUID: otherUserUID ? otherUserUID : "",
      });
    } else {
      await minusFollow({
        yourUID: yourUID,
        otherUserUID: otherUserUID ? otherUserUID : "",
      });
    }
  };

  const handleSeeAllHeartClick = async () => {
    setModalOpen("heart");
  };

  const handleSeeAllFollowClick = async () => {
    setModalOpen("heart");
  };

  const IconList: ButtonIcons = {
    heart: (
      <FaHeart
        size={variant === "large" ? 30 : 24}
        className={
          heartStatus || isAuthProfile
            ? "text-red-500 hover:text-white"
            : "text-white hover:text-red-500"
        }
      />
    ),
    follow: (
      <FaUserAstronaut
        size={variant === "large" ? 30 : 24}
        className={
          followingStatus || isAuthProfile
            ? "text-emerald-500 hover:text-white"
            : "text-white hover:text-emerald-500"
        }
      />
    ),
  };

  // TODO: Increase the size for smaller screens.
  if (variant === "small")
    return (
      <>
        <div
          className="flex gap-x-2 items-center w-14"
          onClick={
            !isAuthProfile
              ? undefined
              : type === "heart"
              ? handleSeeAllHeartClick
              : handleSeeAllFollowClick
          }
        >
          <span className="text-sm font-bold">
            {type === "heart" ? heartCount : followerCount}
          </span>

          {!isAuthProfile ? (
            <div
              className="relative flex"
              onClick={
                isAuthProfile
                  ? undefined
                  : type === "heart"
                  ? handleHeartClick
                  : handleFollowClick
              }
            >
              <span className="rounded-full bg-slate-800 p-2">
                {IconList[type]}
              </span>

              {type === "heart" && heartStatus && (
                <div className="absolute top-[1.2rem] right-[0.1rem] bg-slate-800 w-4 h-4 flex justify-center items-center rounded-full">
                  <FaCheck size={10} className="text-green-400 font-bold" />
                </div>
              )}

              {type === "follow" && followingStatus && (
                <div className="absolute top-[1.2rem] right-[0.1rem] bg-slate-800 w-4 h-4 flex justify-center items-center rounded-full">
                  <FaCheck size={10} className="text-green-400 font-bold" />
                </div>
              )}
            </div>
          ) : (
            <>
              <span>{IconList[type]}</span>
            </>
          )}
        </div>
      </>
    );

  if (variant === "large")
    return (
      <>
        <div
          className={cn("flex items-center gap-x-1 pe-1 cursor-pointer", {
            "gap-x-2 hover:underline": isAuthProfile,
          })}
          onClick={
            !isAuthProfile
              ? undefined
              : type === "heart"
              ? handleSeeAllHeartClick
              : handleSeeAllFollowClick
          }
        >
          <div
            className={`relative ${!isAuthProfile ? "cursor-pointer" : ""}`}
            onClick={
              isAuthProfile
                ? undefined
                : type === "heart"
                ? handleHeartClick
                : handleFollowClick
            }
          >
            <div className="flex gap-x-2 items-center">
              <span className="text-base font-bold">
                {type === "heart" ? heartCount : followerCount}
              </span>

              <span>{IconList[type]}</span>
            </div>

            {!isAuthProfile && type === "heart" && heartStatus && (
              <div className="absolute top-[0.9rem] left-9 right-0 bg-background w-5 h-5 flex justify-center items-center rounded-full">
                <FaCheck size={10} className="text-green-400 font-bold" />
              </div>
            )}

            {!isAuthProfile && type === "follow" && followingStatus && (
              <div className="absolute top-[0.9rem] left-9 right-0 bg-background w-5 h-5 flex justify-center items-center rounded-full">
                <FaCheck size={10} className="text-green-400 font-bold" />
              </div>
            )}
          </div>
        </div>
      </>
    );
};

export default ComponentFollowLikeButton;
