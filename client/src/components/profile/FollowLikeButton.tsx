import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa6";

type FollowLikeButtonProps = {
  variant: "small" | "large";
  count: {
    heartcount: number;
    follower: number;
  };
};

const FollowLikeButton = ({ variant, count }: FollowLikeButtonProps) => {
  const { windowWidth } = useNavbarContext();

  const [isHeartClicked, setIsHeartClicked] = useState<boolean>(false);
  const [isFollowClicked, setIsFollowClicked] = useState<boolean>(false);

  const [heartCount, setHeartCount] = useState<number>(
    count ? count.heartcount : 0
  );
  const [followerCount, setFollowerCount] = useState<number>(
    count ? count.follower : 0
  );

  // TODO: Continue the backend of this!
  const handleHeartClick = async () => {
    setIsHeartClicked((click: boolean) => !click);
    setHeartCount((heart: number) => (!isHeartClicked ? heart + 1 : heart - 1));
    if (isHeartClicked) {
      // Increment in the database
    } else {
      // Decrement in the database
    }
  };

  const handleFollowClick = async () => {
    setIsFollowClicked((click: boolean) => !click);
    setFollowerCount((follow: number) =>
      !isFollowClicked ? follow + 1 : follow - 1
    );
    if (isFollowClicked) {
      // Increment in the database
    } else {
      // Decrement in the database
    }
  };

  // FOR MOBILE SCREEN AND SMALLER
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
            <div className="flex flex-col items-center gap-y-2">
              <span className="text-xs font-bold">{heartCount}</span>
              <div
                className="cursor-pointer text-center text-3xl"
                onClick={handleHeartClick}
              >
                <FaHeart
                  className={`${
                    isHeartClicked ? "text-red-500" : "text-white"
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-y-2">
              <span className="text-xs font-bold">{followerCount}</span>
              <div
                className="cursor-pointer text-center text-3xl"
                onClick={handleFollowClick}
              >
                <FaUserAstronaut
                  className={`${
                    isFollowClicked ? "text-emerald-500" : "text-white"
                  }`}
                />
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
            "hidden flex-col px-2 py-1 shadow-sm w-fit gap-y-2 items-center justify-center text-2xl",
            {
              flex: windowWidth > 500,
            }
          )}
        >
          <div className="flex items-center gap-x-1">
            <span className="text-xs font-semibold">{heartCount}</span>
            <div
              className="cursor-pointer hover:text-red-500 rounded-full hover:bg-muted p-2 flex justify-center items-center"
              onClick={handleHeartClick}
            >
              <FaHeart
                className={`${isHeartClicked ? "text-red-500" : "text-white"}`}
              />
            </div>
          </div>

          <div className="w-full border-dotted border-t-2 border-muted" />

          <div className="flex items-center gap-x-1">
            <span className="text-xs font-semibold">{followerCount}</span>
            <div
              className="cursor-pointer hover:text-emerald-500 rounded-full hover:bg-muted p-2 text-center"
              onClick={handleFollowClick}
            >
              <FaUserAstronaut
                className={`${
                  isFollowClicked ? "text-emerald-500" : "text-white"
                }`}
              />
            </div>
          </div>
        </div>
      </>
    );
};

export default FollowLikeButton;
