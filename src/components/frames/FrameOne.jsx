import React from "react";
import Profile from "../frameOne/Profile";

const FrameOne = () => {
  return (
    <div className="w-full h-16 sm:w-full sm:flex-row sm:items-center lg:w-1/6 lg:h-full lg:flex-col lg:items-start lg:justify-between md:w-full md:flex-row md:items-center md:mt-4 px-8 py-8 flex justify-between items-center">
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
