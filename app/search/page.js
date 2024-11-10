"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconSearch } from "../../components/Icons";
import Ratings from "../../components/Ratings";
import { fetchAllTouristSpots } from "../../config/hooks";

const SearchScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);

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

      const filteredData = originalItems.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setItems(filteredData);
    };

    filteringData();
  }, [searchInput, originalItems]);

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
            return <PlaceItem key={item.id} data={{ ...item }} />;
          })}

          {items.length === 0 && <p className="text-center">No item found</p>}
        </div>
      </div>
    </div>
  );
};

export const PlaceItem = (props) => {
  return (
    <div className="w-full flex space-x-2 rounded-lg shadow-sm p-2 border border-neutral-100">
      <Image
        className="w-20 h-16 rounded-lg object-cover"
        src={props.data?.imgUrl || "/fallback-image.jpg"} // Fallback image
        width={80}
        height={60}
        alt={props.data?.name || "Place image"}
      />

      <div className="py-2">
        <p className="text-base text-black">{props.data?.name}</p>
        <div className="flex space-x-1 items-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#22c55e"
              viewBox="0 0 24 24"
              width="10"
              height="10"
            >
              <path d="M12,.042a9.992,9.992,0,0,0-9.981,9.98c0,2.57,1.99,6.592,5.915,11.954a5.034,5.034,0,0,0,8.132,0c3.925-5.362,5.915-9.384,5.915-11.954A9.992,9.992,0,0,0,12,.042ZM12,14a4,4,0,1,1,4-4A4,4,0,0,1,12,14Z" />
            </svg>
          </span>
          <p
            className="text-[10px] text-neutral-500 whitespace-nowrap"
            title={props.data?.address} // Full address on hover
          >
            {props.data?.address.length > 40
              ? props.data?.address.substring(0, 40) + "..."
              : props.data?.address}
          </p>
        </div>

        <Ratings rating={props.data?.ratings} />
      </div>
    </div>
  );
};

export default SearchScreen;
