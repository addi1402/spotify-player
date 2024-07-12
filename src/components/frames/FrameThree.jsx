import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import SongShimmer from "../miscellaneous/SongShimmer";
import SongHeader from "../frameThree/SongHeader";
import SongCoverImage from "../frameThree/SongCoverImage";
import Tracer from "../frameThree/Tracer";
import Controls from "../frameThree/Controls";

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
    <div className=" w-full h-calc100minus5rem lg:w-3/6 lg:h-full md:w-1/2 md:h-calc100minus5rem sm:w-full sm:h-calc100minus5remby2 mt-24 flex flex-col items-center">
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
    </div>
  );
};

export default FrameThree;
