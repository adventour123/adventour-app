"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconSearch } from "../../components/Icons";
import PlaceItem from "../../components/PlaceItem";
import ShowItem from "../../components/ShowItem";
import { fetchAllTouristSpots } from "../../config/hooks";
const SearchScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    active: false,
    data: null,
  });

  useEffect(() => {
    // fetch tourist spots
    const fetchTouristSpots = async () => {
      setIsDataLoading(true);
      try {
        const res = await fetchAllTouristSpots();
        if (res.success) {
          setItems(res.data);
          setOriginalItems(res.data); // Store original data for filtering
        }
      } catch (error) {
        console.error("Error fetching tourist spots:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchTouristSpots();
  }, []); // Only run once on mount

  useEffect(() => {
    // filter data based on search input
    const filteringData = () => {
      if (!searchInput) {
        setItems(originalItems);
        return;
      }

      const filteredData = originalItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.address.toLowerCase().includes(searchInput.toLowerCase())
      );
      setItems(filteredData);
    };

    filteringData();
  }, [searchInput, originalItems]);

  const handleSelectItem = (id) => {
    if (!id) return;

    const selectedItem = items.find((item) => item.id === id);
    setSelectedItem({
      data: selectedItem,
      active: true,
    });
  };

  if (selectedItem.active) {
    console.log(selectedItem.data.id);
    return (
      <ShowItem
        data={selectedItem.data}
        close={() => setSelectedItem({ active: false, data: null })}
      />
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-white p-4 relative">
      <header className="w-full flex space-x-3 justify-between items-center px-4 py-3 bg-white fixed top-0 left-0 z-50">
        <Link href="/home">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="#16a34a"
          >
            <path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" />
          </svg>
        </Link>
        <span className="w-full flex space-x-2 items-center border border-neutral-300 rounded-3xl p-2 px-3">
          <IconSearch width={20} height={20} />
          <input
            className="w-full border-none focus:outline-none text-sm"
            placeholder="Search"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        </span>
      </header>

      <div className="mt-10 py-2">
        <div className="flex flex-col space-y-2">
          {items?.map((item) => {
            return (
              <div key={item.id} onClick={() => handleSelectItem(item.id)}>
                <PlaceItem data={{ ...item }} />
              </div>
            );
          })}

          {items.length === 0 && <p className="text-center">No item found</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
