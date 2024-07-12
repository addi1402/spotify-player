import { useEffect } from "react";

export default function Controls({
  volume,
  handleVolumeChange,
  handlePreviousSong,
  handleNextSong,
  isPlaying,
  setIsPlaying,
  currentTime,
  duration,
  togglePlayPause,
  showVolumeControl,
  setShowVolumeControl,
}) {
  useEffect(() => {
    if (currentTime === duration) {
      setIsPlaying(false);
    }
  }, [currentTime, duration]);

  return (
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
          <div className="absolute transform -translate-x-1/2 mb-2 right-0 bottom-1/3">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="-rotate-90 accent-white bg-slate-600 cursor-pointer"
              id="volume-slider"
            />
          </div>
        )}
      </div>
    </div>
  );
}
