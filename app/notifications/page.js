"use client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { fetchNotifications } from "../../config/hooks";

const NotificationScreen = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const Notifications = async () => {
      setIsLoading(true);
      setError(null); // Reset error state
      try {
        const res = await fetchNotifications();
        console.log("Notifications response: ", res);
        if (res.success) {
          if (res.data && res.data.length > 0) {
            setNotifications(res.data.reverse());
          }
        } else {
          setError("Failed to load notifications.");
        }
      } catch (error) {
        setError("Error fetching notifications.");
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    Notifications();
  }, []);

  return (
    <div className="w-full h-screen bg-white relative">
      <header className="w-full flex space-x-3 justify-start items-center px-4 py-3 bg-white fixed top-0 left-0 z-50">
        <span onClick={() => router.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="30" height="30" fill="#16a34a">
            <path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" />
          </svg>
        </span>
        <span>
          <b className="text-2xl text-black">Notifications</b>
        </span>
      </header>

      <div className="p-4 flex flex-col space-y-2 h-full overflow-y-auto pt-16">
        {isLoading && <p className="text-center text-gray-500">Loading notifications...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {notifications.length === 0 && !isLoading && !error && (
          <p className="text-center text-gray-500">No notifications available.</p>
        )}
        {notifications?.map((item, index) => {
          return <NotificationItem key={index} {...item} />;
        })}
      </div>
    </div>
  );
};

const NotificationItem = ({ subject, text, datetime }) => {
  return (
    <div className="w-full bg-white shadow-sm rounded-xl p-4 flex space-x-2 justify-between items-center border border-neutral-100">
      <span className="shrink-0 w-1 h-1 bg-green-500 rounded-full"></span>
      <div>
        <p className="text-xs text-neutral-600">
          <b className="text-black">{subject}: </b>
          {text}
        </p>
        <span className="text-[11px] text-neutral-500">
          {moment(datetime).fromNow()}
        </span>
      </div>
    </div>
  );
};

export default NotificationScreen;
