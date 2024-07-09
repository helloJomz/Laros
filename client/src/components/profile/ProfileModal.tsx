import EditGenre from "./modals/EditGenre";
import { useProfileContext } from "@/context/ProfileContext";
import Following from "./modals/Following";
import HeartAndFollow from "./modals/HeartAndFollow";
import DisplayPicture from "./modals/DisplayPicture";
import { cn } from "@/lib/utils";

const WrapperComponent = ({ children }: { children: React.ReactNode }) => {
  const { showProfileModal } = useProfileContext();

  return (
    showProfileModal && (
      <div
        className={cn(
          "fixed w-full h-full overflow-y-hidden bg-opacity-70 bg-black z-[99] flex items-center justify-center pb-32",
          {
            "bg-opacity-90": showProfileModal === "displaypicture",
          }
        )}
      >
        {children}
      </div>
    )
  );
};

const ProfileModal = () => {
  const { showProfileModal } = useProfileContext();

  if (showProfileModal === "genre") return <EditGenre />;

  if (showProfileModal === "following") return <Following />;

  if (showProfileModal === "heart") return <HeartAndFollow type="heart" />;

  if (showProfileModal === "follow") return <HeartAndFollow type="follow" />;

  if (showProfileModal === "displaypicture") return <DisplayPicture />;

  return null;
};

const ProfileModalWithWrapper = () => {
  return (
    <WrapperComponent>
      <ProfileModal />
    </WrapperComponent>
  );
};

export default ProfileModalWithWrapper;
