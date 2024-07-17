import { capitalizeFirstLetter, formatDateDistanceToNow } from "@/utils/utils";
import { MdExpandMore } from "react-icons/md";
import { useNavbarContext } from "@/context/NavbarContext";
import { useSelector } from "react-redux";

const PostComment = ({
  postId,
  comments,
}: {
  postId: string;
  comments: any[];
}) => {
  const { windowWidth } = useNavbarContext();

  const startIdx =
    windowWidth <= 768
      ? Math.max(comments.length - 1, 0)
      : Math.max(comments.length - 3, 0);
  const endIdx = comments.length;

  // Initial
  return (
    <>
      <div className="pt-0.5 md:pt-1 pb-2 flex flex-col gap-y-2">
        {comments
          .slice(startIdx, endIdx)
          .reverse()
          .map((comment: any) => (
            <div className="rounded-lg flex gap-x-1 px-2" key={comment._id}>
              <div className="flex gap-x-2">
                <img
                  src={comment.imgURL}
                  alt=""
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div className="flex flex-col gap-y-1 max-w-full md:max-w-[20rem] break-all">
                  <span className="text-xs font-semibold">
                    {capitalizeFirstLetter(comment.displayname)}
                  </span>
                  <div className="bg-slate-600 rounded-lg px-2 py-1 text-sm">
                    <span>{comment.comment}</span>
                  </div>
                  <div className="flex gap-x-1 text-muted-foreground text-xs">
                    <span>{formatDateDistanceToNow(comment.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {windowWidth > 768
        ? comments.length > 3 && (
            <div
              className="text-xs md:text-sm px-2 flex gap-x-1 items-center text-slate-200 hover:underline cursor-pointer"
              onClick={() => console.log(postId)}
            >
              <MdExpandMore className="mt-0.5" />
              <span>See all comments</span>
            </div>
          )
        : comments.length > 1 && (
            <div
              className="text-xs md:text-sm px-2 flex gap-x-1 items-center text-slate-200 hover:underline cursor-pointer"
              onClick={() => console.log(postId)}
            >
              <MdExpandMore className="mt-0.5" />
              <span>See all comments</span>
            </div>
          )}
    </>
  );
};

export default PostComment;
