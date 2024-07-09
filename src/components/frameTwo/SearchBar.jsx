import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  // Controlled Search Function
  function updateQuery(e) {
    setQuery(e.target.value);
  }

  return (
    <span className="flex mt-8 items-center">
      <input
        type="text"
        name="searchBar"
        id="searchBar"
        value={query}
        onChange={updateQuery}
        placeholder="What do you want to play?"
        className="relative focus:outline-none w-5/6 h-8 px-4 py-5 rounded-md bg-opacity-20 text-white bg-white text-sm placeholder:opacity-40 placeholder:text-white"
        autoComplete="off"
      />
      <IoIosSearch className="text-2xl text-neutral-400 absolute right-9" />
    </span>
  );
}
