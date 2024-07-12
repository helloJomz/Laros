import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";
import FollowLikeButton from "./FollowLikeButton";
import { useProfile } from "@/hooks/useProfile";
import { useModal } from "@/hooks/useModal";

type PhotoProps = {
  variant: "display" | "cover";
};

const Photo = ({ variant }: PhotoProps) => {
  const { windowWidth } = useNavbarContext();

  const { userObject } = useProfile();
  const { imgURL, displayname } = userObject || {};

  const { setModalOpen } = useModal();

  if (variant === "cover")
    return (
      <>
        <div className="relative h-48 w-full bg-background lg:rounded-br-sm lg:rounded-bl-sm overflow-hidden">
          <img
            src={imgURL}
            alt={`${displayname}_coverphoto`}
            className="w-full h-full object-cover opacity-35 pointer-events-none"
          />
          <FollowLikeButton variant="small" />
        </div>
      </>
    );

  if (variant === "display")
    return (
      <div
        className={cn(
          "absolute left-2 lg:left-0 border-4 border-background rounded-full shadow-lg w-48 h-48 lg:w-72 lg:h-72 z-[50] cursor-pointer hover:brightness-150",
          {
            "w-40 h-40": windowWidth <= 500,
          }
        )}
        onClick={() => setModalOpen("displaypicture")}
      >
        <img
          src={imgURL}
          alt={`${displayname}_picture`}
          className="w-full h-full rounded-full object-cover pointer-events-none"
        />
      </div>
    );
};

export default Photo;
