import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";
import ComponentFollowLikeButton from "./ComponentFollowLikeButton";
import React from "react";
import { useProfile } from "@/hooks/useProfile";

type FollowLikeButtonProps = {
  variant: "small" | "large";
};

const FollowLikeButton = ({ variant }: FollowLikeButtonProps) => {
  const { windowWidth } = useNavbarContext();

  const { isAuthProfile } = useProfile();

  const FollowLikeButtons: Array<"heart" | "follow"> = ["heart", "follow"];

  if (variant === "small")
    return (
      <>
        <div
          className={cn(
            "absolute block bottom-0 right-0 text-3xl text-white z-50 w-fit",
            {
              hidden: windowWidth > 500,
            }
          )}
        >
          <div
            className={cn("flex justify-end px-4 py-2", {
              "px-0": isAuthProfile,
            })}
          >
            <div
              className={cn("flex flex-row gap-x-4", {
                "gap-x-2": isAuthProfile,
              })}
            >
              {FollowLikeButtons.map(
                (type: "heart" | "follow", index: number) => (
                  <ComponentFollowLikeButton
                    key={index}
                    variant="small"
                    type={type}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </>
    );

  // FOR TABLET SIZE AND LARGER
  if (variant === "large")
    return (
      <>
        <div
          className={cn(
            "hidden flex-col pe-2 pt-4 pb-1 shadow-sm w-fit gap-y-2 lg:gap-y-4 items-center justify-center text-2xl",
            {
              flex: windowWidth > 500,
            }
          )}
        >
          {FollowLikeButtons.map((type: "heart" | "follow", index: number) => (
            <React.Fragment key={index}>
              <ComponentFollowLikeButton variant="large" type={type} />
              {index === 0 && (
                <div className="w-full border-b border-slate-600" />
              )}
            </React.Fragment>
          ))}
        </div>
      </>
    );
};

export default FollowLikeButton;
