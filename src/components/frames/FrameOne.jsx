import React from "react";
import Profile from "@/components/frameOne/Profile";

export default function FrameOne() {
  return (
    <div
      className=" 
        sm:w-full sm:flex-row sm:items-center sm:mt-2 sm:order-1
        md:w-full md:flex-row md:items-center md:mt-2 md:order-1
        lg:w-1/6 lg:h-screen lg:flex-col lg:items-start lg:justify-between lg:mt-0 lg:order-1
        mt-2 px-8 py-8 w-full h-16 
        flex justify-between items-center order-1"
    >
      <a href="/">
        <img
          src="/logo.svg"
          alt="Spotify Brand Logo"
          className="w-24 lg:w-32 md:w-24 sm:w-24"
        />
      </a>
      <Profile />
    </div>
  );
}
