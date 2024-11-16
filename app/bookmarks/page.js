"use client";
import { useContext, useEffect, useState } from "react";
import BottomNavbar from "../../components/BottomNavbar";
import ShowItem from "../../components/ShowItem";
import TopPlaces from "../../components/TopPlaces";
import { fetchAllTouristSpots, fetchBookmarks } from "../../config/hooks";
import { AuthContext } from "../../context/authContext";

const BookmarkScreen = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState({
    active: false,
    data: null,
  });
  const [bookmark, setBookmark] = useState([]);

  useEffect(() => {
    const fetchIsBookmarked = async () => {
      try {
        const bookmarks = await fetchBookmarks();

        const isBookmarked = bookmarks.data?.filter(
          (item) => item.userId === user?.uid
        );
        console.log("Isbookmarked:", isBookmarked);
        setBookmark(isBookmarked);
      } catch (error) {
        console.error("Error fetching bookmark:", error);
      }
    };

    fetchIsBookmarked();
  }, [selectedItem.data?.id, user?.uid]);
  // fetch tourist spots
  useEffect(() => {
    const fetchTouristSpots = async () => {
      setIsLoading(true);
      try {
        const res = await fetchAllTouristSpots();
        if (res.success) {
          const bookmarkFilter = bookmark?.map((item) => item.travelId); // Extract all travelIds
          const filterSpots = res.data.filter(
            (item) => bookmarkFilter.includes(item.id) // Check if item.id is in the list of travelIds
          );
          console.log("Filtered spots: ", filterSpots);
          setItems(filterSpots);
        }
      } catch (error) {
        console.error("Error fetching tourist spots:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTouristSpots();
  }, [bookmark]);

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
        <TopPlaces data={items} setSelectedItem={(dt) => setSelectedItem(dt)} />
      </div>

      <BottomNavbar />
    </div>
  );
};

export default BookmarkScreen;
