"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchAllTouristSpots } from "../config/hooks";

const PopularSlides = ({ setSelectedItem }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchTouristSpots = async () => {
      try {
        const res = await fetchAllTouristSpots();

        if (res.success) {
          const highRatingItem = res.data.filter((item) => item.ratings > 3);
          console.log(highRatingItem);
          setLocations(highRatingItem);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTouristSpots();
  }, []);

  const handleSelectItem = (id) => {
    if (!id) return;

    const selectedItem = locations?.find((item) => item.id === id);
    console.log(selectedItem);
    setSelectedItem({
      data: selectedItem,
      active: true,
    });
  };

  return (
    <div className="w-full py-2">
      <b className="text-sm font-bold">Popular locations</b>

      <div className="flex space-x-3 p-2 overflow-x-auto">
        {locations?.map((item) => {
          return (
            <PopularItem
              onClick={() => handleSelectItem(item.id)}
              key={item.id}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
};

const PopularItem = (props) => {
  return (
    <div
      className="p-2 shadow-sm rounded-xl border border-neutral-100"
      onClick={props.onClick}
    >
      <div
        className="min-w-36 h-36 rounded-xl relative overflow-hidden
      border border-neutral-300 p-2 
    "
        style={{
          background: `url(${props.imgUrl})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>

      <p className="text-[12px] text-black pt-1">
        {" "}
        {props?.name.length > 20
          ? props?.name.substring(0, 20) + "..."
          : props?.name}
      </p>
      <div className="flex space-x-1 items-center bg-">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Filled"
            fill="#22c55e"
            viewBox="0 0 24 24"
            width="10"
            height="10"
          >
            <path d="M12,.042a9.992,9.992,0,0,0-9.981,9.98c0,2.57,1.99,6.592,5.915,11.954a5.034,5.034,0,0,0,8.132,0c3.925-5.362,5.915-9.384,5.915-11.954A9.992,9.992,0,0,0,12,.042ZM12,14a4,4,0,1,1,4-4A4,4,0,0,1,12,14Z" />
          </svg>
        </span>
        <p className="text-[10px] text-neutral-500">
          {props?.address.length > 25
            ? props?.address.substring(0, 25) + "..."
            : props?.address}
        </p>
      </div>
    </div>
  );
};

export default PopularSlides;
