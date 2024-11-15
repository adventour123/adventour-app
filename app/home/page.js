"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { GoBellFill } from "react-icons/go";

import BottomNavbar from "../../components/BottomNavbar";
import Categories from "../../components/Categories";
import { IconSearch } from "../../components/Icons";
import Loader from "../../components/Loader";
import PopularSlides from "../../components/PopularSlides";
import Profile from "../../components/Profile";
import ShowItem from "../../components/ShowItem";
import TopPlaces from "../../components/TopPlaces";
import {
  fetchAllTouristSpots,
  fetchAllUser,
  fetchNotifications,
} from "../../config/hooks";
import { AuthContext } from "../../context/authContext";
import { DataContext } from "../../context/dataContext";
const HomeScreen = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { data, setData } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [newNotif, setNewnotif] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: 1,
    active: false,
    data: null,
  });
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notifiedBookings, setNotifiedBookings] = useState([]);

  // useEffect(() => {
  //   const setBookingNotif = async () => {
  //     try {
  //       // Fetch user bookings
  //       const res = await fetchUserBookings();

  //       // Fetch all spots
  //       const spots = await fetchAllTouristSpots();

  //       // Filter for user's bookings
  //       const userBookings = res.data?.filter(
  //         (item) => item.userId === user?.uid
  //       );

  //       // Retrieve notified bookings from localStorage (or state if using a global store)
  //       const notifiedBookings = JSON.parse(localStorage.getItem('notifiedBookings')) || [];

  //       // Find the first approved booking that hasn't been notified
  //       const approvedBooking = userBookings?.find(
  //         (item) => item.status === "approved" && !notifiedBookings.includes(item.id)
  //       );

  //       // If no approved booking or already notified, exit early
  //       if (!approvedBooking) return;

  //       // Find the corresponding spot for the approved booking
  //       const fetchSpotItem = spots.data?.find(
  //         (item) => item.id === approvedBooking.travelId
  //       );

  //       // If no corresponding spot found, exit early
  //       if (!fetchSpotItem) return;

  //       console.log("Spots: ", fetchSpotItem);

  //       // Create the notification
  //       const notif = {
  //         id: new Date().getTime().toString(),
  //         subject: "Booking Confirmation",
  //         text: `Your booking for ${fetchSpotItem.name} has been confirmed. Thank you for traveling with us!`,
  //         datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
  //       };

  //       // Insert the notification (assuming `insertNotification` is an API call)
  //       const notifRes = await insertNotification(notif);

  //       // Add the approved booking ID to the notifiedBookings list to prevent further notifications for the same booking
  //       notifiedBookings.push(approvedBooking.id);
  //       localStorage.setItem('notifiedBookings', JSON.stringify(notifiedBookings)); // Store it in localStorage to persist across mounts

  //     } catch (error) {
  //       console.error("Error fetching notifications:", error);
  //     }
  //   };

  //   // Set up polling every 30 seconds to check for approved bookings
  //   const intervalId = setInterval(setBookingNotif, 30000); // 30 seconds interval

  //   // Clean up the interval on component unmount
  //   return () => {
  //   setBookingNotif()
  //     clearInterval(intervalId)
  //   };

  // }, [user]);  // Depend on `user` to trigger the check when user changes

  // real time changes
  useEffect(() => {
    const Notifications = async () => {
      try {
        const res = await fetchNotifications();

        if (res.data && res.data.length > 0) {
          const filteredNotif = await res.data?.filter(
            (item) => item.uid === user?.uid
          );
          setNotifications(filteredNotif);
        } else {
          console.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    // Initial fetch when the component mounts
    Notifications();
  }); // Runs everytime

  // fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) return; // Guard clause for when user is not available

      setIsLoading(true);
      try {
        const { users } = await fetchAllUser();
        const currentUser = users.find((item) => item.uid === user.uid);
        const index = users.findIndex((item) => item.uid === user.uid);

        setData((prevData) => ({
          ...prevData,
          user: currentUser,
          userId: index,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [setData, user?.uid]);

  // fetch tourist spots
  useEffect(() => {
    const fetchTouristSpots = async () => {
      setIsDataLoading(true);
      try {
        const res = await fetchAllTouristSpots();
        if (res.success) {
          setItems(res.data);
          setOriginalItems(res.data);
          setData((prevData) => ({
            ...prevData,
            touristSpots: res.data,
          }));
        }
      } catch (error) {
        console.error("Error fetching tourist spots:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchTouristSpots();
  }, [setData]);

  const filterData = (category) => {
    if (!category || category === "All") {
      setItems(originalItems);
      return;
    }

    const filteredData = originalItems.filter((item) =>
      item.categories.toLowerCase().includes(category.toLowerCase())
    );
    setItems(filteredData);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (selectedItem.active) {
    console.log(selectedItem.data.id);
    return (
      <ShowItem
        index={selectedItem.id}
        data={selectedItem.data}
        close={() => setSelectedItem({ active: false, data: null })}
      />
    );
  }

  const truncateUsername = (username, maxLength = 20) => {
    if (!username) return "";
    return username.length > maxLength
      ? `${username.substring(0, maxLength)}...`
      : username;
  };

  return (
    <div className="w-full h-screen bg-white overflow-y-auto relative">
      <header className="w-full flex justify-between items-center px-4 py-3 bg-white fixed top-0 left-0 z-[100]">
        <span className="flex flex-col -space-y-1">
          <h1 className="text-xl leading-tight">Hello</h1>
          <b className="text-green-500 text-base">
            {truncateUsername(data?.user?.username)}
          </b>
        </span>
        <span className="flex space-x-2 items-center">
          <button
            onClick={() => router.push("/notifications")}
            className="relative bg-neutral-100 p-1 rounded-full"
            aria-label="Notifications"
          >
            <GoBellFill size={25} color="#22c55e" />
            {notifications.length !== 0 && (
              <span className="flex justify-center items-center absolute top-0 right-0 bg-red-500 rounded-full text-[10px] text-white px-1">
                {notifications.length}
              </span>
            )}
          </button>
          <Profile photoUrl={data?.user?.photoUrl} />
        </span>
      </header>

      <main className="w-full px-4 bg-white py-16">
        <h2 className="text-4xl max-w-72 font-sans pb-2">
          Where would you like to go?
        </h2>

        <button
          onClick={() => router.push("/search")}
          className="w-full flex space-x-2 justify-start items-center border border-neutral-300 rounded-3xl p-3 bg-white"
          aria-label="Search"
        >
          <IconSearch width={20} height={20} />
          <p className="border-none text-neutral-500 text-base z-50">Search</p>
        </button>

        <section>
          <PopularSlides
            data={originalItems}
            setSelectedItem={(dt) => setSelectedItem(dt)}
          />
        </section>

        <section>
          <Categories filter={filterData} />
        </section>

        <section>
          <TopPlaces
            isLoading={isDataLoading}
            data={items}
            setSelectedItem={(dt) => setSelectedItem(dt)}
          />
        </section>
      </main>

      <BottomNavbar />
    </div>
  );
};

export default HomeScreen;
