export default function Tracer({
  duration,
  currentTime,
  handleSeek,
  formatTime,
}) {
  return (
    <div className="mt-4 w-full lg:w-full md:w-72 sm:w-full">
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        className="w-full"
        id="song-slider"
      />
      <div className="flex justify-between text-sm">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
