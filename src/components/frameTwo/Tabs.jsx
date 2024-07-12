import { useSelector, useDispatch } from "react-redux";
import { setSongTab } from "@/redux/slices/dataSlice";

export default function Tabs() {
  const { songTab } = useSelector((store) => store.songs);
  const dispatch = useDispatch();

  // Function to trigger tab change
  function switchTab(e) {
    if (e.target.id === songTab) return;
    dispatch(setSongTab(songTab === "forYou" ? "topTracks" : "forYou"));
  }
  return (
    <nav className="flex gap-10 font-bold text-lg">
      <p
        id="forYou"
        className={`cursor-pointer transition-all duration-200 ease-linear ${
          songTab === "forYou" ? "" : "opacity-50"
        }`}
        onClick={switchTab}
      >
        For You
      </p>
      <p
        id="topTracks"
        className={`cursor-pointer transition-all duration-200 ease-linear ${
          songTab !== "forYou" ? "" : "opacity-50"
        }`}
        onClick={switchTab}
      >
        Top Tracks
      </p>
    </nav>
  );
}
