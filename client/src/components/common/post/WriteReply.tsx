import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/utils/utils";
import { SendHorizontal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useAddReplyMutation } from "@/app/features/post/postApiSlice";
import { useUserContext } from "@/context/UserContext";
import { useDispatch } from "react-redux";
import { setPreviewReply } from "@/app/features/post/postSlice";

const WriteReply = ({
  id,
  isReply,
  commentObject,
}: {
  id: { postId: string; commentId: string };
  isReply: boolean;
  commentObject: any;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [replyContent, setReplyContent] = useState<string>("");
  const { authenticatedUserObject } = useUserContext();

  const {
    displayname: senderDisplayname,
    userid: senderUserId,
    imgURL: senderImgURL,
  } = authenticatedUserObject;
  const { commentId, postId } = id;
  const { displayname, uid } = commentObject;

  const [addReply, { isLoading }] = useAddReplyMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [replyContent]);

  useEffect(() => {
    if (commentId && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [commentId]);

  const handleReplySubmit = async () => {
    if (replyContent.length === 0) {
      return null;
    }

    const { data, error } = await addReply({
      senderObject: { senderUserId, senderDisplayname, senderImgURL },
      authorId: uid,
      commentId: commentId,
      postId: postId,
      replyData: replyContent,
    });

    if (!error) {
      // do the adding here in slice
      dispatch(
        setPreviewReply({
          postId: postId,
          commentId: commentId,
          replyData: { ...data },
        })
      );

      setReplyContent("");
    }
  };

  const TextAreaPlaceholder = `You are replying to ${capitalizeFirstLetter(
    displayname || "Laros"
  )}`;

  if (isReply)
    return (
      <>
        <div className="mt-2 w-[95%] ps-2">
          <div className="relative">
            <div className="bg-slate-600 rounded-lg p-1 h-auto">
              <Textarea
                ref={textareaRef}
                placeholder={TextAreaPlaceholder}
                value={replyContent}
                onKeyUp={(e: React.KeyboardEvent<HTMLTextAreaElement>) =>
                  e.preventDefault()
                }
                className="w-[90%] h-full bg-red-500 p-2 border bg-transparent border-none  ounded resize-none text-xs md:text-sm overflow-hidden"
                onChange={(e) => setReplyContent(e.target.value)}
              />
            </div>

            <Button
              className={cn(
                "absolute bottom-3 right-2 text-muted-foreground p-1 m-0 h-fit w-fit ",
                {
                  "text-white": replyContent.length > 0,
                }
              )}
              variant={"ghost"}
              disabled={replyContent.length === 0 || isLoading}
              onClick={handleReplySubmit}
            >
              <SendHorizontal size={20} />
            </Button>
          </div>
        </div>
      </>
    );
};

export default WriteReply;
