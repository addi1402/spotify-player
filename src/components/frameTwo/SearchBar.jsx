import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { searchSong } from "../../redux/slices/dataSlice"; // Adjust the import path as necessary

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchSong(query));
  }, [query, dispatch]);

  function updateQuery(e) {
    setQuery(e.target.value);
  }

  return (
    <span className="flex mt-8 items-center w-11/12 h-10 px-4 py-5 rounded-md bg-opacity-20 bg-white min-w-72">
      <input
        type="text"
        name="searchBar"
        id="searchBar"
        value={query}
        onChange={updateQuery}
        placeholder="What do you want to play?"
        className="focus:outline-none text-white bg-transparent w-full text-base placeholder:opacity-40 placeholder:text-white"
        autoComplete="off"
      />
      <IoIosSearch className="text-2xl text-white opacity-40" />
    </span>
  );
}
