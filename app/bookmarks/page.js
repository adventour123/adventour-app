"use client";
import BottomNavbar from "@/components/BottomNavbar";
import TopPlaces from "@/components/TopPlaces";

const BookmarkScreen = () => {
  return (
    <div className="w-full h-full bg-white overflow-y-auto relative p-4">
      <header className="w-full flex space-x-3 justify-start items-center px-4 py-3 bg-white fixed top-0 left-0 z-[100]">
        <b className="text-2xl text-black">Bookmarks</b>
      </header>
      <div className="py-10">
        <TopPlaces />
      </div>

      <BottomNavbar />
    </div>
  );
};

export default BookmarkScreen;
