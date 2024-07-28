import { FaComment } from "react-icons/fa6";
import { FaShare } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setLikeCount } from "@/app/features/post/postSlice";
import { useEffect, useState } from "react";
import {
  useDecrementLikeCountMutation,
  useIncrementLikeCountMutation,
} from "@/app/features/post/postApiSlice";
import { useUserContext } from "@/context/UserContext";
import { useModal } from "@/hooks/useModal";

const PostReaction = ({
  postId,
  userLiked,
}: {
  postId: string;
  userLiked: boolean;
}) => {
  const dispatch = useDispatch();

  const { authenticatedUserObject } = useUserContext();
  const { userid } = authenticatedUserObject;

  const { setModalOpen, setHelper } = useModal();

  // State to track if the user has liked the post
  const [isLikeClicked, setIsLikeClicked] = useState(userLiked);

  const [incrementLikeCount] = useIncrementLikeCountMutation();
  const [decrementLikeCount] = useDecrementLikeCountMutation();

  const handleLikeClick = async () => {
    setIsLikeClicked((click) => !click);
    if (isLikeClicked) {
      await decrementLikeCount({ postId, userId: userid });
    } else {
      await incrementLikeCount({ postId, userId: userid });
    }
    dispatch(setLikeCount({ postId, opt: isLikeClicked }));
  };

  const handleCommentClick = () => {
    setHelper(postId);
    setModalOpen("maxviewpost");
  };

  useEffect(() => {
    setIsLikeClicked(userLiked);
  }, [postId, userLiked]);

  const ButtonTypes = [
    {
      Icon: <FaFire className={isLikeClicked ? "text-orange-600" : ""} />,
      onClick: handleLikeClick,
    },
    {
      Icon: <FaComment />,
      onClick: handleCommentClick,
    },
    {
      Icon: <FaShare />,
      onClick: () => {
        console.log("Share");
      },
    },
  ];

  return (
    <>
      <div className="bg-secondary px-2 pb-2 rounded-lg">
        <div className="flex justify-between border-t-[1px] border-b-[1px] border-slate-600 py-1">
          {ButtonTypes.map(({ onClick, Icon }, index) => (
            <div
              key={index}
              className="hover:bg-slate-600 rounded-md w-full flex justify-center p-1.5 cursor-pointer gap-x-2 items-center  text-slate-400"
              onClick={onClick}
            >
              {Icon}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostReaction;
