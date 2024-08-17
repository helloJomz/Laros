import { capitalizeFirstLetter, formatDateDistanceToNow } from "@/utils/utils";
import { ChevronDown, ChevronUp, Heart, LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectReplies,
  setReply,
  setReplyHide,
  setReplyLikeCount,
} from "@/app/features/post/postSlice";
import {
  useLoadMoreReplyMutation,
  useIncrementReplyLikeCountMutation,
  useDecrementReplyLikeCountMutation,
} from "@/app/features/post/postApiSlice";
import { useUserContext } from "@/context/UserContext";
import { RootState } from "@/app/store";
import { usePost } from "@/hooks/usePost";

const Replies = ({
  commentId,
  replyCount,
}: {
  commentId: string;
  replyCount: number;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authenticatedUserObject } = useUserContext();
  const { userid } = authenticatedUserObject;

  const replies = useSelector((state: RootState) =>
    selectReplies(state, commentId)
  );

  const { ui } = usePost();
  const { setReplyId } = ui;

  const [lengthOfReplies, setLengthOfReplies] = useState<number>(1);

  const [skip, setSkip] = useState<number>(0);

  const [loadMoreReply, { isLoading, isError }] = useLoadMoreReplyMutation();

  const [incrementReplyLikeCount] = useIncrementReplyLikeCountMutation();
  const [decrementReplyLikeCount] = useDecrementReplyLikeCountMutation();

  const handleLoadMoreReply = async () => {
    setReplyId(null);

    const { data, error } = await loadMoreReply({
      userId: userid,
      commentId: commentId,
      limit: 5,
      skip: skip,
    });

    if (!error) {
      dispatch(
        setReply({ commentId: commentId, replyData: !isLoading && data })
      );

      setSkip((prevSkip) => prevSkip + 5);
    }
  };

  const handleHideReply = (commentId: string) => {
    setReplyId(null);
    dispatch(setReplyHide({ commentId: commentId, skipCount: skip }));
    setSkip(0);
  };

  const handleToggleReplyLike = async (replyId: string, isLiked: boolean) => {
    let error: any = null;

    if (!isLiked) {
      const { error: errorResult } = await incrementReplyLikeCount({
        commentId: commentId,
        replyId: replyId,
        userId: userid,
      });

      error = errorResult;
    } else {
      const { error: errorResult } = await decrementReplyLikeCount({
        commentId: commentId,
        replyId: replyId,
        userId: userid,
      });

      error = errorResult;
    }

    if (!error) {
      dispatch(
        setReplyLikeCount({
          commentId: commentId,
          replyId: replyId,
          opt: isLiked,
        })
      );
    }
  };

  if (isError) return <span>Error...</span>;

  return (
    <>
      <div className="flex flex-col pt-2 text-xs md:text-sm ms-12 ">
        {replies?.map((reply: any, index: number) => (
          <React.Fragment key={`${index}-${reply._id}`}>
            <div className="grid grid-cols-[2rem_3fr] gap-x-1 max-w-[90%] ">
              <div className="flex gap-x-2">
                <img
                  src={reply.userId.imgURL}
                  alt=""
                  className="h-6 w-6 rounded-full object-cover hover:brightness-150 cursor-pointer"
                  onClick={() => navigate(`/${reply.userId.displayname}`)}
                />
              </div>

              <div className="flex flex-col gap-y-1">
                <Link
                  to={`/${reply.userId.displayname}`}
                  className="font-semibold hover:underline w-fit"
                >
                  <span>
                    {capitalizeFirstLetter(reply.userId.displayname || "Anon")}
                  </span>
                </Link>

                <div className="bg-gradient-to-r from-slate-500 to-slate-600 rounded-lg py-2 ps-2 pe-3 w-fit md:text-sm flex flex-col">
                  <span className="break-all">{reply.content}</span>
                </div>

                <div className="grid grid-flow-col grid-cols-[4rem_4rem] items-center text-muted-foreground pb-2">
                  <span className="text-[0.7rem]">
                    {formatDateDistanceToNow(reply.createdAt)}
                  </span>

                  <div
                    className="flex gap-x-0.5 text-xs items-center hover:text-[#FE2C55] cursor-pointer ms-1"
                    onClick={() =>
                      handleToggleReplyLike(reply._id, reply.isLiked)
                    }
                  >
                    <span>{reply.likeCount > 0 ? reply.likeCount : ""}</span>
                    <Heart
                      className="mt-0.5"
                      fill={reply.isLiked ? "#FE2C55" : "none"}
                      strokeWidth={reply.isLiked ? 0 : undefined}
                      size={14}
                    />
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="flex gap-x-2 text-slate-200 text-xs items-center ms-12 -mt-1 ">
        {replyCount > 0 && (
          <div
            className="flex items-center gap-x-0.5 hover:underline cursor-pointer w-fit"
            onClick={handleLoadMoreReply}
          >
            {isLoading && <LoaderCircle className="animate-spin" size={12} />}

            <span>{`View ${replyCount} ${
              replyCount > 1 ? "replies" : "reply"
            }`}</span>
            <ChevronDown size={13} className="mt-1" />
          </div>
        )}

        {replies && replies.length > 0 && (
          <div
            className="flex gap-x-0.5 hover:underline cursor-pointer "
            onClick={() => handleHideReply(commentId)}
          >
            <span>Hide</span>
            <ChevronUp size={13} className="mt-1" />
          </div>
        )}
      </div>
    </>
  );
};

export default Replies;
