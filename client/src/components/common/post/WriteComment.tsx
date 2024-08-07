import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/UserContext";
import React, { useState } from "react";
import { useAddCommentMutation } from "@/app/features/post/postApiSlice";
import { useDispatch } from "react-redux";
import { setComment } from "@/app/features/post/postSlice";
import { capitalizeFirstLetter } from "@/utils/utils";

const WriteComment = ({ postId }: { postId: string }) => {
  const dispatch = useDispatch();
  const { authenticatedUserObject } = useUserContext();
  const { displayname, imgURL, userid } = authenticatedUserObject;

  const [commentContent, setCommentContent] = useState<string>("");

  const [addComment] = useAddCommentMutation();

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (commentContent.length === 0) {
        return null;
      }

      const commentObject = {
        uid: userid,
        postId: postId,
        comment: commentContent,
      };

      const { data, error } = await addComment(commentObject);

      if (!error) {
        dispatch(setComment({ postId: postId, commentData: data }));
        setCommentContent("");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  return (
    <>
      <div className="px-2 py-2">
        <div className="flex items-center gap-x-2">
          <img
            src={imgURL}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
          <Input
            className="rounded-2xl bg-slate-600 text-xs md:text-sm w-full h-8 md:h-10"
            placeholder={`${capitalizeFirstLetter(
              displayname
            )}, share your thoughts...`}
            onChange={handleChange}
            value={commentContent}
            onKeyUp={handleEnter}
          />
        </div>
      </div>
    </>
  );
};

export default WriteComment;
