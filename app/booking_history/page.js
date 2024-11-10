"use client";

import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { fetchAllTouristSpots, fetchUserBookings } from "../../config/hooks";
import { AuthContext } from "../../context/authContext";

const BOOKING_STATUSES = {
  ALL: "all",
  APPROVED: "approved",
  PENDING: "pending",
  COMPLETED: "completed",
};

const BookingHistoryScreen = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [bookingsWithDetails, setBookingsWithDetails] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(BOOKING_STATUSES.ALL);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid) return;

      setIsLoading(true);
      setError(null);

      try {
        // Fetch bookings
        const bookingsRes = await fetchUserBookings();
        if (!bookingsRes.success) {
          throw new Error("Failed to fetch bookings.");
        }

        // Filter for user's bookings
        const userBookings = bookingsRes.data?.filter(
          (item) => item.userId === user.uid
        );

        // Fetch tourist spots
        const spotsRes = await fetchAllTouristSpots();
        if (!spotsRes.success) {
          throw new Error("Failed to fetch tourist spots.");
        }

        // Combine booking data with tourist spot details
        const enrichedBookings = userBookings
          .map((booking) => ({
            ...booking,
            spotDetails: spotsRes.data.find(
              (spot) => spot.id === booking.travelId
            ),
          }))
          .filter((booking) => booking.spotDetails); // Only include bookings with valid spot details

        setBookingsWithDetails(enrichedBookings);
        setFilteredBookings(enrichedBookings);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user?.uid]);

  useEffect(() => {
    setIsFiltering(true);
    // Filter bookings when status changes
    if (selectedStatus === BOOKING_STATUSES.ALL) {
      setFilteredBookings(bookingsWithDetails);
    } else {
      const filtered = bookingsWithDetails.filter(
        (booking) => booking.status?.toLowerCase() === selectedStatus
      );

      setFilteredBookings(filtered);
      setIsFiltering(isLoading);
    }
  }, [isLoading, selectedStatus, bookingsWithDetails]);

  return (
    <div className="w-full h-screen bg-white relative">
      <Header onBack={() => router.back()} />

      <section className="relative w-full flex flex-col space-y-2 px-4">
        <StatusFilter
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        <div className="w-full h-2 border-b border-neutral-500 "></div>
        <main className="pt-2 flex flex-col space-y-2 overflow-y-auto h-full">
          <BookingsList
            isLoading={isLoading}
            error={error}
            bookings={filteredBookings}
          />
        </main>
      </section>
    </div>
  );
};

const Header = ({ onBack }) => (
  <header className="w-full flex space-x-3 justify-start items-center px-4 py-3 bg-white z-50">
    <button
      onClick={onBack}
      className="flex items-center justify-center"
      aria-label="Go back"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="30"
        height="30"
        fill="#16a34a"
      >
        <path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" />
      </svg>
    </button>
    <h1 className="text-2xl font-bold text-black">Booking History</h1>
  </header>
);

const StatusFilter = ({ selectedStatus, onStatusChange }) => (
  <div className="w-full flex justify-between">
    <div></div>
    <select
      value={selectedStatus}
      onChange={(e) => onStatusChange(e.target.value)}
      className="max-w-32 p-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm mb-2"
    >
      <option value={BOOKING_STATUSES.ALL}>All Bookings</option>
      <option value={BOOKING_STATUSES.APPROVED}>Approved</option>
      <option value={BOOKING_STATUSES.PENDING}>Pending</option>
      <option value={BOOKING_STATUSES.COMPLETED}>Completed</option>
    </select>
  </div>
);

const BookingsList = ({ isLoading, error, bookings }) => {
  if (isLoading) {
    return <p className="p-4 text-center text-gray-500">Loading bookings...</p>;
  }

  if (error) {
    return <p className="p-4 text-center text-red-500">{error}</p>;
  }

  if (!bookings.length) {
    return (
      <p className="p-4 text-center text-gray-500 mt-20">
        No bookings found for the selected status.
      </p>
    );
  }

  return bookings.map((booking, index) => (
    <BookingItem key={index} booking={booking} />
  ));
};

const BookingItem = ({ booking }) => {
  const { spotDetails, status } = booking;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case BOOKING_STATUSES.APPROVED:
        return "text-green-600";
      case BOOKING_STATUSES.PENDING:
        return "text-yellow-600";
      case BOOKING_STATUSES.COMPLETED:
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4 p-2 rounded-lg shadow-md bg-white border border-gray-200">
      <div className="flex items-center space-x-3">
        <Image
          className="rounded-lg object-cover"
          src={spotDetails.imgUrl || "/fallback-image.jpg"}
          width={100}
          height={100}
          alt={spotDetails.name || "Tourist spot image"}
        />

        <div className="flex flex-col justify-center">
          <p className="text-base text-gray-900">{spotDetails.name}</p>
          <p className="text-xs text-gray-600">
            {moment(spotDetails.datetime).fromNow()}
          </p>
          <p className={`text-xs ${getStatusColor(status)}`}>
            Status:{" "}
            <span className="text-xs capitalize">{status || "Pending"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryScreen;
