import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserByDisplayNameMutation } from "@/app/features/users/userApiSlice";
import PageNotFound from "./PageNotFound";
import { delay } from "@/utils/utils";
import { capitalizeFirstLetter } from "@/utils/utils";
import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";
import Intro from "@/components/profile/Intro";
import Photo from "@/components/profile/Photo";
import UserHeader from "@/components/profile/UserHeader";
import Post from "../components/profile/Post";
import { type UserProfileObject } from "@/types/Profile";

const ProfilePage = () => {
  const { displayname: displayNameFromURL } = useParams();
  const { windowWidth } = useNavbarContext();

  const [fetchLoading, setIsFetchLoading] = useState<boolean>(false);

  const [getUserByDisplayName, { isLoading, isError }] =
    useGetUserByDisplayNameMutation();

  const [displayProfileObject, setDisplayProfileObject] =
    useState<UserProfileObject>();

  useEffect(() => {
    const executeGetUserByDisplayNameProfile = async () => {
      setIsFetchLoading(true);
      await delay(1500);
      const { data, error } = await getUserByDisplayName(
        displayNameFromURL || ""
      );
      setDisplayProfileObject(!error ? { ...data } : undefined);
      setIsFetchLoading(false);
    };
    executeGetUserByDisplayNameProfile();

    return () => {
      setDisplayProfileObject(undefined);
    };
  }, [displayNameFromURL]);

  useEffect(() => {
    document.title = `Laros | ${capitalizeFirstLetter(displayNameFromURL!)}`;
  }, [displayNameFromURL]);

  // DISPLAY LOADING ( TODO: SKELETON ON SHACDN UI ) WHEN THE PAGE FIRST LOADS.
  if (isLoading || fetchLoading)
    return (
      <>
        <span>Loading...</span>
      </>
    );

  if (isError && !displayProfileObject) return <PageNotFound />;

  return (
    <div className="w-full md:w-[85%] xl:w-1/2 m-auto">
      <div
        className={cn("flex flex-col gap-y-36 lg:gap-y-60 ", {
          "gap-y-32": windowWidth <= 500,
        })}
      >
        <div>
          <div className="relative w-full">
            <Photo
              variant="cover"
              user={{ ...displayProfileObject! }}
              // Edit the className inside the component because it is based on variant
            />

            <UserHeader
              user={{ ...displayProfileObject! }}
              className={cn("relative top-[-4rem]", {
                "top-[-2.5rem]": windowWidth <= 500,
              })}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-x-6 gap-y-4 px-4">
          <Intro
            user={{ ...displayProfileObject! }}
            className="bg-secondary rounded px-3 pt-3 pb-4 md:w-[30%] h-fit"
          />

          <Post
            user={{ ...displayProfileObject! }}
            className="flex-1 rounded h-auto md:h-full overflow-y-auto flex flex-col gap-y-4 pb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
