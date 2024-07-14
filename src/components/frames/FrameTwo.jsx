import React from "react";
import Tabs from "@/components/frameTwo/Tabs";
import SongList from "@/components/frameTwo/SongList";
import SearchBar from "@/components/frameTwo/SearchBar";
import Button from "../frameThree/Button";

export default function FrameTwo() {
  return (
    <main
      className="
      sm:w-full sm:h-auto sm:p-8
      md:w-1/2 md:h-calcOne md:p-8 md:pb-0
      lg:w-2/6 lg:h-screen lg:p-10 lg:pb-0
      w-full h-calc100minus5remby2
      p-8 pb-0 flex flex-col gap-0
      order-3 lg:order-2 md:order-2 sm:order-3
      frame-two"
    >
      <header className="songListHeader">
        <Tabs />
        <SearchBar />
      </header>
      <SongList />
    </main>
  );
}
