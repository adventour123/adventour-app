"use client";

import moment from "moment";
import Link from "next/link";
import Script from "next/script";
import { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { insertNotification } from "../config/hooks";
import { AuthContext } from "../context/authContext";

const PaymentSuccessfull = ({ amount, name, bookingId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const unsubscribe = async () => {
      setIsLoading(true);
      try {
        // set to the notification
        const notif = {
          id: new Date().getTime().toString(),
          uid: user?.uid,
          subject: "Payment Transaction",
          text: `Your payment of ₱${amount} for your booking of ${name} (Booking ID: ${bookingId}) has been successfully confirmed. We're looking forward to your stay!`,
          datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
        };

        const res = await insertNotification(notif);

        console.log("Payment: ", res.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    unsubscribe();
  }, [amount, name, bookingId, user?.uid]);

  if (isLoading) {
    return (
      <div className="w-full h-screen absolute inset-0 bg-white flex flex-col justify-center items-center z-[100]">
        <div className="py-4 loader">
          <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-white flex flex-col justify-center items-center p-6">
      <Link href="/home" className="absolute top-5 right-5">
        <RxCross2 size={30} />
      </Link>

      <Script
        src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
        type="module"
        strategy="afterInteractive" // Ensures the script is loaded after the page is interactive
      />

      <dotlottie-player
        src="https://lottie.host/d1e9e39a-06c7-4230-bc3a-1253a14ed858/blnFThLBw7.json"
        background="transparent"
        speed="1"
        style={{ width: "200px", height: "200px" }}
        loop
        autoplay
      ></dotlottie-player>
      <p className="text-lg font-semibold">Payment Confirmed!</p>
      <p className="text-sm text-center py-2 px-4">
        Thank you for your payment. Your booking is now confirmed, and we’re
        excited to have you join us!
      </p>
    </div>
  );
};

export default PaymentSuccessfull;
