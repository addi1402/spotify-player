import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  // Controlled Search Function
  function updateQuery(e) {
    setQuery(e.target.value);
  }

  return (
    <span className="flex mt-8 items-center w-5/6 h-8 px-4 py-5 rounded-md bg-opacity-20 bg-white min-w-72">
      <input
        type="text"
        name="searchBar"
        id="searchBar"
        value={query}
        onChange={updateQuery}
        placeholder="What do you want to play?"
        className="focus:outline-none text-white bg-transparent w-full text-sm placeholder:opacity-40 placeholder:text-white"
        autoComplete="off"
      />
      <IoIosSearch className="text-2xl text-white opacity-40" />
    </span>
  );
}
