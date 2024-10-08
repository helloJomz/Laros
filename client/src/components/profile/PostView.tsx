import { capitalizeFirstLetter } from "@/utils/utils";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "../ui/button";
import { useNavbarContext } from "@/context/NavbarContext";
import { GiHappySkull } from "react-icons/gi";
import PostType from "../common/post/PostType";
import PostSkeleton from "./skeletons/PostSkeleton";
import { usePost } from "@/hooks/usePost";
import { useProfile } from "@/hooks/useProfile";

const PostView = () => {
  const { isAuthProfile, profilePageEndpoint } = useProfile();
  const { postStates } = usePost();

  const { isPostFetching, isPostSaveError, fetchedPosts } = postStates;

  const { windowWidth } = useNavbarContext();

  if (isPostFetching) return <PostSkeleton />;

  if (isPostSaveError) return <span>Error...</span>;

  if (fetchedPosts.length === 0)
    return (
      <>
        <div className="flex gap-x-4 items-center">
          <h4 className="font-bold">Post </h4>
          <div className="flex-1 border-t-2 border-muted w-full mt-1" />
        </div>

        <div className="flex flex-col gap-y-4 text-center text-muted-foreground m-0 md:mt-4 py-10 lg:py-8">
          <span className="text-sm md:text-base">
            {isAuthProfile ? (
              "You haven't posted anything yet!"
            ) : (
              <>
                <strong className="pe-1">
                  {capitalizeFirstLetter(profilePageEndpoint!)}
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
        <div className="border-t border-muted w-full mt-1" />
        <Button variant="secondary" className="px-2 h-6">
          <BsThreeDots />
        </Button>
      </div>

      <div className="flex flex-col gap-y-4">
        {fetchedPosts.map((post: any, index: number) => {
          if (post.postType === "post")
            return <PostType key={`postType-${index}`} postObject={post} />;
          return null;
        })}
      </div>
    </>
  );
};

export default PostView;
