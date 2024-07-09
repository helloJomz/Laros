import { useNavbarContext } from "@/context/NavbarContext";
import { useProfileContext } from "@/context/ProfileContext";
import { Snail } from "lucide-react";
import React from "react";
import CloseButton from "./CloseButton";
import {
  useGetAllHeartListQuery,
  useGetAllFollowerListQuery,
} from "@/app/features/profile/profileApiSlice";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "@/utils/utils";
import { useUserContext } from "@/context/UserContext";

type HeartAndFollowProps = {
  type: "heart" | "follow";
};

const HeartAndFollow = ({ type }: HeartAndFollowProps) => {
  const { windowWidth } = useNavbarContext();

  const { authenticatedUserObject } = useUserContext();

  const { isAuthProfile, setShowProfileModal } = useProfileContext();

  const {
    data: HeartList,
    isLoading: isHeartListLoading,
    isError: isHeartListError,
  } = useGetAllHeartListQuery(authenticatedUserObject.userid, {
    skip: type !== "heart",
  });

  const {
    data: FollowerList,
    isLoading: isFollowerListLoading,
    isError: isFollowerListError,
  } = useGetAllFollowerListQuery(authenticatedUserObject.userid, {
    skip: type !== "follow",
  });

  const HeartAndFollowWrapper = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return (
      <>
        <div className="bg-secondary w-[90%] h-[80%] md:w-1/2 md:h-[60%] xl:w-1/3 rounded shadow-lg px-4 pt-3 pb-8  flex flex-col gap-y-4">
          {children}
        </div>
      </>
    );
  };

  const HeartListComponent = () => {
    return (
      <>
        <div className="flex justify-between items-center">
          <div className="flex flex-col ">
            <h1 className="text-base lg:text-lg font-semibold">Hearts</h1>
            <div className="mt-[-0.2rem] ">
              <span className="text-xs text-muted-foreground">
                {HeartList.length === 0 && "You have no hearts yet."}

                {HeartList.length >= 1 &&
                  isAuthProfile &&
                  `${HeartList.length} gamer${
                    HeartList.length > 1 ? "s" : ""
                  } have given you hearts.`}
              </span>
            </div>
          </div>

          <CloseButton />
        </div>

        {HeartList.length > 0 ? (
          <>
            <div className="flex-grow flex flex-col lg:grid lg:grid-cols-2 lg:justify-center  gap-y-2 gap-x-2 overflow-y-auto pe-2">
              {HeartList.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <div className="flex items-center justify-between py-2 ps-2 pe-4 h-fit bg-slate-700 w-full rounded">
                    <div className="flex gap-x-2">
                      <img
                        src={item.imgURL}
                        alt={`photo_${item.displayname}`}
                        className="rounded-full w-12 h-12 object-cover pointer-events-none"
                      />
                      <div className="flex flex-col justify-center">
                        <Link
                          to={`/${item.displayname}`}
                          className="font-semibold hover:underline"
                          onClick={() => setShowProfileModal("")}
                        >
                          {capitalizeFirstLetter(item.displayname)}
                        </Link>
                      </div>
                    </div>
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
                {HeartList.length === 0 && "Oops! You have no hearts."}
              </span>
            </div>
          </>
        )}
      </>
    );
  };

  const FollowListComponent = () => {
    return (
      <>
        <div className="flex justify-between items-center">
          <div className="flex flex-col ">
            <h1 className="text-base lg:text-lg font-semibold">Followers</h1>
            <div className="mt-[-0.2rem] ">
              <span className="text-xs text-muted-foreground">
                {FollowerList.length === 0 && "You have no followers yet."}

                {FollowerList.length >= 1 &&
                  isAuthProfile &&
                  `${FollowerList.length} gamer${
                    FollowerList.length > 1 ? "s" : ""
                  } have followed you.`}
              </span>
            </div>
          </div>

          <CloseButton />
        </div>

        {FollowerList.length > 0 ? (
          <>
            <div className="flex-grow flex flex-col lg:grid lg:grid-cols-2 lg:justify-center  gap-y-2 gap-x-2 overflow-y-auto pe-2">
              {FollowerList.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <div className="flex items-center justify-between py-2 ps-2 pe-4 h-fit bg-slate-700 w-full rounded">
                    <div className="flex gap-x-2">
                      <img
                        src={item.imgURL}
                        alt={`photo_${item.displayname}`}
                        className="rounded-full w-12 h-12 object-cover pointer-events-none"
                      />
                      <div className="flex flex-col justify-center">
                        <Link
                          to={`/${item.displayname}`}
                          className="font-semibold hover:underline"
                          onClick={() => setShowProfileModal("")}
                        >
                          {capitalizeFirstLetter(item.displayname)}
                        </Link>
                      </div>
                    </div>
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
                {FollowerList.length === 0 && "Oops! You have no followers."}
              </span>
            </div>
          </>
        )}
      </>
    );
  };

  if (isHeartListLoading || isFollowerListLoading)
    return (
      <>
        <HeartAndFollowWrapper>
          <span>Loading...</span>
        </HeartAndFollowWrapper>
      </>
    );

  if (isHeartListError || isFollowerListError)
    return (
      <>
        <HeartAndFollowWrapper>
          <span>error...</span>
        </HeartAndFollowWrapper>
      </>
    );

  return (
    <>
      <HeartAndFollowWrapper>
        {type === "heart" ? <HeartListComponent /> : <FollowListComponent />}
      </HeartAndFollowWrapper>
    </>
  );
};

export default HeartAndFollow;
