import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/utils/utils";
import Photo from "./Photo";
import FavoriteGame from "./FavoriteGame";
import FollowLikeButton from "./FollowLikeButton";
import { MdVerified } from "react-icons/md";
import { useProfile } from "@/hooks/useProfile";
import { useModal } from "@/hooks/useModal";

type UserHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const UserHeader = ({ className, ...rest }: UserHeaderProps) => {
  const { windowWidth } = useNavbarContext();

  const { isAuthProfile, userObject } = useProfile();
  const { setModalOpen } = useModal();

  const { displayname, following: followingCount } = userObject || {};

  return (
    <>
      {/* User Header (DISPLAY PHOTO, USER DISPLAYNAME, TITLE) */}
      <div className={className} {...rest}>
        {/* Display Photo */}
        <Photo variant="display" />

        {/* User's Basic Info */}
        <div
          className={cn("absolute top-20 flex flex-col gap-y-8 w-full", {
            "top-14": windowWidth <= 500,
            "gap-y-6 top-[4.5rem] lg:top-[5.5rem]":
              windowWidth > 500 && !isAuthProfile,
          })}
        >
          <div className="flex justify-between pe-2 lg:pe-0">
            <div
              className={cn(
                "flex flex-col justify-center gap-y-2 md:gap-y-3 ml-56 lg:ml-[20rem]",
                {
                  "ml-48": windowWidth <= 500,
                }
              )}
            >
              <div>
                <span className="text-xs text-blue-500 font-semibold ">
                  {/* User Title */}
                  Professional Gamer
                </span>

                <div className="flex items-end ">
                  <h1 className="text-2xl lg:text-4xl font-bold ">
                    {displayname && capitalizeFirstLetter(displayname)}
                  </h1>
                  <MdVerified className="ms-2 text-lg mb-1 lg:text-2xl lg:mb-[0.15rem] text-sky-400" />
                </div>
              </div>

              <div className="flex items-center gap-x-2 text-xs md:text-sm">
                <div
                  className="cursor-pointer bg-primary px-1 py-0.5 text-xs rounded hover:brightness-110 "
                  onClick={() => setModalOpen("following")}
                >
                  <span className="font-semibold text-white">
                    {followingCount}
                  </span>
                  <span className="text-muted-foreground ps-1 text-white">
                    following
                  </span>
                </div>
              </div>
            </div>

            <FollowLikeButton variant={"large"} />
          </div>

          {windowWidth >= 1024 && <FavoriteGame />}
        </div>
      </div>
    </>
  );
};

export default UserHeader;
