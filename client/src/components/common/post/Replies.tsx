import { useLoadMoreReplyMutation } from "@/app/features/post/postApiSlice";
import { setReplyId } from "@/app/features/post/uiSlice";
import { usePost } from "@/hooks/usePost";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter, formatDateDistanceToNow } from "@/utils/utils";
import { Heart, LoaderCircle, Minus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPreviewReply } from "@/app/features/post/postSlice";

const Replies = ({
  replyObject,
  openInput,
  replyLength,
  id,
}: {
  replyObject: any[];
  openInput: boolean;
  replyLength: any;
  id: { postId: string; commentId: string };
}) => {
  const dispatch = useDispatch();

  const { ui } = usePost();
  const { setReplyId } = ui;

  const { commentId, postId } = id;

  const [lengthOfReplies, setLengthOfReplies] = useState<number>(
    replyLength - 1
  );

  const [skipLimit, setSkipLimit] = useState<{
    skip: number;
    limit: number;
  }>({ skip: 1, limit: 5 });

  const [loadMoreReply, { isLoading }] = useLoadMoreReplyMutation();

  const handleLoadMore = async () => {
    setReplyId(null);

    const { data, error } = await loadMoreReply({
      postId: postId,
      commentId: commentId,
      ...skipLimit,
    });

    if (!error) {
      setLengthOfReplies(lengthOfReplies - 5);

      dispatch(
        setPreviewReply({
          postId: postId,
          commentId: commentId,
          replyData: data[0].replies,
        })
      );

      setSkipLimit((prevObj) => ({
        limit: prevObj?.limit + 5,
        skip: prevObj?.skip + 5,
      }));
    }
  };

  console.log(lengthOfReplies);

  return (
    <>
      <div className="flex flex-col pt-2 text-xs md:text-sm">
        {replyObject.map((reply: any, index: number) => (
          <React.Fragment key={`${index}-${reply._id}`}>
            <div className="grid grid-cols-[2rem_3fr] gap-x-2 w-full ">
              <div className="flex flex-col items-center relative">
                <div className="absolute p-2 -right-[0.05rem] top-3 border-slate-600 border-l-2 border-b-2 rounded-bl-sm" />
                <div
                  className={cn(
                    "border-l-2 h-full border-slate-600 -mt-[0.5rem]",
                    {
                      "h-[30%]": index === replyObject.length - 1 && !openInput,
                    }
                  )}
                />
              </div>

              <div className="pt-1 flex gap-x-2 relative">
                <img
                  src={reply.imgURL}
                  alt=""
                  className="h-6 w-6 rounded-full object-cover mt-3"
                />

                <div className="flex flex-col">
                  <div className="bg-slate-600 rounded-lg pt-1 pb-2 ps-2 pe-3 md:min-w-32 md:max-w-[26rem] md:text-sm flex flex-col">
                    <div className="flex flex-col gap-y-0.5">
                      <Link
                        to={`/${reply.displayname}`}
                        className="font-semibold hover:underline"
                      >
                        <span>
                          {capitalizeFirstLetter(reply.displayname || "laros")}
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
            </div>
          </React.Fragment>
        ))}

        {!Number.isNaN(lengthOfReplies) && lengthOfReplies > 0 && (
          <div
            className="text-xs cursor-pointer text-muted-foreground hover:text-slate-200 flex gap-x-1 items-center ps-10"
            onClick={handleLoadMore}
          >
            {isLoading ? (
              <LoaderCircle size={16} className="mt-0.5 animate-spin" />
            ) : (
              <Minus size={16} className="mt-0.5" />
            )}

            <span>{`Load ${lengthOfReplies} more ${
              lengthOfReplies - 1 > 1 ? "replies" : "reply"
            }`}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Replies;
