import { capitalizeFirstLetter, formatDateDistanceToNow } from "@/utils/utils";
import { MdExpandMore, MdVerified } from "react-icons/md";
import { useNavbarContext } from "@/context/NavbarContext";
import { Link } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import WriteReply from "./WriteReply";
import Replies from "./Replies";
import React from "react";
import { usePost } from "@/hooks/usePost";

const PostComment = ({
  postId,
  comments,
}: {
  postId: string;
  comments: any[];
}) => {
  const { ui } = usePost();
  const { setReplyId, replyid } = ui;
  const { windowWidth } = useNavbarContext();

  const startIdx =
    windowWidth <= 768
      ? Math.max(comments.length - 1, 0)
      : Math.max(comments.length - 3, 0);
  const endIdx = comments.length;

  const modifiedComments = comments.map((comment, index) => ({
    ...comment,
    isFirst: index === 0,
  }));

  const isVerified: boolean = true;

  const [replyCommentId, setReplyCommentId] = useState<string>("");

  const textLengthForExpand: number = windowWidth > 768 ? 400 : 100;

  const [expandComment, setExpandComment] = useState<string | null>(null);

  // Initial
  return (
    <>
      <div className="pt-0.5 md:pt-1 pb-2 flex flex-col px-2  gap-y-2 md:gap-y-4 w-full">
        {modifiedComments
          .slice(startIdx, endIdx)
          .reverse()
          .map((comment: any) => (
            <React.Fragment key={comment._id}>
              <div>
                <div className="rounded-lg flex gap-x-1 gap-y-2 w-full">
                  <div className="grid grid-cols-[2rem_3fr] gap-x-1 w-full ">
                    <div className="flex items-center flex-col gap-y-1.5 text-muted-foreground">
                      <img
                        src={comment.imgURL}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />

                      {comment.reply.length > 0 && (
                        <div className="bg-slate-600 w-0.5 flex-grow" />
                      )}
                    </div>

                    <div className="flex flex-col w-full gap-y-8">
                      <div className="w-full">
                        <div className="flex flex-col gap-y-1.5">
                          <div className="flex gap-x-1 items-center text-xs md:text-sm">
                            <Link
                              to={`/${comment.displayname}`}
                              className=" font-semibold hover:underline"
                            >
                              <span>
                                {capitalizeFirstLetter(comment.displayname)}
                              </span>
                            </Link>

                            {isVerified && (
                              <MdVerified className=" text-sky-400" />
                            )}
                          </div>

                          <div className="bg-gradient-to-r from-slate-500 to-slate-600 rounded-lg p-2 text-xs w-fit md:max-w-[85%] md:text-sm break-all px-2">
                            <div className="space-x-1 w-full">
                              <span>
                                {!expandComment && comment.comment.length > 100
                                  ? comment.comment.slice(
                                      0,
                                      textLengthForExpand
                                    )
                                  : comment.comment}
                              </span>
                              {comment.comment.length > textLengthForExpand && (
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

                <Replies
                  openInput={replyCommentId !== "" ? true : false}
                  replyObject={comment.reply}
                  replyLength={comment.replyLength}
                  id={{ postId: postId, commentId: comment._id }}
                />

                <WriteReply
                  isReply={replyid === comment._id}
                  commentObject={replyid === comment._id ? comment : {}}
                  id={{ postId: postId, commentId: comment._id }}
                />
              </div>
            </React.Fragment>
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
