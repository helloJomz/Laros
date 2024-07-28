import { RootState } from "@/app/store";
import { useModal } from "@/hooks/useModal";
import { selectSinglePost } from "@/app/features/post/postSlice";
import { useSelector } from "react-redux";
import PostType from "../post/PostType";
import { Button } from "@/components/ui/button";

const MaxViewPost = () => {
  const { usehelper } = useModal();
  const postId = usehelper;

  const selectedPost = useSelector((state: RootState) =>
    selectSinglePost(state, postId)
  );

  // EDIT THE WIDTH //TODO: RENDER A COMMENT COMPONENT HERE
  if (selectedPost?.postType === "post")
    return (
      <>
        <div className="w-[90%] md:w-[30%]">
          <PostType postObject={selectedPost!} />
        </div>
      </>
    );

  return null;
};

export default MaxViewPost;
