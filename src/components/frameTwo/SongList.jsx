import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs, searchSong } from "@/redux/slices/dataSlice";
import SongCard from "./SongCard";
import Shimmer from "../miscellaneous/SongsShimmer";

export default function SongList() {
  const dispatch = useDispatch();
  const { data, loading, error, current, searchResults } = useSelector((store) => store.songs);
  const { tab } = useSelector((store) => store.tabs);
  const [activeTab, setActiveTab] = useState(tab);
  const [fadeClass, setFadeClass] = useState("opacity-100");

  // Initial Song Fetching
  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  // Initial Accent Color
  useEffect(() => {
    document.body.style.setProperty("--accent", current.accent);
  }, [current]);

  // Tab Switch Transition
  useEffect(() => {
    // Trigger fade out
    setFadeClass("opacity-0");
    const timeoutId = setTimeout(() => {
      // After fade out, change tab and fade in
      setActiveTab(tab);
      setFadeClass("opacity-100");
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [tab]);

  return (
    <main
      className="mt-6 scroll-smooth flex-grow overflow-scroll"
      id="scrollable"
    >
      {loading &&
        Array.from({ length: 8 }, (_, index) => {
          return <Shimmer key={index} />;
        })}
      {error && <div>Error: {error}</div>}
      <div className={`transition-opacity duration-500 ${fadeClass}`}>
        {activeTab === "forYou" ? (
          <div>
            {searchResults?.map((song) => (
              <SongCard key={song.id} {...song} />
            ))}
          </div>
        ) : (
          <div>
            {searchResults?.map((song) => {
              if (song.top_track) return <SongCard key={song.id} {...song} />;
            })}
          </div>
        )}
      </div>
    </main>
  );
}
