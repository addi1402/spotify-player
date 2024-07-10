import React, { useState } from "react";
import Tabs from "../frameTwo/Tabs";
import SongList from "../frameTwo/SongList";
import SearchBar from "../frameTwo/SearchBar";

const FrameTwo = () => {
  const [tab, setTab] = useState("forYou");

  return (
    <div
      className="
      w-full h-calc100minus5remby2 
      lg:w-2/6 lg:h-full 
      md:w-1/2 md:h-calc100minus5rem 
      sm:w-full sm:h-calc100minus5remby2
      p-10 pb-0 flex flex-col gap-0 "
    >
      <div>
        <Tabs tab={tab} setTab={setTab} />
        <SearchBar />
      </div>
      <SongList tab={tab} />
    </div>
  );
};

export default FrameTwo;
