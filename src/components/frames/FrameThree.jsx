import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import SongShimmer from "../miscellaneous/SongShimmer";
import { Skeleton } from "../ui/skeleton";

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
    dispatch({ type: "PREVIOUS_SONG" });
  };

  const handleNextSong = () => {
    dispatch({ type: "NEXT_SONG" });
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <div className=" relative w-full h-calc100minus5rem lg:w-3/6 lg:h-full md:w-1/2 md:h-calc100minus5rem sm:w-full sm:h-calc100minus5remby2 mt-24 flex flex-col items-center">
      {loading ? (
        <SongShimmer />
      ) : (
        <div>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">{current.name}</h1>
            <p className="text-white opacity-60">{current.artist}</p>
          </div>
          <div className="h-96 w-96 mt-8 relative">
            {!imageLoaded && (
              <Skeleton className="absolute inset-0 rounded-lg" />
            )}
            <img
              src={current.cover}
              alt={`${current.name} Cover Image`}
              className={`h-96 w-96 rounded-lg object-cover transition-opacity duration-500 ${fadeClass} ${
                imageLoaded ? "block" : "hidden"
              }`}
              onLoad={handleImageLoad}
            />
          </div>

          <div className="mt-4 w-full">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-sm">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <div className="bg-slate-100 hover:bg-opacity-15 bg-opacity-10 rounded-full h-12 w-12 flex justify-center items-center cursor-pointer transition duration-300">
              <img src="/options.svg" alt="Options" />
            </div>
            <img
              src="/previous.svg"
              alt="Previous Song"
              className="cursor-pointer"
              onClick={handlePreviousSong}
            />
            <img
              src={isPlaying ? "/pause.svg" : "/play.svg"}
              alt="Play/Pause"
              className="cursor-pointer"
              onClick={togglePlayPause}
            />
            <img
              src="/next.svg"
              alt="Next Song"
              className="cursor-pointer"
              onClick={handleNextSong}
            />
            <div
              onClick={() => setShowVolumeControl(!showVolumeControl)}
              className="bg-slate-100 hover:bg-opacity-15 bg-opacity-10 rounded-full h-12 w-12 flex justify-center items-center cursor-pointer transition duration-300"
            >
              <img src="/volume.svg" alt="Volume" />
              {showVolumeControl && (
                <div
                  className="absolute transform -translate-x-1/2 mb-2 "
                  style={{ right: "30px" }}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 -rotate-90 accent-white bg-slate-600 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>

          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
        </div>
      )}
    </div>
  );
};

export default FrameThree;
