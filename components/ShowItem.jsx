"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaPesoSign } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoBookmark } from "react-icons/io5";
import { MdBookmarkBorder } from "react-icons/md";
import { toggleBookmarking } from "../config/hooks";
import { DataContext } from "../context/dataContext";
import Button from "./Button";
import Ratings from "./Ratings";
import Reviews from "./Reviews";

const ShowItem = ({ data, close, index }) => {
  const router = useRouter();
  const { data: contextData } = useContext(DataContext);
  const [packages, setPackages] = useState([]);
  const [bookmark, setBookmark] = useState({
    id: 1,
    booked: data.bookmarked === "true",
  });

  // Set packages from props
  useEffect(() => {
    if (data?.packages) {
      console.log("Raw packages data:", data.packages);

      setPackages(JSON.parse(data.packages) || []);
    }
  }, [data]);

  // Toggle bookmark status
  const toggleBookmark = async () => {
    try {
      const newBookmarkStatus = !bookmark.booked;

      // Update local bookmark state
      setBookmark({
        id: index,
        booked: newBookmarkStatus,
      });

      // Update in the database
      const res = await toggleBookmarking(
        index,
        newBookmarkStatus ? "true" : "false"
      );

      if (res.success) {
        console.log("Item bookmark status updated successfully.");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  // Format description for truncation
  const formattedDescription =
    data?.description?.length > 200
      ? `${data?.description.substring(0, 200)}...`
      : data?.description;

  return (
    <div className="w-full h-full absolute inset-0 bg-white p-4">
      <div
        className="w-full min-h-80 rounded-3xl shadow-md p-4 overflow-hidden"
        style={{
          background: `url('${data.imgUrl}')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex justify-between items-center">
          <span onClick={close} className="bg-opacity-50 rounded-full p-1">
            <IoIosArrowBack size={25} color="#fff" />
          </span>

          <span
            className="bg-opacity-50 rounded-full p-1"
            onClick={toggleBookmark}
          >
            {bookmark.booked ? (
              <IoBookmark size={25} color="#fff" />
            ) : (
              <MdBookmarkBorder size={25} color="#fff" />
            )}
          </span>
        </div>
      </div>

      <div className="py-2 px-2 pb-20 bg-white">
        <div className="w-full flex space-x-4 justify-between items-start">
          <div>
            <p className="text-xl font-semibold text-black pt-1">{data.name}</p>
            <div className="flex space-x-1">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Filled"
                  fill="#22c55e"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                >
                  <path d="M12,.042a9.992,9.992,0,0,0-9.981,9.98c0,2.57,1.99,6.592,5.915,11.954a5.034,5.034,0,0,0,8.132,0c3.925-5.362,5.915-9.384,5.915-11.954A9.992,9.992,0,0,0,12,.042ZM12,14a4,4,0,1,1,4-4A4,4,0,0,1,12,14Z" />
                </svg>
              </span>
              <p className="text-xs text-neutral-800">{data.address}</p>
            </div>
          </div>

          <div className="flex space-x-1 items-center pt-2">
            <Ratings size={13} rating={4} />
            <p className="text-neutral-800 text-xs">{data.ratings}</p>
          </div>
        </div>

        <div className="py-3">
          <p className="text-xs text-neutral-800">{formattedDescription}</p>
        </div>

        {packages.length > 0 && (
          <div>
            {packages.map((item, idx) => (
              <div key={idx}>
                <h2 className="text-sm font-semibold text-neutral-800">{item.name}</h2>
                <ul className="text-xs p-2 text-neutral-800">
                  {item.tours.map((tour, i) => (
                    <li key={i}>
                      {tour.name ? `Tour ${tour.name} - ` : "Tour - "}
                      {tour.destinations ? tour.destinations.join(" | ") : tour}
                    </li>
                  ))}
                  <li>Transportation - {item.transportation}</li>
                  <li>Hotel - {item.hotel}</li>
                  <li>Price - {item.price.toLocaleString()}</li>
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="py-3">
          <b className="text-sm">Reviews & Ratings</b>
          <Reviews travelId={data.id} />
        </div>
      </div>

      <BookFooter
        priceRange={data?.priceRange}
        navigate={() => router.push(`/booking/${data.id}`)}
      />
    </div>
  );
};

const BookFooter = ({ priceRange, navigate }) => {
  return (
    <div className="w-full flex justify-between items-center fixed bottom-0 left-0 border-t border-neutral-100 p-3 rounded-t-3xl bg-white">
      <b className="text-2xl font-bold flex items-center">
        <FaPesoSign />
        {priceRange}
        <p className="text-sm text-neutral-800 font-thin">/ Package</p>
      </b>

      <div onClick={navigate} className="min-w-40">
        <Button fontSize="xl">Book now</Button>
      </div>
    </div>
  );
};

export default ShowItem;
