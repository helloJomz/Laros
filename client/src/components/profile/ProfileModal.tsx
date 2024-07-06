import EditGenre from "./modals/EditGenre";
import { useProfileContext } from "@/context/ProfileContext";
import Following from "./modals/Following";

const WrapperComponent = ({ children }: { children: React.ReactNode }) => {
  const { showProfileModal } = useProfileContext();

  return (
    showProfileModal && (
      <div className="fixed w-full h-full overflow-y-hidden bg-opacity-70 bg-black z-[99] flex items-center justify-center pb-32">
        {children}
      </div>
    )
  );
};

const ProfileModal = () => {
  const { showProfileModal } = useProfileContext();

  if (showProfileModal === "genre") return <EditGenre />;

  if (showProfileModal === "following") return <Following />;

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
