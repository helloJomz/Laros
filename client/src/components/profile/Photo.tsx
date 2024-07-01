import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";
import FollowLikeButton from "./FollowLikeButton";
import { useProfileContext } from "@/context/ProfileContext";

type PhotoProps = {
  variant: "display" | "cover";
};

const Photo = ({ variant }: PhotoProps) => {
  const { userProfileObject } = useProfileContext();
  const { imgURL, displayname } = userProfileObject || {};
  const { windowWidth } = useNavbarContext();

  if (variant === "cover")
    return (
      <>
        <div className="relative h-48 w-full bg-background lg:rounded-br-sm lg:rounded-bl-sm overflow-hidden">
          <img
            src={imgURL}
            alt={`${displayname}_coverphoto`}
            className="w-full h-full object-cover opacity-50 pointer-events-none"
          />
          <FollowLikeButton variant="small" />
        </div>
      </>
    );

  if (variant === "display")
    return (
      <div
        className={cn(
          "absolute left-2 lg:left-0 border-4 border-background rounded-full shadow-lg w-48 h-48 lg:w-72 lg:h-72 z-[50]",
          {
            "w-40 h-40": windowWidth <= 500,
          }
        )}
      >
        <img
          src={imgURL}
          alt={`${displayname}_picture`}
          className="w-full h-full rounded-full object-cover hover:brightness-150 cursor-pointer pointer-events-none"
        />
      </div>
    );
};

export default Photo;
