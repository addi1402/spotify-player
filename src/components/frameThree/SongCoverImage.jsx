import { Skeleton } from "../ui/skeleton";

export default function SongCoverImage({
  imageLoaded,
  current,
  handleImageLoad,
  fadeClass,
}) {
  return (
    <div className=" h-96 w-96 mt-8 relative">
      {!imageLoaded && <Skeleton className="absolute inset-0 rounded-lg" />}
      <img
        src={current.cover}
        alt={`${current.name} Cover Image`}
        className={`h-96 w-96 lg:h-96 lg:w-96 md:h-80 md:w-80 rounded-lg object-cover transition-opacity duration-500 cursor-pointer ${fadeClass} ${
          imageLoaded ? "block" : "hidden"
        }`}
        onLoad={handleImageLoad}
      />
    </div>
  );
}
