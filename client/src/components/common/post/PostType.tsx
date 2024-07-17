import { useProfile } from "@/hooks/useProfile";
import { capitalizeFirstLetter } from "@/utils/utils";
import { Link } from "react-router-dom";
import PostReaction from "./PostReaction";
import PostComment from "./PostComment";
import WriteComment from "./WriteComment";

type PostTypeProps = {
  postId: string;
  content?: string;
  postImgURL?: string;
  createDate: string;
  comments: any[];
};

const PostType = ({
  content,
  postImgURL,
  createDate,
  postId,
  comments,
}: PostTypeProps) => {
  const { userObject } = useProfile();
  const { imgURL, displayname } = userObject || {};

  return (
    <>
      <div className="bg-secondary rounded">
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

              <span className="text-muted-foreground text-xs">
                {capitalizeFirstLetter(createDate)}
              </span>
            </div>
          </div>

          {content && postImgURL && (
            <>
              <div className="flex flex-col gap-y-2">
                <span>{content}</span>
                <img src={postImgURL} alt={postImgURL} className="rounded" />
              </div>
            </>
          )}

          {content && !postImgURL && (
            <div className="bg-pink-500 w-full rounded h-72 p-2">{content}</div>
          )}

          {!content && postImgURL && (
            <img src={postImgURL} alt={postImgURL} className="rounded" />
          )}
        </div>
        <PostReaction postId={postId} />
        <PostComment postId={postId} comments={comments} />
        <WriteComment postId={postId} />
      </div>
    </>
  );
};

export default PostType;
