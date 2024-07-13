import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "@/redux/slices/dataSlice";
import { Skeleton } from "../ui/skeleton";
import AudioDuration from "./AudioDuration";

const SongCard = ({ name, artist, url, cover, accent, id }) => {
  const dispatch = useDispatch();
  const { current } = useSelector((store) => store.songs);
  const [imageLoaded, setImageLoaded] = useState(false);
  const songPlaying = current.id === id;

  // Function to handle image load completion
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Function to dispatch current song data
  const handleClick = () => {
    const currentSong = {
      id: id,
      cover: `https://cms.samespace.com/assets/${cover}`,
      name: name,
      artist: artist,
      url: url,
      accent: accent,
    };
    dispatch(setCurrent(currentSong));
  };

  return (
    
      <div
        onClick={handleClick}
        className={` flex items-center justify-between py-4 w-11/12 cursor-pointer hover:bg-white hover:bg-opacity-5 rounded-lg transition duration-300 ease-in-out px-4 ${
          songPlaying ? "bg-white bg-opacity-10" : ""
        }`}
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
