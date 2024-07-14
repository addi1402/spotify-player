import Button from "@/components/frameThree/Button";
import { useSelector } from "react-redux";
import SongList from "../frameTwo/SongList";

export default function SongFrame() {
    const {showSongs} = useSelector(store => store.songs);
  return <main className="flex flex-col gap-5">
    <Button/>
    {showSongs && <SongList/>}
  </main>;
}
