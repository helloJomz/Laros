import EditGenre from "../profile/modals/EditGenre";
import Following from "../profile/modals/Following";
import HeartAndFollow from "../profile/modals/HeartAndFollow";
import DisplayPicture from "../profile/modals/DisplayPicture";
import { cn } from "@/lib/utils";
import CreatePost from "./modal/CreatePost/CreatePost";
import { useModal } from "@/hooks/useModal";
import MaxViewPost from "./modal/MaxViewPost";

const componentMap: { [key: string]: React.ComponentType<any> } = {
  // EXCLUSIVE ON PROFILE
  following: Following,
  genre: EditGenre,
  heart: () => <HeartAndFollow type="heart" />,
  follow: () => <HeartAndFollow type="follow" />,
  displaypicture: DisplayPicture,

  //COMMONS
  createpost: CreatePost,
  maxviewpost: MaxViewPost,
};

const CollectionOfModals = () => {
  const { modalType } = useModal();

  if (!modalType) return null;

  const ModalComponent = componentMap[modalType];

  return (
    <div
      className={cn(
        "absolute w-full h-full overflow-y-hidden bg-opacity-95 bg-black z-[99] flex items-center justify-center py-24 md:pb-32 ",
        {
          "flex-col justify-center": modalType === "createpost",
          "py-0": modalType === "maxviewpost",
        }
      )}
    >
      <ModalComponent />
    </div>
  );
};

export default CollectionOfModals;
