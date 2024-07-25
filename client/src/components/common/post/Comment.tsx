import PostReaction from "./PostReaction";
import PostComment from "./PostComment";
import WriteComment from "./WriteComment";
import { useGetCommentsQuery } from "@/app/features/post/postApiSlice";

const Comment = ({ postId }: { postId: string }) => {
  return <>{/* <WriteComment postId={postId} /> */}</>;
};

export default Comment;
