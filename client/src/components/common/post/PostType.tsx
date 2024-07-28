import { useProfile } from "@/hooks/useProfile";
import { capitalizeFirstLetter, formatDateForPostHeader } from "@/utils/utils";
import { Link } from "react-router-dom";
import PostReaction from "./PostReaction";
import PostComment from "./PostComment";
import WriteComment from "./WriteComment";
import { MdVerified } from "react-icons/md";
import { useNavbarContext } from "@/context/NavbarContext";
import { useEffect, useState } from "react";
import PostReactionCount from "./PostReactionCount";

interface PostObject {
  _id: string;
  userid: string;
  postType: string;
  content?: string;
  postImgURL?: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  userLiked: boolean;
  shareCount: number;
  commentCount: number;
}

const PostType = ({ postObject }: { postObject: PostObject }) => {
  const { userObject } = useProfile();
  const { imgURL, displayname } = userObject || {};
  const { windowWidth } = useNavbarContext();

  const { content, postImgURL, createdAt } = postObject;

  const isVerified: boolean = true;

  return (
    <>
      <div className="bg-secondary rounded w-full">
        <div className="w-full bg-secondary h-fit flex flex-col gap-y-4 rounded">
          <div className="flex justify-between px-4 pt-4 pb-2">
            <div className="flex gap-x-2 items-center">
              <img
                src={imgURL!}
                alt={`${displayname}_photo`}
                className="w-10 h-10 rounded-full object-cover pointer-events-none"
              />
              <div className="flex flex-col">
                <div className="flex gap-x-1 items-center text-sm md:text-base">
                  <Link to={`/${displayname}`}>
                    <span className="font-semibold hover:underline">
                      {displayname && capitalizeFirstLetter(displayname)}
                    </span>
                  </Link>
                  {isVerified && <MdVerified className=" text-sky-400" />}
                </div>

                <span className="text-muted-foreground text-xs">
                  {formatDateForPostHeader(createdAt)}
                </span>
              </div>
            </div>

            <div className="flex items-center text-xs">
              <div className="flex items-center gap-x-1 text-muted-foreground hover:underline cursor-pointer">
                <img
                  src={
                    "https://i.pinimg.com/736x/d1/b1/1d/d1b11d5e4dbae547ac0d651476cec488.jpg"
                  }
                  alt=""
                  className="w-8 h-8  md:w-5 md:h-5 rounded-full"
                />
                {windowWidth > 768 && <span>League of Legends</span>}
              </div>
            </div>
          </div>

          {content && postImgURL && (
            <>
              <div className="flex flex-col gap-y-2">
                <span>{content}</span>
                <img src={postImgURL} alt={postImgURL} />
              </div>
            </>
          )}

          {content && !postImgURL && (
            <div className="bg-pink-500 w-full h-72 p-2">{content}</div>
          )}

          {!content && postImgURL && (
            <img src={postImgURL} alt={postImgURL} className="rounded" />
          )}
        </div>

        <PostReactionCount
          count={{
            commentCount: postObject.commentCount,
            likeCount: postObject.likeCount,
            shareCount: postObject.shareCount,
          }}
        />
        <PostReaction
          postId={postObject._id}
          userLiked={postObject.userLiked}
        />
        {/* <PostComment postId={_id} />
        <WriteComment postId={_id} /> */}
      </div>
    </>
  );
};

export default PostType;
