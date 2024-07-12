import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrent } from "@/redux/slices/dataSlice";
import { Skeleton } from "../ui/skeleton";
import AudioDuration from "./AudioDuration";

const SongCard = ({ name, artist, url, cover, accent }) => {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Function to handle image load completion
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Function to dispatch current song data
  const handleClick = () => {
    dispatch(
      setCurrent({
        cover: `https://cms.samespace.com/assets/${cover}`,
        name: name,
        artist: artist,
        url: url,
        accent: accent,
      })
    );
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between py-4 w-11/12 cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-lg min-w-72 transition duration-300 ease-in-out px-4"
    >
      <div className="flex gap-4">
        {!imageLoaded && (
          <Skeleton
            className="w-12 h-12 rounded-full animate-pulse"
            style={{ minWidth: "48px" }} // Adjust size as per your design
          />
        )}
        <img
          src={`https://cms.samespace.com/assets/${cover}`}
          alt={`${name} Cover`}
          className={`w-12 h-12 rounded-full object-cover ${
            imageLoaded ? "block" : "hidden"
          }`}
          onLoad={handleImageLoad}
        />
        <div>
          <p>{name}</p>
          <p className="text-sm opacity-60">{artist}</p>
        </div>
      </div>
      <AudioDuration url={url} />
    </div>
  );
};

export default SongCard;
