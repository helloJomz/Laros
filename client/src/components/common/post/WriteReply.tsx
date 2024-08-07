import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/utils/utils";
import { SendHorizontal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useAddReplyMutation } from "@/app/features/post/postApiSlice";
import { useUserContext } from "@/context/UserContext";
import { useDispatch } from "react-redux";
import { setReply } from "@/app/features/post/postSlice";

const WriteReply = ({ commentObject }: { commentObject: any }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [replyContent, setReplyContent] = useState<string>("");

  const { authenticatedUserObject } = useUserContext();

  const { userid: senderUserId, imgURL: senderImgURL } =
    authenticatedUserObject;

  const { commentId, commenterDisplayname } = commentObject;

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
      userId: senderUserId,
      commentId: commentId,
      replyData: replyContent.trim().replace(/[\r\n]+/g, " "),
    });

    if (!error) {
      dispatch(
        setReply({
          commentId: commentId,
          replyData: data,
        })
      );

      setReplyContent("");
    }
  };

  //FIXME: Laros is the one displaying
  const TextAreaPlaceholder = `Replying to ${capitalizeFirstLetter(
    commenterDisplayname || "Laros"
  )}`;

  return (
    <>
      <div className="mt-2 w-[95%] ps-10">
        <div className="relative">
          <div className="flex gap-x-2">
            <img
              src={senderImgURL}
              alt=""
              className="h-6 w-6 rounded-full object-cover"
            />
            <div className="bg-slate-600 rounded-lg p-1 h-auto w-full">
              <Textarea
                ref={textareaRef}
                placeholder={TextAreaPlaceholder}
                value={replyContent}
                onKeyUp={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleReplySubmit();
                  }
                }}
                className="w-[90%] h-full bg-red-500 p-2 border bg-transparent border-none  ounded resize-none text-xs md:text-sm overflow-hidden"
                onChange={(e) => setReplyContent(e.target.value)}
              />
            </div>
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
