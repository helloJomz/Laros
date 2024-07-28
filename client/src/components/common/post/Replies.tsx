import { useLoadMoreReplyMutation } from "@/app/features/post/postApiSlice";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter, formatDateDistanceToNow } from "@/utils/utils";
import { ChevronDown, Heart, LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { setPreviewReply } from "@/app/features/post/postSlice";
import { useGetParentRepliesQuery } from "@/app/features/post/postApiSlice";
import { useSelector } from "react-redux";
import { selectParentReply } from "@/app/features/post/postSlice";
import { usePost } from "@/hooks/usePost";

const Replies = ({ commentId }: { commentId: string }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loadingStates } = usePost();
  const { useIsParentReplyLoading, useIsParentReplyError } = loadingStates;
  const isRendered = !useIsParentReplyError && !useIsParentReplyLoading;

  const [lengthOfReplies, setLengthOfReplies] = useState<number>(1);

  const [skipLimit, setSkipLimit] = useState<{
    skip: number;
    limit: number;
  }>({ skip: 0, limit: 1 });

  useGetParentRepliesQuery(
    {
      commentId: commentId,
      ...skipLimit,
    },
    { skip: !commentId }
  );

  const parentReplies = useSelector(selectParentReply);
  const parentRepliesObject = isRendered ? parentReplies : [];

  const isLoading = false;

  // const [loadMoreReply, { isLoading }] = useLoadMoreReplyMutation();

  const handleLoadMore = async () => {
    // const { data, error } = await loadMoreReply({
    //   postId: postId,
    //   commentId: commentId,
    //   ...skipLimit,
    // });
    // if (!error) {
    //   setLengthOfReplies(lengthOfReplies - 5);
    //   // dispatch(
    //   //   setPreviewReply({
    //   //     postId: postId,
    //   //     commentId: commentId,
    //   //     replyData: data[0].replies,
    //   //   })
    //   // );
    //   setSkipLimit((prevObj) => ({
    //     limit: prevObj?.limit + 5,
    //     skip: prevObj?.skip + 5,
    //   }));
    // }
  };

  return (
    <>
      <div className="flex flex-col pt-2 text-xs md:text-sm">
        {parentRepliesObject.map((reply: any, index: number) => (
          <React.Fragment key={`${index}-${reply._id}`}>
            <div className="grid grid-cols-[2rem_3fr] gap-x-2 w-full ">
              <div className="flex flex-col items-center relative">
                <div className="absolute p-2 -right-[0.05rem] top-3 border-slate-600 border-l-2 border-b-2 rounded-bl-sm" />

                <div
                  className={cn(
                    "border-l-2 h-full border-slate-600 -mt-[0.5rem]",
                    {
                      "h-[30%]":
                        parentRepliesObject.length - 1 === index &&
                        lengthOfReplies <= 0,
                    }
                  )}
                />
              </div>

              {reply.commentId === commentId && (
                <div className="pt-1 flex gap-x-2 relative">
                  <img
                    src={reply.userId.imgURL}
                    alt=""
                    className="h-6 w-6 rounded-full object-cover mt-3 hover:brightness-150 cursor-pointer"
                    onClick={() => navigate(`/${reply.userId.displayname}`)}
                  />

                  <div className="flex flex-col">
                    <div className="bg-gradient-to-r from-slate-500 to-slate-600 rounded-lg pt-1 pb-2 ps-2 pe-3 md:min-w-32 md:max-w-[26rem] md:text-sm flex flex-col">
                      <div className="flex flex-col gap-y-0.5">
                        <Link
                          to={`/${reply.userId.displayname}`}
                          className="font-semibold hover:underline"
                        >
                          <span>
                            {capitalizeFirstLetter(
                              reply.userId.displayname || "laros"
                            )}
                          </span>
                        </Link>

                        <div className="w-full">
                          <span className="w-full break-all">
                            {reply.content}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex  gap-x-6 items-center mt-0.5 text-muted-foreground pb-2">
                      <span className="text-[0.7rem]">
                        {formatDateDistanceToNow(reply.createdAt)}
                      </span>

                      <div className="flex gap-x-0.5 text-xs items-center hover:text-red-300 cursor-pointer">
                        <span>1</span>
                        <Heart size={13} className="mt-[0.1rem]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        ))}

        {!Number.isNaN(lengthOfReplies) && lengthOfReplies > 0 && (
          <div className="text-xs text-muted-foreground hover:text-slate-200 grid grid-cols-[2rem_3fr]">
            <div className="flex justify-center relative">
              <div className="border-l-2 h-full border-slate-600 -mt-[0.8rem]" />
              <div className="absolute p-2 -right-[0.05rem] -top-[0.4rem] border-slate-600 border-l-2 border-b-2 rounded-bl-sm" />
            </div>

            <div
              className="flex gap-x-1 items-center ps-2 cursor-pointer w-fit"
              onClick={handleLoadMore}
            >
              {isLoading && (
                <LoaderCircle size={16} className="mt-0.5 animate-spin" />
              )}

              <span>{`Load ${lengthOfReplies} more ${
                lengthOfReplies - 1 > 1 ? "replies" : "reply"
              }`}</span>

              <ChevronDown size={16} className="mt-0.5" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Replies;
