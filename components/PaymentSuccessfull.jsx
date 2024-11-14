"use client"

import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import Script from "next/script";


const PaymentSuccessfull = () => {
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

export default PaymentSuccessfull