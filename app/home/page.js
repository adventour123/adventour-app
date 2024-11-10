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
import { fetchAllTouristSpots, fetchAllUser } from "../../config/hooks";
import { AuthContext } from "../../context/authContext";
import { DataContext } from "../../context/dataContext";

const HomeScreen = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { data, setData } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    active: false,
    data: null,
  });
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);

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
          setOriginalItems(res.data); // Store original data for filtering
        }
      } catch (error) {
        console.error("Error fetching tourist spots:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchTouristSpots();
  }, []);

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
            <span className="flex justify-center items-center absolute top-0 right-0 bg-red-500 rounded-full text-[10px] text-white px-1">
              1
            </span>
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
            data={items}
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
