import { Skeleton } from "../ui/skeleton";

export default function SongCoverImage({
  imageLoaded,
  current,
  handleImageLoad,
  fadeClass,
}) {
  const boxStyle = "lg:h-96 lg:w-96 md:h-80 md:w-80 sm:h-96 sm:w-96";
  return (
    <div className={`mt-8 relative ${boxStyle} coverImg`}>
      {!imageLoaded && <Skeleton className="absolute inset-0 rounded-lg coverImg" />}
      <img
        src={current.cover}
        alt={`${current.name} Cover Image`}
        className={`${boxStyle} coverImg rounded-lg md:rounded-lg object-cover transition-opacity duration-500 cursor-pointer ${fadeClass} ${
          imageLoaded ? "block" : "hidden"
        }`}
        onLoad={handleImageLoad}
      />
    </div>
  );
}
