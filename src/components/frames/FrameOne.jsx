import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FrameOne = () => {
  return (
    <div
      className="
        w-full h-16 
        sm:w-full sm:flex-row sm:items-center
        lg:w-1/6 lg:h-full lg:flex-col lg:items-start lg:justify-between
        md:w-full md:flex-row md:items-center  
        px-8 py-8 flex 
        justify-between items-center 
      "
    >
      <a href="/">
        <img
          src="/logo.svg"
          alt="Spotify Brand Logo"
          className="w-24 lg:w-32 md:w-24 sm:w-24"
        />
      </a>

      <Avatar
        alt="User Avatar"
        className="w-8 h-8 lg:w-10 lg:h-10 cursor-pointer text-white"
      >
        <AvatarImage
          src="/profile.png"
          className="object-cover bg-neutral-700"
        />
        <AvatarFallback className="bg-neutral-700">CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default FrameOne;
