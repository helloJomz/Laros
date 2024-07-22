import { FaComment } from "react-icons/fa6";
import { FaShare } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";

const PostReaction = ({
  postId,
  commentCount,
}: {
  postId: string;
  commentCount: number;
}) => {
  const ButtonTypes = [
    {
      Icon: <FaFire />,
      Label: "24",
      onClick: () => {
        console.log("like");
      },
    },
    {
      Icon: <FaComment />,
      Label: commentCount.toString(),
      onClick: () => {
        console.log("Comment");
      },
    },
    {
      Icon: <FaShare />,
      Label: "0",
      onClick: () => {
        console.log("Share");
      },
    },
  ];

  return (
    <>
      <div className="bg-secondary px-2 pt-4 pb-2">
        <div className="flex justify-between border-t-[1px] border-b-[1px] border-slate-600 py-1">
          {ButtonTypes.map((button, index) => (
            <div
              key={index}
              className="hover:bg-slate-600 rounded-md w-full flex justify-center p-1.5 cursor-pointer gap-x-2 items-center  text-slate-400"
              onClick={button.onClick}
            >
              {button.Icon}
              {button.Label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostReaction;
