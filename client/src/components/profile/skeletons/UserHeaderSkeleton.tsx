import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";
import PhotoSkeleton from "./PhotoSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

type UserHeaderSkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const UserHeaderSkeleton = ({
  className,
  ...rest
}: UserHeaderSkeletonProps) => {
  const { windowWidth } = useNavbarContext();

  return (
    <>
      {/* User Header (DISPLAY PHOTO, USER DISPLAYNAME, TITLE) */}
      <div className={className} {...rest}>
        {/* Display Photo */}
        <PhotoSkeleton variant="display" />

        {/* User's Basic Info */}
        <div
          className={cn(
            "absolute top-20 flex flex-col gap-y-6 lg:top-24 w-full",
            {
              "top-14": windowWidth <= 500,
            }
          )}
        >
          <div className="flex justify-between pe-4">
            <div
              className={cn(
                "flex flex-col justify-center gap-y-2 ml-56 lg:ml-[20rem]",
                {
                  "ml-48": windowWidth <= 500,
                }
              )}
            >
              <Skeleton className="w-24 h-4 md:w-32 md:h-4" />

              <Skeleton className="w-36 h-8 md:w-48 md:h-12" />

              <Skeleton className="w-24 h-6 md:w-28" />

              {windowWidth >= 1024 && (
                <div className="flex flex-col gap-y-2 mt-4">
                  <Skeleton className="h-2 w-12" />
                  <div className="flex gap-x-2">
                    <Skeleton className="rounded-full h-8 w-8" />
                    <Skeleton className="rounded-full h-8 w-8" />
                    <Skeleton className="rounded-full h-8 w-8" />
                    <Skeleton className="h-8 w-14 rounded-2xl" />
                  </div>
                </div>
              )}
            </div>

            {windowWidth >= 500 && (
              <div className="flex flex-col gap-y-4 pt-4">
                <Skeleton className="w-20 h-8" />
                <Skeleton className="w-20 h-8" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHeaderSkeleton;
