import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";
import Intro from "@/components/profile/Intro";
import Photo from "@/components/profile/Photo";
import UserHeader from "@/components/profile/UserHeader";
import Post from "../components/profile/Post";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";
import ProfileModal from "@/components/profile/ProfileModal";
import { useProfile } from "@/hooks/useProfile";
import { useEffect } from "react";
import { useGetUserByDisplayNameMutation } from "@/app/features/users/userApiSlice";
import { usePageTabName } from "@/hooks/usePageTabName";

const ProfilePage = () => {
  const { windowWidth } = useNavbarContext();

  const { isProfileError, isProfileLoading, profilePageEndpoint } =
    useProfile();

  usePageTabName({ tabName: profilePageEndpoint! || "Laros" });

  const [getUserByDisplayName] = useGetUserByDisplayNameMutation();

  useEffect(() => {
    const execGetUserByDisplayName = async () => {
      await getUserByDisplayName(profilePageEndpoint!);
    };
    execGetUserByDisplayName();
  }, [profilePageEndpoint]);

  if (isProfileError)
    return (
      <>
        <span>error...</span>
      </>
    );

  if (isProfileLoading)
    return (
      <>
        <ProfileSkeleton />
      </>
    );

  if (!isProfileLoading && !isProfileError)
    return (
      <>
        <ProfileModal />

        <div className="w-full md:w-[85%] xl:w-1/2 m-auto ">
          <div
            className={cn("flex flex-col gap-y-36 lg:gap-y-60", {
              "gap-y-32": windowWidth <= 500,
            })}
          >
            <div>
              <div className="relative w-full">
                <Photo variant="cover" />

                <UserHeader
                  className={cn("relative top-[-4rem]", {
                    "top-[-2.5rem]": windowWidth <= 500,
                  })}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-x-6 gap-y-4 px-4">
              <Intro className="bg-secondary rounded px-3 pt-3 pb-4 lg:w-[30%] h-fit" />
              <Post className="flex-1 rounded h-auto md:h-full overflow-y-auto flex flex-col gap-y-4 pb-4" />
            </div>
          </div>
        </div>
      </>
    );
};

export default ProfilePage;
