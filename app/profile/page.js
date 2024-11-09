"use client";

import BottomNavbar from "@/components/BottomNavbar";
import Loader from "@/components/Loader";
import Profile from "@/components/Profile";
import { auth } from "@/config/firebase_config";
import { updateUser } from "@/config/hooks";
import { DataContext } from "@/context/dataContext";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { GoBell } from "react-icons/go";
import { LuPencilLine } from "react-icons/lu";
import { RiSettings2Line } from "react-icons/ri";
import { TbLogout2, TbNotes } from "react-icons/tb";

const ProfileScreen = () => {
  const { data, setData } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  console.log("User Id", data?.userId);

  const logoutUser = async () => {
    try {
      if (!data?.userId) return;

      const newData = {
        column_name: "status",
        value: "inactive",
      };
      setIsLoading(true);

      await updateUser(newData, data?.userId);
      await signOut(auth);
      router.push("/");

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen relative bg-white p-4">
      <div className="w-full flex flex-col justify-center items-center pt-12">
        <div
          style={{
            background: `url('https://wallpaperaccess.com/full/8540106.jpg')`,
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="w-full h-40 bg-green-500 rounded-b-3xl absolute top-0 left-0"
        ></div>

        <div className="z-50">
          <Profile photoUrl={data?.user?.photoUrl} size={150} />
        </div>

        <span className="py-4">
          <p className="text-2xl font-bold text-black text-center">
            {data?.user?.username}
          </p>
          <p className="text-sm text-neutral-500 text-center">
            {data?.user?.email}
          </p>
        </span>
      </div>

      <div className="py-10">
        <ul>
          <li
            onClick={() => router.push("/booking_history")}
            className="flex space-x-2 items-center p-2"
          >
            <span>
              <TbNotes size={25} color="#333" />
            </span>
            <p className="text-lg">Booking History</p>
          </li>
          <li className="flex space-x-2 items-center p-2">
            <span>
              <LuPencilLine size={25} color="#333" />
            </span>
            <p className="text-lg">Edit Profile</p>
          </li>
          <li
            onClick={() => router.push("/notifications")}
            className="flex space-x-2 items-center p-2"
          >
            <span>
              <GoBell size={25} color="#333" />
            </span>
            <p className="text-lg">Notifications</p>
          </li>
          <li className="flex space-x-2 items-center p-2">
            <span>
              <RiSettings2Line size={25} color="#333" />
            </span>
            <p className="text-lg">Settings</p>
          </li>
          <li onClick={logoutUser} className="flex space-x-2 items-center p-2">
            <span>
              <TbLogout2 size={25} color="#333" />
            </span>
            <p className="text-lg">Log Out</p>
          </li>
        </ul>
      </div>

      <BottomNavbar />

      {isLoading && <Loader />}
    </div>
  );
};

export default ProfileScreen;
