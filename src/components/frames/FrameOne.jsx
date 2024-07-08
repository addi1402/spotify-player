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
      bg-slate-300"
    >
      <img src="/logo.svg" alt="Spotify Brand Logo" className="w-32" />
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>Profile</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default FrameOne;
