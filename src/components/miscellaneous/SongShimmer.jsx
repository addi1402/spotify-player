import { Skeleton } from "../ui/skeleton";

export default function SongShimmer() {
  return (
    <div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-9 w-32 rounded-lg" />
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>
      <Skeleton className="h-96 w-96 lg:h-96 lg:w-96 md:h-72 md:w-72 sm:h-96 sm:w-96 rounded-lg mt-8" />
      <Skeleton className="h-2 w-96 rounded-lg mt-6" />
    </div>
  );
}
