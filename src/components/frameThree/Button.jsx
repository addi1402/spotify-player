import { useSelector, useDispatch } from "react-redux";
import { setShowSongs } from "@/redux/slices/dataSlice";

export default function Button() {
  const { showSongs } = useSelector((store) => store.songs);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setShowSongs(!showSongs));
  }

  return (
    <button
      className="bg-transparent border px-3 py-1 text-sm rounded-full lg:hidden md:hidden w-fit mb-5"
      onClick={handleClick}
    >
      {showSongs ? "Hide Songs" : "Show Songs"}
    </button>
  );
}
