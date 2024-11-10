"use client";
import { useEffect, useState } from "react";
import BottomNavbar from "../../components/BottomNavbar";
import ShowItem from "../../components/ShowItem";
import TopPlaces from "../../components/TopPlaces";
import { fetchAllTouristSpots } from "../../config/hooks";

const BookmarkScreen = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    active: false,
    data: null,
  });

  // fetch tourist spots
  useEffect(() => {
    const fetchTouristSpots = async () => {
      setIsLoading(true);
      try {
        const res = await fetchAllTouristSpots();
        if (res.success) {
          const filterBookmarked = res.data.filter(
            (item) => item.bookmarked === "true"
          );

          setItems(filterBookmarked);
        }
      } catch (error) {
        console.error("Error fetching tourist spots:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTouristSpots();
  }, []);

  if (selectedItem.active) {
    return (
      <ShowItem
        data={selectedItem.data}
        close={() => setSelectedItem({ active: false, data: null })}
      />
    );
  }

  return (
    <div className="w-full h-full bg-white overflow-y-auto relative p-4">
      <header className="w-full flex space-x-3 justify-start items-center px-4 py-3 bg-white fixed top-0 left-0 z-[100]">
        <b className="text-2xl text-black">Bookmarks</b>
      </header>
      <div className="py-10">
        <TopPlaces
          data={items}
          setSelectedItem={(dt) => setSelectedItem({ active: true, data: dt })}
        />
      </div>

      <BottomNavbar />
    </div>
  );
};

export default BookmarkScreen;
