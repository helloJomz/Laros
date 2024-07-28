import { capitalizeFirstLetter, formatDateDistanceToNow } from "@/utils/utils";
import { MdVerified } from "react-icons/md";
import { useNavbarContext } from "@/context/NavbarContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Heart, LoaderCircle } from "lucide-react";
import WriteReply from "./WriteReply";
import Replies from "./Replies";
import React from "react";
import { usePost } from "@/hooks/usePost";
import { useNavigate } from "react-router-dom";
import { useLoadMoreCommentMutation } from "@/app/features/post/postApiSlice";
import { useDispatch } from "react-redux";
import { useGetCommentsQuery } from "@/app/features/post/postApiSlice";
// import { setPreviewComment } from "@/app/features/post/postSlice";

const PostComment = ({ postId }: { postId: any }) => {
  const navigate = useNavigate();

  const { windowWidth } = useNavbarContext();

  const [skipLimit, setSkipLimit] = useState<{ skip: number; limit: number }>({
    skip: 0,
    limit: 5,
  });

  useGetCommentsQuery(
    {
      postId,
      ...skipLimit,
    },
    { refetchOnMountOrArgChange: true }
  );

  const { ui, commentStates, loadingStates } = usePost();

  const { useComment } = commentStates;
  const { useIsCommentLoading, useIsCommentError } = loadingStates;

  const isRendered = !useIsCommentLoading && !useIsCommentError;

  const filteredCommentByPostId = isRendered
    ? useComment.filter((comment: any) => comment.postId === postId)
    : [];

  const { setReplyId, replyid } = ui;

  const [lengthOfComments, setLengthOfReplies] = useState<number>(1);

  const isVerified: boolean = true;

  const textLengthForExpand: number = windowWidth > 768 ? 400 : 100;

  const [expandComment, setExpandComment] = useState<string | null>(null);

  const handleLoadMoreComment = async () => {
    // const { data, error } = await loadMoreComment({
    //   postId: postId,
    //   ...skipLimit,
    // });
    // if (!error) {
    //   // dispatch(
    //   //   setPreviewComment({
    //   //     postId: postId,
    //   //     commentData: data,
    //   //   })
    //   // );
    //   setLengthOfReplies((number) => number - 5);
    //   setSkipLimit((prevObj) => ({
    //     skip: prevObj?.skip + 5,
    //     limit: prevObj?.limit + 5,
    //   }));
    // }
  };

  if (useIsCommentLoading) return <span>Loading....</span>;

  if (useIsCommentError) return <span>Error...</span>;

  // Initial
  return (
    <>
      <div className="pt-0.5 md:pt-1 pb-2 flex flex-col px-2  gap-y-2 md:gap-y-4 w-full max-h-72 md:max-h-[26rem] overflow-y-auto">
        {filteredCommentByPostId.map((comment: any, index: number) => (
          <React.Fragment key={`${index}-${comment._id}`}>
            <div>
              <div className="rounded-lg flex gap-x-1 gap-y-2 w-full">
                <div className="grid grid-cols-[2rem_3fr] gap-x-1 w-full ">
                  <div className="flex items-center flex-col gap-y-1.5 text-muted-foreground">
                    <img
                      src={comment.userId.imgURL}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover hover:brightness-150 cursor-pointer"
                      onClick={() => navigate(`/${comment.userId.displayname}`)}
                    />

                    {/* {comment.reply.length > 0 && (
                      <div className="bg-slate-600 w-0.5 flex-grow" />
                    )} */}
                  </div>

                  <div className="flex flex-col w-full gap-y-8">
                    <div className="w-full">
                      <div className="flex flex-col gap-y-1.5">
                        <div className="flex gap-x-1 items-center text-xs md:text-sm">
                          <Link
                            to={`/${comment.userId.displayname}`}
                            className=" font-semibold hover:underline"
                          >
                            <span>
                              {capitalizeFirstLetter(
                                comment.userId.displayname
                              )}
                            </span>
                          </Link>

                          {isVerified && (
                            <MdVerified className=" text-sky-400" />
                          )}
                        </div>

                        <div className="bg-gradient-to-r from-slate-500 to-slate-600 rounded-lg p-2 text-xs w-fit md:max-w-[85%] md:text-sm break-all px-2">
                          <div className="space-x-1 w-full">
                            <span>
                              {!expandComment && comment.content.length > 100
                                ? comment.content.slice(0, textLengthForExpand)
                                : comment.content}
                            </span>
                            {comment.content.length > textLengthForExpand && (
                              <span
                                className="text-sky-400 hover:underline cursor-pointer"
                                onClick={() =>
                                  setExpandComment((prevId) =>
                                    prevId === comment._id ? null : comment._id
                                  )
                                }
                              >
                                {!expandComment ? "See more..." : "See less..."}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-x-4 items-center mt-0.5 text-muted-foreground">
                        <span className="text-[0.7rem]">
                          {formatDateDistanceToNow(comment.createdAt)}
                        </span>
                        {/* Reply Button */}
                        <div
                          className="cursor-pointer hover:underline text-xs"
                          onClick={() => setReplyId(comment._id)}
                        >
                          <span>Reply</span>
                        </div>

                        <div className="flex gap-x-0.5 text-xs items-center hover:text-red-300 cursor-pointer">
                          <span>1</span>
                          <Heart size={13} className="mt-[0.1rem]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Replies commentId={comment._id} />

              {replyid === comment._id && (
                <WriteReply
                  commentObject={{
                    postId: postId,
                    commentId: comment._id,
                    commenterDisplayname: comment.userId.displayname,
                    commenterUID: comment.userId,
                  }}
                />
              )}
            </div>
          </React.Fragment>
        ))}

        {lengthOfComments > 3 && (
          <div
            className=" text-slate-200 ps-1 pt-1 hover:underline cursor-pointer hover:text-muted-foreground w-fit text-xs md:text-sm flex gap-x-2 items-center"
            onClick={handleLoadMoreComment}
          >
            {useIsCommentLoading && (
              <LoaderCircle className="animate-spin" size={12} />
            )}
            <span>{`View ${lengthOfComments - 3} more  comments`}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default PostComment;
