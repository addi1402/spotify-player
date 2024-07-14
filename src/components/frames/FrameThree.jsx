import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import SongShimmer from "@/components/miscellaneous/SongShimmer";
import SongHeader from "@/components/frameThree/SongHeader";
import SongCoverImage from "@/components/frameThree/SongCoverImage";
import Tracer from "@/components/frameThree/Tracer";
import Controls from "@/components/frameThree/Controls";
import { playNext, playPrevious } from "@/redux/slices/dataSlice";
import Button from "@/components/frameThree/Button";
import SongFrame from "../frameThree/SongFrame";

const FrameThree = () => {
  const dispatch = useDispatch();
  const { loading, current } = useSelector((store) => store.songs);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fadeClass, setFadeClass] = useState("opacity-100");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  const audioRef = useRef(null);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    setFadeClass("opacity-30");
    const timeoutId = setTimeout(() => {
      setFadeClass("opacity-100");
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [current.cover]);

  useEffect(() => {
    if (audioRef.current && current.url) {
      audioRef.current.src = current.url;
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    }
  }, [current.url]);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePreviousSong = () => {
    dispatch(playPrevious());
  };

  const handleNextSong = () => {
    dispatch(playNext());
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <div className=" w-full h-calc100minus5rem lg:w-3/6 lg:h-auto md:w-1/2 md:h-calc100minus5rem sm:w-full sm:h-auto sm:pl-8 lg:pl-0 md:pl-0 md:mt-24 pl-8 lg:mt-24 sm:mt-5 mt-5 flex flex-col lg:items-center md:items-center sm:items-start items-start order-2 lg:order-3 md:order-3 sm:order-2">
      <div className="flex items-start gap-10">
        {loading ? (
          <SongShimmer />
        ) : (
          <div>
            <SongHeader current={current} />

            <SongCoverImage
              handleImageLoad={handleImageLoad}
              current={current}
              imageLoaded={imageLoaded}
              fadeClass={fadeClass}
            />

            <Tracer
              duration={duration}
              currentTime={currentTime}
              handleSeek={handleSeek}
              formatTime={formatTime}
            />

            <Controls
              volume={volume}
              handleVolumeChange={handleVolumeChange}
              handlePreviousSong={handlePreviousSong}
              handleNextSong={handleNextSong}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              currentTime={currentTime}
              duration={duration}
              togglePlayPause={togglePlayPause}
              showVolumeControl={showVolumeControl}
              setShowVolumeControl={setShowVolumeControl}
            />

            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
          </div>
        )}
        {/* <SongFrame/> */}
      </div>
    </div>
  );
};

export default FrameThree;
