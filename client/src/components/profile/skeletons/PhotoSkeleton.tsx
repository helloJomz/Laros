import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type PhotoSkeletonProps = {
  variant: "display" | "cover";
};

const Photo = ({ variant }: PhotoSkeletonProps) => {
  const { windowWidth } = useNavbarContext();

  if (variant === "cover")
    return (
      <>
        <div className="relative h-48 w-full bg-background lg:rounded-br-sm lg:rounded-bl-sm overflow-hidden">
          <Skeleton className="w-full h-full object-cover" />
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
        <Skeleton className="w-full h-full rounded-full" />
      </div>
    );
};

export default Photo;
