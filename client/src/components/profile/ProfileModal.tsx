import EditGenre from "./modals/EditGenre";
import Following from "./modals/Following";
import HeartAndFollow from "./modals/HeartAndFollow";
import DisplayPicture from "./modals/DisplayPicture";
import { cn } from "@/lib/utils";
import CreatePost from "../common/modal/CreatePost/CreatePost";
import { useModal } from "@/hooks/useModal";
import MaxViewPost from "../common/modal/MaxViewPost";

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

const ProfileModal = () => {
  const { modalType } = useModal();

  //TODO: Implement click outside close on every modals

  if (!modalType) return null;

  const ModalComponent = componentMap[modalType];

  return (
    <div
      className={cn(
        "fixed w-full h-full overflow-y-hidden bg-opacity-70 bg-black z-[99] flex items-center justify-center pb-14 md:pb-32",
        {
          "bg-opacity-90":
            modalType === "displaypicture" || modalType === "maxviewpost",
          "flex-col justify-center ": modalType === "createpost",
        }
      )}
    >
      <ModalComponent />
    </div>
  );
};

export default ProfileModal;
