import { useNavbarContext } from "@/context/NavbarContext";
import { useProfileContext } from "@/context/ProfileContext";
import { Snail } from "lucide-react";
import React from "react";
import CloseButton from "./CloseButton";
import {
  useGetUserFollowingQuery,
  useUnfollowUserMutation,
} from "@/app/features/profile/profileApiSlice";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "@/utils/utils";
import { useUserContext } from "@/context/UserContext";

const Following = () => {
  const { windowWidth } = useNavbarContext();

  const { authenticatedUserObject } = useUserContext();

  const { userProfileObject, isAuthProfile, setShowProfileModal } =
    useProfileContext();

  const displayname: string = userProfileObject
    ? userProfileObject.displayname
    : "";
  const uid: string = userProfileObject ? userProfileObject.userid : "";

  const {
    data: followListArray,
    isLoading,
    isError,
    refetch: refetchFollowingList,
  } = useGetUserFollowingQuery(
    isAuthProfile ? authenticatedUserObject.userid : uid
  );

  const finalFollowListArray = followListArray && followListArray;

  const [unfollowUser] = useUnfollowUserMutation();

  const handleUnfollowClick = async (targetUID: string) => {
    const { error } = await unfollowUser({
      yourUID: uid,
      otherUserUID: targetUID,
    });
    if (!error) {
      refetchFollowingList();
    }
  };

  const FollowingWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        <div className="bg-secondary w-[90%] h-[80%] md:w-1/2 md:h-[60%] xl:w-1/3 rounded shadow-lg px-4 pt-3 pb-8  flex flex-col gap-y-4">
          {children}
        </div>
      </>
    );
  };

  const FollowingContentComponent = () => {
    return (
      <>
        <div className="flex justify-between items-center">
          <div className="flex flex-col ">
            <h1 className="text-base lg:text-lg font-semibold">Following</h1>
            <div className="mt-[-0.2rem] ">
              <span className="text-xs text-muted-foreground">
                {finalFollowListArray.length === 0 &&
                  isAuthProfile &&
                  "You are not following anyone."}

                {finalFollowListArray.length === 0 &&
                  !isAuthProfile &&
                  `${capitalizeFirstLetter(
                    displayname
                  )} is not following anyone.`}

                {finalFollowListArray.length >= 1 &&
                  isAuthProfile &&
                  `You are following ${finalFollowListArray.length} gamer${
                    finalFollowListArray.length > 1 ? "s" : ""
                  }`}

                {finalFollowListArray.length >= 1 &&
                  !isAuthProfile &&
                  `${capitalizeFirstLetter(displayname)} is following ${
                    finalFollowListArray.length
                  } gamer${finalFollowListArray.length > 1 ? "s" : ""}`}
              </span>
            </div>
          </div>

          <CloseButton />
        </div>

        {followListArray.length > 0 ? (
          <>
            <div className="flex-grow flex flex-col lg:grid lg:grid-cols-2 lg:justify-center  gap-y-2 gap-x-2 overflow-y-auto pe-2">
              {followListArray.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <div className="flex items-center justify-between py-2 ps-2 pe-4 h-fit bg-slate-700 w-full rounded">
                    <div className="flex gap-x-2">
                      <img
                        src={item.imgURL}
                        alt={`photo_${item.displayname}`}
                        className="rounded-full w-12 h-12 object-cover"
                      />
                      <div className="flex flex-col justify-center">
                        <Link
                          to={`/${item.displayname}`}
                          className="font-semibold hover:underline"
                          onClick={() => setShowProfileModal("")}
                        >
                          {capitalizeFirstLetter(item.displayname)}
                        </Link>

                        {isAuthProfile && (
                          <span className="text-xs text-muted-foreground mt-[-0.1rem]">
                            {item.isMutual ? "Friends" : "Following"}
                          </span>
                        )}
                      </div>
                    </div>
                    {isAuthProfile && (
                      <span
                        className="bg-gray-900 text-xs py-1 px-2 rounded cursor-pointer hover:bg-gray-800"
                        onClick={() => handleUnfollowClick(item._id)}
                      >
                        Unfollow
                      </span>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex-grow flex flex-col justify-center items-center gap-y-2 md:pb-12">
              <Snail
                size={windowWidth <= 640 ? 180 : 200}
                className="text-muted-foreground"
              />
              <span className="text-xs md:text-sm text-muted-foreground">
                {followListArray.length === 0 && isAuthProfile
                  ? "Oops! You are currently not following anyone."
                  : `Oops! ${capitalizeFirstLetter(
                      displayname
                    )} is not following anyone.`}
              </span>
            </div>
          </>
        )}
      </>
    );
  };

  if (isLoading) {
    return (
      <>
        <FollowingWrapper>
          <span>Loading...</span>
        </FollowingWrapper>
      </>
    );
  }

  if (isError)
    return (
      <>
        <FollowingWrapper>
          <span>error...</span>
        </FollowingWrapper>
      </>
    );

  return (
    <>
      <FollowingWrapper>
        <FollowingContentComponent />
      </FollowingWrapper>
    </>
  );
};

export default Following;
