import { useEffect, useState } from "react";

export default function AudioDuration({ url }) {
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const audio = new Audio(url);

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    return () => {
      audio.removeEventListener("loadedmetadata", () => {});
    };
  }, [url]);

  const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <span className="opacity-60">{formatDuration(duration)}</span>
    </div>
  );
}
