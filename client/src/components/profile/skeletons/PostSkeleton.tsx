import { Skeleton } from "@/components/ui/skeleton";

const PostSkeleton = () => {
  return (
    <>
      <div className="flex-1 flex flex-col gap-y-4 h-full pb-4">
        <Skeleton className="w-full h-14" />
        <Skeleton className="w-full h-14" />
        <Skeleton className="w-full h-48" />
        <Skeleton className="w-full h-24" />
      </div>
    </>
  );
};

export default PostSkeleton;
