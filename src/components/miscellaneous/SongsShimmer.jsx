import { Skeleton } from "../ui/skeleton";

export default function Shimmer() {
  return (
    <div className="flex items-center space-x-4 justify-between w-11/12 px-4">
      <div className="flex items-center gap-4 py-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      <Skeleton className="h-4 w-8" />
    </div>
  );
}
