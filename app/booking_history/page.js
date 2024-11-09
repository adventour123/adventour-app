"use client";
import { fetchUserBookings } from "@/config/hooks";
import { AuthContext } from "@/context/authContext";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const BookingHistoryScreen = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllBookings = async () => {
      setIsLoading(true); // Set loading to true when fetching data
      try {
        const res = await fetchUserBookings();
        const data = res.data;
        console.log(res);
        if (res.success) {
          const filteredData = data?.filter(
            (item) => item.userId === user?.uid
          );
          console.log(filteredData);
          setBookings(filteredData); // Set fetched bookings to state
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchAllBookings();
  }, [user?.uid]);

  return (
    <div className="w-full h-screen bg-white relative">
      <header className="w-full flex space-x-3 justify-start items-center px-4 py-3 bg-white fixed top-0 left-0 z-50">
        <span onClick={() => router.back()}>
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
        </span>
        <span>
          <b className="text-2xl text-black">Booking History</b>
        </span>
      </header>

      <div className="p-4 flex flex-col space-y-2 h-full overflow-y-auto pt-16">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading bookings...</div>
        ) : bookings && bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <BookingItem key={index} {...booking} />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-52">
            No bookings Available.
          </div>
        )}
      </div>
    </div>
  );
};

const BookingItem = (props) => {
  return (
    <div className="w-full bg-white shadow-sm rounded-xl p-4 flex space-x-2 justify-between items-center border border-neutral-100">
      <span className="shrink-0 w-1 h-1 bg-green-500 rounded-full"></span>
      <div className="">
        <p className="text-xs text-neutral-600">
          <b className="text-black"> </b>
        </p>
        <span className="text-[11px] text-neutral-500">
          {moment().fromNow()}
        </span>
      </div>
    </div>
  );
};

export default BookingHistoryScreen;
