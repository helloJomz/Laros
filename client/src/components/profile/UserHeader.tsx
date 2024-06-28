import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/utils/utils";
import Photo from "./Photo";
import { type UserProfileObject } from "@/types/Profile";
import FavoriteGame from "./FavoriteGame";
import FollowLikeButton from "./FollowLikeButton";
import { CircleDashed } from "lucide-react";

type UserHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  user: UserProfileObject;
};

const UserHeader = ({ user, className, ...rest }: UserHeaderProps) => {
  const { displayname, userid } = user;
  const { windowWidth } = useNavbarContext();

  return (
    <>
      {/* User Header (DISPLAY PHOTO, USER DISPLAYNAME, TITLE) */}
      <div className={className} {...rest}>
        {/* Display Photo */}
        <Photo variant="display" user={{ ...user }} />

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
                <span className="text-muted-foreground text-[0.7rem] md:text-sm hover:underline cursor-pointer">
                  467 posts
                </span>
                <CircleDashed size={8} />
                <span className="text-muted-foreground text-[0.7rem] md:text-sm hover:underline cursor-pointer">
                  1k following
                </span>
              </div>
            </div>

            <FollowLikeButton variant={"large"} count={{ ...user }} />
          </div>

          {windowWidth >= 1024 && <FavoriteGame userid={userid} />}
        </div>
      </div>
    </>
  );
};

export default UserHeader;
