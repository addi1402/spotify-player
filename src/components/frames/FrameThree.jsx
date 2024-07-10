import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SongShimmer from "../miscellaneous/SongShimmer";

const FrameThree = () => {
  const { data, loading, current } = useSelector((store) => store.songs);
  return (
    <div
      className="
      w-full h-calc100minus5rem 
      lg:w-3/6 lg:h-full 
      md:w-1/2 md:h-calc100minus5rem 
      sm:w-full sm:h-calc100minus5remby2
      mt-24 flex flex-col items-center
     "
    >
      {loading ? (
        <SongShimmer />
      ) : (
        <div>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">{current.name}</h1>
            <p className="text-white opacity-60">{current.artist}</p>
          </div>
          <img
            src={current.cover}
            alt={`${current.name} Cover Image`}
            className="h-96 w-96 rounded-lg mt-8 object-cover"
          />
          <p className="mt-4">Loader</p>
          <div className="flex justify-between mt-8">
            <div className="bg-slate-100 hover:bg-opacity-15 bg-opacity-10 rounded-full h-12 w-12 flex justify-center items-center cursor-pointer transition duration-300">
              <img src="/options.svg" alt="Options" />
            </div>

            <img
              src="/previous.svg"
              alt="Previous Song"
              className="cursor-pointer"
            />
            <img
              src="/action.svg"
              alt="Play/Pause"
              className="cursor-pointer"
            />
            <img src="/next.svg" alt="Next Song" className="cursor-pointer" />
            <div className="bg-slate-100 hover:bg-opacity-15 bg-opacity-10 rounded-full h-12 w-12 flex justify-center items-center cursor-pointer transition duration-300">
              <img src="/volume.svg" alt="Volume" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrameThree;
