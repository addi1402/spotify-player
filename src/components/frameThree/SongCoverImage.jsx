import { Skeleton } from "../ui/skeleton";

export default function SongCoverImage({
  imageLoaded,
  current,
  handleImageLoad,
  fadeClass,
}) {
  const boxStyle = "h-96 w-96 lg:h-96 lg:w-96 md:h-72 md:w-72 sm:h-96 sm:w-96";
  return (
    <div className={`mt-8 relative ${boxStyle}`}>
      {!imageLoaded && <Skeleton className="absolute inset-0 rounded-lg" />}
      <img
        src={current.cover}
        alt={`${current.name} Cover Image`}
        className={`${boxStyle} rounded-xl md:rounded-lg object-cover transition-opacity duration-500 cursor-pointer ${fadeClass} ${
          imageLoaded ? "block" : "hidden"
        }`}
        onLoad={handleImageLoad}
      />
    </div>
  );
}
