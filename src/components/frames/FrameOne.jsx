import React from "react";
import Profile from "../frameOne/Profile";

const FrameOne = () => {
  return (
    <div className="w-full h-16 sm:w-full sm:flex-row sm:items-center lg:w-1/6 lg:h-full lg:flex-col lg:items-start lg:justify-between md:w-full md:flex-row md:items-center lg:mt-0 md:mt-2 sm:mt-2 mt-2 px-8 py-8 flex justify-between items-center order-1 lg:order-1 md:order-1 sm:order-1 bg-transparent">
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
};

export default FrameOne;
