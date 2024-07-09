import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/utils/utils";
import Photo from "./Photo";
import FavoriteGame from "./FavoriteGame";
import FollowLikeButton from "./FollowLikeButton";
import { useProfileContext } from "@/context/ProfileContext";

type UserHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const UserHeader = ({ className, ...rest }: UserHeaderProps) => {
  const { windowWidth } = useNavbarContext();

  const { userProfileObject, isAuthProfile, setShowProfileModal } =
    useProfileContext();

  const {
    displayname,
    following: followingCount,
    post: postCount,
  } = userProfileObject || {};

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

                <h1 className="text-2xl lg:text-4xl font-bold">
                  {displayname && capitalizeFirstLetter(displayname)}
                </h1>
              </div>

              <div className="flex items-center gap-x-2 text-xs md:text-sm">
                <div
                  className="cursor-pointer bg-sky-500 px-1 text-xs rounded hover:bg-sky-400 "
                  onClick={() => setShowProfileModal("following")}
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
