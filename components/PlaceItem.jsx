"use client";
import Image from "next/image";
import Ratings from "./Ratings";

const PlaceItem = (props) => {
  return (
    <div
      onClick={props.onPress}
      className="w-full flex space-x-2 rounded-lg shadow-sm p-2 border border-neutral-100"
    >
      <Image
        className="w-20 h-16 rounded-lg object-cover"
        src={props.data?.imgUrl || "/fallback-image.jpg"} // Fallback image
        width={80}
        height={60}
        alt={props.data?.name || "Place image"}
      />

      <div className="">
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

export default PlaceItem;
