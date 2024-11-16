"use client";

import { AppIcon } from "./Icons";

const Loader = () => {
  return (
    <div className="w-full h-screen absolute inset-0 bg-white flex flex-col justify-center items-center z-[100]">
      <AppIcon width={150} height={150} />

      <div className="py-4 loader">
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    </div>
  );
};

export default Loader;
