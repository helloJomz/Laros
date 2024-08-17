import { capitalizeFirstLetter, formatDateDistanceToNow } from "@/utils/utils";
import { MdVerified } from "react-icons/md";
import { useNavbarContext } from "@/context/NavbarContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Heart, LoaderCircle, Trash } from "lucide-react";
import WriteReply from "./WriteReply";
import Replies from "./Replies";
import React from "react";
import { usePost } from "@/hooks/usePost";
import { useNavigate } from "react-router-dom";
import {
  useDecrementCommentLikeCountMutation,
  useDeleteCommentMutation,
  useIncrementCommentLikeCountMutation,
} from "@/app/features/post/postApiSlice";
import { useDispatch } from "react-redux";
import { useGetCommentsQuery } from "@/app/features/post/postApiSlice";
import { useUserContext } from "@/context/UserContext";
import {
  setCommentLikeCount,
  setDeleteComment,
} from "@/app/features/post/postSlice";
import { useModal } from "@/hooks/useModal";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";

const PostComment = ({
  postId,
  authorId,
}: {
  postId: string;
  authorId: string;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setModalOpen } = useModal();

  const { authenticatedUserObject } = useUserContext();
  const { userid: userId } = authenticatedUserObject;

  const { profilePageEndpoint } = useProfile();

  const { windowWidth } = useNavbarContext();

  const [skipLimit] = useState<{ skip: number; limit: number }>({
    skip: 0,
    limit: 10,
  });

  useGetCommentsQuery(
    {
      userId,
      postId,
      ...skipLimit,
    },
    { refetchOnMountOrArgChange: true }
  );

  const { ui, commentStates, loadingStates } = usePost();

  const { useComment } = commentStates;

  const { useIsCommentLoading, useIsCommentError } = loadingStates;

  const { setReplyId, replyid } = ui;

  const [lengthOfComments, _setLengthOfReplies] = useState<number>(1);
  const [isCommentHovered, setIsCommentHovered] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(
    null
  );

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

  const [incrementCommentLikeCount] = useIncrementCommentLikeCountMutation();
  const [decrementCommentLikeCount] = useDecrementCommentLikeCountMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const handleToggleLikeCount = async (commentId: string, isLiked: boolean) => {
    let error: any = null;

    if (!isLiked) {
      const { error: errorResult } = await incrementCommentLikeCount({
        postId: postId,
        commentId: commentId,
        userId: userId,
      });

      error = errorResult;
    } else {
      const { error: errorResult } = await decrementCommentLikeCount({
        postId: postId,
        commentId: commentId,
        userId: userId,
      });

      error = errorResult;
    }

    if (!error) {
      dispatch(setCommentLikeCount({ commentId, opt: isLiked }));
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const { error } = await deleteComment({
      uid: userId,
      commentId: commentId,
      postId: postId,
    });
    if (!error) {
      dispatch(setDeleteComment({ postId: postId, commentId: commentId }));
    }
  };

  if (useIsCommentLoading)
    return (
      <>
        <div className="flex-1 pt-0.5 md:pt-2 px-2">
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-x-2">
                <Skeleton className="bg-slate-600 w-8 h-8 rounded-full" />
                <Skeleton className="bg-slate-600 w-1/2 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </>
    );

  if (useIsCommentError) return <span>Error...</span>;

  if (useComment.length === 0) return null;

  return (
    <>
      <div className="pt-0.5 md:pt-1 flex flex-col px-1 gap-y-2 md:gap-y-4 w-full h-fit">
        {useComment.map((comment: any, index: number) => (
          <React.Fragment key={`${index}-${comment._id}`}>
            <div>
              <div className="rounded-lg flex gap-x-1 gap-y-2 w-full overflow-y-auto">
                <div className="grid grid-cols-[3rem_3fr] gap-x-1 w-full ">
                  <div className="flex items-center flex-col gap-y-1.5 text-muted-foreground">
                    <img
                      src={comment.user.imgURL}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover hover:brightness-150 cursor-pointer"
                      onClick={() => navigate(`/${comment.user.displayname}`)}
                    />
                  </div>

                  <div className="flex flex-col w-full gap-y-8">
                    <div className="w-full">
                      <div className="flex flex-col gap-y-1.5">
                        <div className="flex gap-x-1 items-center text-xs md:text-sm">
                          <Link
                            to={`/${comment.user.displayname}`}
                            onClick={() => {
                              if (
                                profilePageEndpoint !== comment.user.displayname
                              ) {
                                setModalOpen(null);
                              }
                            }}
                            className=" font-semibold hover:underline"
                          >
                            <span>
                              {capitalizeFirstLetter(comment.user.displayname)}
                            </span>
                          </Link>

                          {isVerified && (
                            <MdVerified className=" text-sky-400" />
                          )}
                        </div>

                        {deleteConfirmation !== comment._id ? (
                          <div
                            className="flex gap-x-1 items-center"
                            onMouseEnter={() =>
                              setIsCommentHovered(comment._id)
                            }
                            onMouseLeave={() => setIsCommentHovered(null)}
                          >
                            <div className="bg-gradient-to-r from-slate-500 to-slate-600 rounded-lg p-2 text-xs w-fit md:max-w-[85%] md:text-sm break-all px-2">
                              <div className="space-x-1 w-full">
                                <span>
                                  {!expandComment &&
                                  comment.content.length > 100
                                    ? comment.content.slice(
                                        0,
                                        textLengthForExpand
                                      )
                                    : comment.content}
                                </span>
                                {comment.content.length >
                                  textLengthForExpand && (
                                  <span
                                    className="text-sky-400 hover:underline cursor-pointer"
                                    onClick={() =>
                                      setExpandComment((prevId) =>
                                        prevId === comment._id
                                          ? null
                                          : comment._id
                                      )
                                    }
                                  >
                                    {!expandComment
                                      ? "See more..."
                                      : "See less..."}
                                  </span>
                                )}
                              </div>
                            </div>
                            {(userId === comment.user._id ||
                              authorId === userId) &&
                              (isCommentHovered === comment._id ||
                                windowWidth <= 768) && (
                                <div
                                  className="text-muted-foreground p-1.5 rounded-full hover:bg-opacity-10 hover:bg-slate-200 cursor-pointer"
                                  onClick={() =>
                                    setDeleteConfirmation(comment._id)
                                  }
                                >
                                  <Trash size={14} />
                                </div>
                              )}
                          </div>
                        ) : (
                          <div className="flex flex-col gap-y-1 bg-gradient-to-r from-slate-500 to-slate-600 w-fit p-2 rounded-lg">
                            <span className="text-sm">
                              Confirm to delete this comment?
                            </span>
                            <div className="flex gap-x-1 ">
                              <Button
                                variant={"destructive"}
                                className="text-xs px-2 h-8 rounded"
                                onClick={() => handleDeleteComment(comment._id)}
                              >
                                Confirm
                              </Button>
                              <Button
                                onClick={() => setDeleteConfirmation(null)}
                                className="text-xs px-2 h-8 bg-white text-black rounded"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-flow-col grid-cols-[2rem_4rem_4rem] items-center mt-0.5 text-muted-foreground">
                        <span className="text-[0.7rem]">
                          {formatDateDistanceToNow(comment.createdAt)}
                        </span>
                        {/* Reply Button */}
                        <div
                          className="cursor-pointer hover:underline text-xs"
                          onClick={() => {
                            if (!userId) {
                              return;
                            }
                            setReplyId(comment._id);
                          }}
                        >
                          <span>Reply</span>
                        </div>

                        <div
                          className="flex gap-x-0.5 items-center hover:text-[#FE2C55] cursor-pointer ms-1"
                          onClick={() =>
                            handleToggleLikeCount(comment._id, comment.isLiked)
                          }
                        >
                          {comment.likeCount > 0 && (
                            <span
                              className={`text-xs ${
                                comment.isLiked ? "font-semibold" : ""
                              }`}
                            >
                              {comment.likeCount}
                            </span>
                          )}

                          <Heart
                            className="mt-0.5"
                            fill={comment.isLiked ? "#FE2C55" : "none"}
                            strokeWidth={comment.isLiked ? 0 : undefined}
                            size={14}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Replies
                commentId={comment._id}
                replyCount={comment.replyCount}
              />

              {replyid === comment._id && (
                <WriteReply
                  commentObject={{
                    postId: postId,
                    commentId: comment._id,
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
