import { cn } from "@/lib/utils";
import React from "react";
import { FaFire } from "react-icons/fa";

const PostReactionCount = ({
  count,
}: {
  count: { likeCount: number; shareCount: number; commentCount: number };
}) => {
  const { commentCount, likeCount, shareCount } = count;

  if (commentCount === 0 && likeCount === 0 && shareCount === 0)
    return <div className="py-2" />;

  return (
    <>
      <div
        className={cn(
          "text-muted-foreground flex justify-between text-sm px-4 items-center py-2",
          {
            "justify-end": likeCount === 0,
          }
        )}
      >
        {likeCount > 0 && (
          <div className="hover:underline cursor-pointer hover:text-slate-200 flex  -space-x-[0.4rem] items-center">
            <FaFire className="text-orange-600" size={16} />
            <div className="rounded-tl-lg rounded-bl-lg w-10 bg-secondary h-4  text-[0.6rem] mt-1 text-white  flex flex-col justify-center text-start ps-1.5 pb-[0.1rem]">
              <span className="font-semibold">{likeCount}</span>
            </div>
          </div>
        )}

        <div className="flex gap-x-2 text-xs md:text-sm">
          {commentCount > 0 && (
            <div className="hover:underline cursor-pointer hover:text-slate-200">
              <span>{`${commentCount} comment${
                commentCount > 1 ? "s" : ""
              }`}</span>
            </div>
          )}

          {shareCount > 0 && (
            <div className="hover:underline cursor-pointer hover:text-slate-200">
              <span>{`${shareCount} comment${shareCount > 1 ? "s" : ""}`}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostReactionCount;
