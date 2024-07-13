import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "@/redux/slices/dataSlice";
import SongCard from "./SongCard";
import Shimmer from "../miscellaneous/SongsShimmer";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function SongList() {
  const dispatch = useDispatch();
  const { loading, error, current, searchResults, songTab } = useSelector(
    (store) => store.songs
  );
  const [activeTab, setActiveTab] = useState(songTab);
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
      setActiveTab(songTab);
      setFadeClass("opacity-100");
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [songTab]);

  return (
    <main
      className="mt-6 scroll-smooth flex-grow overflow-scroll min-w-80"
      id="scrollable"
    >
      {loading &&
        Array.from({ length: 8 }, (_, index) => {
          return <Shimmer key={index} />;
        })}
      {error && <div>Error: {error}</div>}
      <div className={`transition-opacity duration-500 ${fadeClass}`}>
        {activeTab === "forYou" ? (
          <TransitionGroup component="div">
            {searchResults?.map((song) => (
              <CSSTransition key={song.id} timeout={300} classNames="fade">
                <SongCard key={song.id} {...song} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        ) : (
          <div>
            <TransitionGroup component="div">
              {searchResults?.map((song) => {
                if (song.top_track) {
                  return (
                    <CSSTransition
                      key={song.id}
                      timeout={300}
                      classNames="fade"
                    >
                      <SongCard key={song.id} {...song} />
                    </CSSTransition>
                  );
                }
                return null; // Handle other cases if needed
              })}
            </TransitionGroup>
          </div>
        )}
      </div>
    </main>
  );
}
