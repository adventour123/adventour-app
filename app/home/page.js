"use client";

import BottomNavbar from "@/components/BottomNavbar";
import Categories from "@/components/Categories";
import { IconSearch } from "@/components/Icons";
import Loader from "@/components/Loader";
import PopularSlides from "@/components/PopularSlides";
import Profile from "@/components/Profile";
import TopPlaces from "@/components/TopPlaces";
import { fetchAllUser } from "@/config/hooks";
import { AuthContext } from "@/context/authContext";
import { DataContext } from "@/context/dataContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { GoBellFill } from "react-icons/go";

const HomeScreen = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { data, setData } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);

  // fetch user data
  useEffect(() => {
    setIsLoading(true);
    const fetchUserData = async () => {
      try {
        const { users } = await fetchAllUser();

        const currentUser = users.find((item) => item.uid === user?.uid);
        const index = users.findIndex((item) => item.uid === user?.uid);
        console.log("Index: ", index);

        setData((prevData) => ({
          ...prevData,
          user: currentUser,
          userId: index,
        }));

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [setData, user?.uid]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-screen bg-white overflow-y-auto relative">
      <header
        className="w-full flex justify-between items-center px-4 py-3 bg-white fixed top-0 left-0 z-[100]
      "
      >
        <span className="flex flex-col -space-y-1">
          <h1 className="text-xl leading-tight">Hello</h1>
          <b className="text-green-500 text-base">
            {data?.user?.username.length > 20
              ? data?.user?.username.substring(0, 20) + "..."
              : data?.user?.username}
          </b>
        </span>
        <span className="flex space-x-2 items-center">
          <div
            onClick={() => router.push("/notifications")}
            className="relative bg-neutral-100 p-1 rounded-full"
          >
            <GoBellFill size={25} color="#22c55e" />

            <span className="flex justify-center items-center absolute top-0 right-0 bg-red-500 rounded-full text-[10px] text-white px-1">
              1
            </span>
          </div>

          <Profile photoUrl={data?.user?.photoUrl} />
        </span>
      </header>

      <div className="w-full px-4 bg-white py-16">
        <p className="text-4xl max-w-72 font-sans pb-2">
          Where would you like to go?
        </p>

        <span
          onClick={() => router.push("/search")}
          className="w-full flex space-x-2 items-center border border-neutral-300 rounded-3xl p-3 bg-white"
        >
          <IconSearch width={20} height={20} />
          <p className="w-full border-none text-neutral-500 text-base z-50">
            Search
          </p>
        </span>

        <div>
          <PopularSlides />
        </div>

        <div>
          <Categories />
        </div>

        <div>
          <TopPlaces />
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default HomeScreen;
