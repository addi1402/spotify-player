import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "@/redux/slices/dataSlice";
import SongCard from "./SongCard";
import Shimmer from "../miscellaneous/SongsShimmer";

export default function SongList({ tab }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((store) => store.songs);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

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
      {tab === "forYou" ? (
        <div>
          {data?.map((song) => (
            <SongCard key={song.id} {...song} />
          ))}
        </div>
      ) : (
        <div>
          {data?.map((song) => {
            if (song.top_track) return <SongCard key={song.id} {...song} />;
          })}
        </div>
      )}
    </main>
  );
}
