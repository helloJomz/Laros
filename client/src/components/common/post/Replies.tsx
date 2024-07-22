import { cn } from "@/lib/utils";
import { capitalizeFirstLetter, formatDateDistanceToNow } from "@/utils/utils";
import { Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Replies = ({
  replyObject,
  openInput,
}: {
  replyObject: any[];
  openInput: boolean;
}) => {
  const modifiedRepliesObject = replyObject.slice().reverse();

  return (
    <>
      <div className="flex flex-col  text-xs md:text-sm ">
        {modifiedRepliesObject.map((reply: any, index: number) => (
          <React.Fragment key={reply._id}>
            <div className="grid grid-cols-[2rem_3fr] gap-x-2 w-full ">
              <div className="flex flex-col items-center relative">
                <div className="absolute p-2 -right-[0.05rem] top-3 border-slate-600 border-l-2 border-b-2 rounded-bl-sm" />
                <div
                  className={cn("border-l-2 h-full border-slate-600", {
                    "h-[18%]":
                      index === modifiedRepliesObject.length - 1 && !openInput,
                  })}
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
                        <span>{capitalizeFirstLetter(reply.displayname)}</span>
                      </Link>

                      <div className="w-full">
                        <span className="w-full break-all">
                          {reply.content}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-x-4 items-center mt-0.5 text-muted-foreground pb-2">
                    <span className="text-[0.7rem]">
                      {formatDateDistanceToNow(reply.createdAt)}
                    </span>

                    {/* Reply Button */}
                    <div
                      className="cursor-pointer hover:underline text-xs"
                      //   onClick={() =>
                      //     setReplyCommentId((prevId: string) =>
                      //       prevId === comment._id ? "" : comment._id
                      //     )
                      //   }
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
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Replies;
