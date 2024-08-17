import { RootState } from "@/app/store";
import { useModal } from "@/hooks/useModal";
import { selectSinglePost } from "@/app/features/post/postSlice";
import { useSelector } from "react-redux";
import PostType from "../post/PostType";
import PostComment from "../post/PostComment";
import { X } from "lucide-react";
import WriteComment from "../post/WriteComment";
import { cn } from "@/lib/utils";
import { useGetUserByIdQuery } from "@/app/features/users/userApiSlice";
import { capitalizeFirstLetter } from "@/utils/utils";
import { useUserContext } from "@/context/UserContext";
import useClickedOutsideModal from "@/hooks/useClickedOutsideModal";

const MaxViewPost = () => {
  const { componentRef } = useClickedOutsideModal();

  const { authenticatedUserObject } = useUserContext();
  const { displayname, userid } = authenticatedUserObject;

  const { usehelper, setModalOpen } = useModal();
  const postId = usehelper;

  const selectedPost = useSelector((state: RootState) =>
    selectSinglePost(state, postId)
  );

  const { data, isLoading } = useGetUserByIdQuery(selectedPost!.user._id, {
    skip: !selectedPost,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return null;

  return (
    <>
      <div
        className={cn(
          "h-full w-[95%] md:w-[70%] lg:w-[50%] xl:w-[30%] bg-secondary rounded overflow-hidden flex flex-col md:mt-24",
          {
            "h-fit": selectedPost!.commentCount <= 1,
          }
        )}
        ref={componentRef}
      >
        <div className="font-bold border-b border-slate-600 py-3 lg:py-4 relative">
          <div className="text-center">
            <h5>
              {displayname === data.displayname
                ? "Your Post"
                : `${capitalizeFirstLetter(data?.displayname)}'s Post`}
            </h5>
          </div>
          <div
            className="absolute top-2.5 lg:top-3.5 right-1.5 p-1.5 rounded-full bg-opacity-10 bg-slate-200 hover:bg-opacity-20 cursor-pointer"
            onClick={() => setModalOpen(null)}
          >
            <X size={16} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-secondary">
          <PostType postObject={selectedPost!} />
          <PostComment postId={postId} authorId={selectedPost!.user._id} />
        </div>

        {userid && (
          <div className="bg-secondary w-full py-1">
            <WriteComment postId={postId} />
          </div>
        )}
      </div>
    </>
  );
};

export default MaxViewPost;
