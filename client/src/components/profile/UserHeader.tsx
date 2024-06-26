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

  const { userProfileObject } = useProfileContext();
  const { displayname, following: followingCount } = userProfileObject || {};

  return (
    <>
      {/* User Header (DISPLAY PHOTO, USER DISPLAYNAME, TITLE) */}
      <div className={className} {...rest}>
        {/* Display Photo */}
        <Photo variant="display" />

        {/* User's Basic Info */}
        <div
          className={cn(
            "absolute top-20 flex flex-col gap-y-6 lg:top-24 w-full",
            {
              "top-14": windowWidth <= 500,
            }
          )}
        >
          <div className="flex justify-between pe-4">
            <div
              className={cn(
                "flex flex-col justify-center gap-y-2 ml-56 lg:ml-[20rem]",
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
                <h1 className=" text-2xl lg:text-4xl font-bold">
                  {displayname && capitalizeFirstLetter(displayname)}
                </h1>
              </div>

              <div className="flex items-center gap-x-2 ">
                <div className="flex gap-x-1  text-[0.7rem] md:text-sm hover:underline cursor-pointer">
                  <span className="font-semibold text-slate-300">467 </span>
                  <span className="text-muted-foreground">posts</span>
                </div>

                <div className="flex gap-x-1 text-[0.7rem] md:text-sm hover:underline cursor-pointer">
                  <span className="font-semibold text-slate-300">
                    {followingCount}
                  </span>
                  <span className="text-muted-foreground ">following</span>
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
