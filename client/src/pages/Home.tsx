import CreatePost from "../components/common/CreatePost";
import { usePost } from "@/hooks/usePost";
import PostType from "../components/common/post/PostType";
import { Helmet } from "react-helmet-async";
import PostSkeleton from "@/components/profile/skeletons/PostSkeleton";

const Home = () => {
  const { fetchedPosts } = usePost().postStates;
  const { useIsPostLoading } = usePost().navStates;

  if (fetchedPosts.length === 0)
    return (
      <>
        <div className="px-2 py-2 md:py-4 h-full">
          <div className="flex flex-col gap-y-4 h-full">
            <CreatePost />
            <div>
              <span>No user has post anything yet.</span>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Helmet>
        <title>Laros</title>
      </Helmet>

      <div className="px-2 py-2 md:py-4 h-full">
        <div className="flex flex-col gap-y-4 h-full">
          <CreatePost />
          {!useIsPostLoading ? (
            <div className="flex flex-col gap-y-4">
              {fetchedPosts.map((post: any, index: number) => {
                if (post.postType === "post")
                  return (
                    <PostType key={`postType-${index}`} postObject={post} />
                  );
                return null;
              })}
            </div>
          ) : (
            <PostSkeleton />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
