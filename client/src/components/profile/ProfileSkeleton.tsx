import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";
import PhotoSkeleton from "./skeletons/PhotoSkeleton";
import UserHeaderSkeleton from "./skeletons/UserHeaderSkeleton";
import IntroSkeleton from "./skeletons/IntroSkeleton";
import PostSkeleton from "./skeletons/PostSkeleton";

const ProfileSkeleton = () => {
  const { windowWidth } = useNavbarContext();
  return (
    <>
      <div className="w-full md:w-[85%] xl:w-1/2 m-auto h-full overflow-y-hidden">
        <div
          className={cn("flex flex-col gap-y-36 lg:gap-y-60 ", {
            "gap-y-32": windowWidth <= 500,
          })}
        >
          <div>
            <div className="relative w-full">
              <PhotoSkeleton variant="cover" />
              <UserHeaderSkeleton
                className={cn("relative top-[-4rem]", {
                  "top-[-2.5rem]": windowWidth <= 500,
                })}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-x-6 gap-y-4 px-4 ">
            <IntroSkeleton />
            <PostSkeleton />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSkeleton;
