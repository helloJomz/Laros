import EditGenre from "./modals/EditGenre";
import Following from "./modals/Following";
import HeartAndFollow from "./modals/HeartAndFollow";
import DisplayPicture from "./modals/DisplayPicture";
import { cn } from "@/lib/utils";
import CreatePost from "../common/modal/CreatePost/CreatePost";
import { useModal } from "@/hooks/useModal";

const componentMap: { [key: string]: React.ComponentType<any> } = {
  following: Following,
  genre: EditGenre,
  heart: () => <HeartAndFollow type="heart" />,
  follow: () => <HeartAndFollow type="follow" />,
  displaypicture: DisplayPicture,
  createpost: CreatePost,
};

const ProfileModal = () => {
  const { modalType } = useModal();

  //TODO: Implement click outside close on every modals

  if (!modalType) return null;

  const ModalComponent = componentMap[modalType];

  return (
    <div
      className={cn(
        "fixed w-full h-full overflow-y-hidden bg-opacity-70 bg-black z-[99] flex items-center justify-center pb-32",
        {
          "bg-opacity-90": modalType === "displaypicture",
        }
      )}
    >
      <ModalComponent />
    </div>
  );
};

export default ProfileModal;
