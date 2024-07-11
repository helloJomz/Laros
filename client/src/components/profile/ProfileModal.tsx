import EditGenre from "./modals/EditGenre";
import Following from "./modals/Following";
import HeartAndFollow from "./modals/HeartAndFollow";
import DisplayPicture from "./modals/DisplayPicture";
import { cn } from "@/lib/utils";
import CreatePost from "../common/modal/CreatePost/CreatePost";
import { useSelector } from "react-redux";
import { useModal } from "@/app/features/profile/profileSlice";

const componentMap: { [key: string]: React.ComponentType<any> } = {
  following: Following,
  genre: EditGenre,
  heart: () => <HeartAndFollow type="heart" />,
  follow: () => <HeartAndFollow type="follow" />,
  displaypicture: DisplayPicture,
  createpost: CreatePost,
};

const ProfileModal = () => {
  const ModalType = useSelector(useModal);

  //TODO: Implement click outside close on every modals

  if (!ModalType) return null;

  const ModalComponent = componentMap[ModalType];

  return (
    <div
      className={cn(
        "fixed w-full h-full overflow-y-hidden bg-opacity-70 bg-black z-[99] flex items-center justify-center pb-32",
        {
          "bg-opacity-90": ModalType === "displaypicture",
        }
      )}
    >
      <ModalComponent />
    </div>
  );
};

export default ProfileModal;
