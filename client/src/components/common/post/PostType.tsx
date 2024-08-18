import { capitalizeFirstLetter, formatDateForPostHeader } from "@/utils/utils";
import { Link } from "react-router-dom";
import PostReaction from "./PostReaction";
import { MdVerified } from "react-icons/md";
import { useNavbarContext } from "@/context/NavbarContext";
import PostReactionCount from "./PostReactionCount";
import { useModal } from "@/hooks/useModal";
import useResizeImage from "@/hooks/useResizeImage";

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
  user?: {
    _id: string;
    displayname: string;
    imgURL: string;
  };
}

const PostType = ({ postObject }: { postObject: PostObject }) => {
  const { windowWidth } = useNavbarContext();
  const { setModalOpen, setHelper, modalType } = useModal();
  const { content, postImgURL, createdAt } = postObject;

  const [ref, size] = useResizeImage(windowWidth);

  const isVerified: boolean = true;

  return (
    <>
      <div className="bg-secondary rounded w-full h-fit">
        <div className="w-full bg-secondary h-fit flex flex-col gap-y-1 rounded">
          <div className="flex justify-between ps-2 py-3 pe-4">
            <div className="flex gap-x-2 items-center">
              <img
                src={postObject.user?.imgURL}
                alt={`${postObject.user?.displayname}_photo`}
                className="w-10 h-10 rounded-full object-cover pointer-events-none"
              />
              <div className="flex flex-col">
                <div className="flex gap-x-1 items-center text-sm md:text-base">
                  <Link to={`/${postObject.user?.displayname}`}>
                    <span className="font-semibold hover:underline">
                      {capitalizeFirstLetter(
                        postObject.user?.displayname || "Laros"
                      )}
                    </span>
                  </Link>
                  {isVerified && <MdVerified className=" text-sky-400" />}
                </div>

                <span className="text-muted-foreground text-xs">
                  {capitalizeFirstLetter(formatDateForPostHeader(createdAt))}
                </span>
              </div>
            </div>

            <div className="text-xs">
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
                <div className="px-2">
                  <span>{content}</span>
                </div>
                <div className={`bg-gray-900 flex justify-center ${size}`}>
                  <img
                    src={postImgURL}
                    alt={postImgURL}
                    ref={ref}
                    className="cursor-pointer"
                    onClick={() => {
                      setHelper(postObject._id);
                      setModalOpen("maxviewpost");
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {content && !postImgURL && (
            <div className="bg-pink-500 w-full h-72 p-2">{content}</div>
          )}

          {!content && postImgURL && (
            <img
              src={postImgURL}
              alt={postImgURL}
              className={`${size} ${
                modalType !== "maxviewpost" ? "cursor-pointer" : ""
              }`}
              ref={ref}
              onClick={() => {
                if (modalType !== "maxviewpost") {
                  setHelper(postObject._id);
                  setModalOpen("maxviewpost");
                }
              }}
            />
          )}
        </div>

        <PostReactionCount
          count={{
            commentCount: postObject.commentCount,
            likeCount: postObject.likeCount,
            shareCount: postObject.shareCount,
          }}
          postId={postObject._id}
        />
        <PostReaction
          postId={postObject._id}
          userLiked={postObject.userLiked}
        />
      </div>
    </>
  );
};

export default PostType;
