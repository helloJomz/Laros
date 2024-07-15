import { capitalizeFirstLetter, formatDateDistanceToNow } from "@/utils/utils";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "../ui/button";
import { useNavbarContext } from "@/context/NavbarContext";
import { GiHappySkull } from "react-icons/gi";
import PostType from "../common/post/PostType";
import PostSkeleton from "./skeletons/PostSkeleton";
import { usePost } from "@/hooks/usePost";
import { useProfile } from "@/hooks/useProfile";

const PostView = () => {
  //TODO: Put Comments and Reactions on the design

  const { isAuthProfile, profilePageEndpoint } = useProfile();
  const { postStates, pagination } = usePost();

  const { isLoading, isError, posts, refetch } = postStates;
  const { setLimit, setOffset } = pagination;

  console.log(posts);

  const { windowWidth } = useNavbarContext();

  const handleLoadMore = async () => {
    setLimit((limit) => limit + 5);
    setOffset((offset) => offset + 5);
    await refetch();
  };

  if (isLoading) return <PostSkeleton />;

  if (isError) return <span>Error...</span>;

  if (!posts)
    return (
      <>
        <div className="flex gap-x-4 items-center">
          <h4 className="font-bold">Post </h4>

          <div className="flex-1 border-dotted border-t-2 border-muted w-full mt-1" />
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
        <div className="border-dotted border-t-2 border-muted w-full mt-1" />
        <Button variant="secondary" className="px-2">
          <BsThreeDots />
        </Button>
      </div>

      <div className="flex flex-col gap-y-4">
        {posts.map((item: any) => {
          if (item.postType === "post") {
            return (
              <PostType
                key={item._id}
                content={item.content ? item.content : undefined}
                postImgURL={item.imgURL ? item.imgURL : undefined}
                createDate={formatDateDistanceToNow(item.createdAt)}
              />
            );
          }
        })}

        {posts.length > 0 && (
          <Button onClick={handleLoadMore}>Load more</Button>
        )}
      </div>
    </>
  );
};

export default PostView;
