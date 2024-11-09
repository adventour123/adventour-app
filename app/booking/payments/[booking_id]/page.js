"use client";
import gcash from "@/assets/gcash.png";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
const BookingPaymentScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitting(true);
    }, 3000);
  };

  if (isSubmitted) {
    return <PaymentSuccessfull />;
  }
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
      </header>
      <div className="pt-12 px-2">
        <div className="w-full flex items-center justify-center p-4">
          <Image width={150} height={150} src={gcash} alt="gcash" />
        </div>

        <div className="p-4">
          <div className="w-full flex justify-between items-center py-1">
            <span className="text-sm text-neutral-500 font-mono">
              Agency Name
            </span>

            <b className="text-sm font-mono">Elmundo Travel&Tours</b>
          </div>
          <div className="w-full flex justify-between items-center py-1">
            <span className="text-sm text-neutral-500 font-mono">
              Payment Method
            </span>

            <b className="text-sm font-mono">Gcash</b>
          </div>

          <div className="w-full border-b my-2"></div>

          <div className="w-full flex justify-between items-center py-1">
            <span className="text-sm text-neutral-500 font-mono">
              Destination Name
            </span>

            <b className="text-sm font-mono">Honday Bay</b>
          </div>
          <div className="w-full flex justify-between items-center py-1">
            <span className="text-sm text-neutral-500 font-mono">
              Travel Date
            </span>

            <b className="text-xs font-mono">1/10/2024 - 1/20/2024</b>
          </div>

          <div className="w-full border-b my-2"></div>

          <div className="w-full flex justify-between items-center py-1">
            <span className="text-sm text-neutral-500 font-mono">
              Booking Price
            </span>

            <b className="text-sm font-mono">P 1,000.00</b>
          </div>
        </div>
      </div>
      <div className="w-full absolute bottom-2 p-4">
        <Button onPress={handleSubmit} bgColor="bg-blue-500">
          Confirm
        </Button>
      </div>
    </div>
  );
};

const PaymentSuccessfull = () => {
  return (
    <div className="w-full h-screen bg-white flex flex-col justify-center items-center p-6">
      <Link href="/home" className="absolute top-5 right-5">
        <RxCross2 size={30} />
      </Link>

      <iframe
        className="py-2"
        src="https://lottie.host/embed/d1e9e39a-06c7-4230-bc3a-1253a14ed858/blnFThLBw7.json"
      ></iframe>
      <p className="text-lg font-semibold">Payment Confirmed!</p>
      <p className="text-sm text-center py-2">
        Thank you for your payment. Your booking is now confirmed, and we’re
        excited to have you join us!
      </p>
    </div>
  );
};

export default BookingPaymentScreen;
