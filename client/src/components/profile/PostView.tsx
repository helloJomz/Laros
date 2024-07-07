import { capitalizeFirstLetter } from "@/utils/utils";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useProfileContext } from "@/context/ProfileContext";
import { useNavbarContext } from "@/context/NavbarContext";
import { GiHappySkull } from "react-icons/gi";

const PostView = () => {
  //TODO: Put Comments and Reactions on the design
  // Need backend

  const { windowWidth } = useNavbarContext();

  const {
    userProfileObject,
    isAuthProfile,
    profileEndpoint: visitedUserDisplayName,
  } = useProfileContext();
  const {
    userid,
    imgURL,
    displayname,
    post: postCount,
  } = userProfileObject || {};

  if (postCount === 0)
    return (
      <>
        <div className="flex gap-x-4 items-center">
          <h4 className="font-bold">Posts</h4>
          <div className="border-dotted border-t-2 border-muted w-full mt-1" />
        </div>

        <div className="flex flex-col gap-y-4 text-center text-muted-foreground m-0 md:mt-4 py-10 lg:py-8">
          <span className="text-sm md:text-base">
            {isAuthProfile ? (
              "You haven't posted anything yet!"
            ) : (
              <>
                <strong className="pe-1">
                  {capitalizeFirstLetter(visitedUserDisplayName)}
                </strong>
                hasn't shared any posts yet.
              </>
            )}
          </span>
          <div className="flex justify-center font-semibold">
            <GiHappySkull size={windowWidth <= 768 ? 80 : 200} />
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="flex gap-x-4 items-center">
        <h4 className="font-bold">Posts</h4>
        <div className="border-dotted border-t-2 border-muted w-full mt-1" />
        <Button variant="secondary" className="px-2">
          <BsThreeDots />
        </Button>
      </div>

      <div className="flex flex-col gap-y-4">
        <div className="w-full bg-secondary h-fit p-2 flex flex-col gap-y-4 rounded">
          <div className="flex gap-x-2 items-center">
            <img
              src={imgURL!}
              alt={`${displayname}_photo`}
              className="w-10 h-10 rounded-full object-cover pointer-events-none"
            />
            <div className="flex flex-col">
              <Link to={`/${displayname}`}>
                <span className="font-semibold hover:underline">
                  {displayname && capitalizeFirstLetter(displayname)}
                </span>
              </Link>

              <span className="text-muted-foreground text-xs">26/06/2024</span>
            </div>
          </div>

          {/* Actual Post */}
          <div className="bg-pink-500 w-full rounded h-72 p-2"></div>
        </div>

        <div className="w-full bg-secondary h-fit p-2 flex flex-col gap-y-4 rounded">
          <div className="flex gap-x-2 items-center">
            <img
              src={imgURL!}
              alt={`${displayname}_photo`}
              className="w-10 h-10 rounded-full object-cover pointer-events-none"
            />
            <div className="flex flex-col">
              <span className="font-semibold">
                {displayname && capitalizeFirstLetter(displayname)}
              </span>
              <span className="text-muted-foreground text-xs">26/06/2024</span>
            </div>
          </div>

          {/* Actual Posts */}
          <div className="bg-emerald-500 w-full rounded h-72 p-2"></div>
        </div>
      </div>
    </>
  );
};

export default PostView;
