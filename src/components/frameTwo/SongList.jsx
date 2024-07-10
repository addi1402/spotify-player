import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "@/redux/slices/dataSlice";
import SongCard from "./SongCard";

export default function SongList({ tab }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((store) => store.songs);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <main className="mt-6 scroll-smooth flex-grow overflow-scroll" id="scrollable">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {tab === "forYou" ? (
        <div>
          {data?.map((song) => <SongCard key={song.id} {...song}/>)}
        </div>
      ) : (
        <div>Top Plays</div>
      )}
    </main>
  );
}
