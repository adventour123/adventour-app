"use client";

import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FaPesoSign } from "react-icons/fa6";
import gcash from "../assets/gcash.png";
import { addBooking, insertNotification } from "../config/hooks";
import { DataContext } from "../context/dataContext";
import Button from "./Button";
import PaymentSuccessfull from "./PaymentSuccessfull";

const GcashPaymentScreen = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitting] = useState(false);
  const { data, setData } = useContext(DataContext);

  console.log(props.formdata);
  const generateBookingNotificationText = (booking) => {
    return `Your booking for ${booking.name} on ${moment(booking.date).format(
      "MMMM Do, YYYY"
    )} has been successfully added. Check your itinerary for details.`;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log(props.formdata);

      const res = await addBooking(props.formdata);

      if (res && res.success) {
        setIsSubmitting(true);

        // set to the notification
        const notif = {
          id: new Date().getTime().toString(),
          subject: "Booked Added",
          text: generateBookingNotificationText({
            name: props.data.name,
            date: props.formdata.datetime,
          }),
          datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
        };

        const res = await insertNotification(notif);
        console.log(res);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <PaymentSuccessfull
        amount={props.data.priceRange}
        name={props.travelName}
        bookingId={props.formdata.bookId}
      />
    );
  }
  return (
    <div className="w-full h-screen bg-white relative">
      <header className="w-full flex space-x-3 justify-start items-center px-4 py-3 bg-white fixed top-0 left-0 z-50">
        <span onClick={props.back}>
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
            <span className="text-xs text-neutral-500 font-mono">
              Booked Name
            </span>

            <b className="text-xs font-mono">{props.data.name}</b>
          </div>
          <div className="w-full flex justify-between items-center py-1">
            <span className="text-xs text-neutral-500 font-mono">
              Payment Method
            </span>

            <b className="text-xs font-mono">Gcash</b>
          </div>

          <div className="w-full border-b my-2"></div>

          <div className="w-full flex justify-between items-center py-1">
            <span className="text-xs text-neutral-500 font-mono">
              Email Address
            </span>

            <b className="text-xs font-mono">{props.formdata.email}</b>
          </div>
          <div className="w-full flex justify-between items-center py-1">
            <span className="text-xs text-neutral-500 font-mono">
              Travel Date
            </span>

            <b className="text-xs font-mono">{`${props.formdata.startDate
              .split("-")
              .join("/")} - ${props.formdata.endDate.split("-").join("/")}`}</b>
          </div>

          <div className="w-full border-b my-2"></div>

          <div className="w-full flex justify-between items-center py-1">
            <span className="text-xs text-neutral-500 font-mono">
              Booking Price
            </span>

            <b className="text-base font-mono flex space-x-1 items-center">
              <FaPesoSign /> {props.formdata.bookingPrice}
            </b>
          </div>
        </div>
      </div>
      <div className="w-full absolute bottom-2 p-4">
        <Button onPress={handleSubmit} bgColor="bg-blue-500">
          {isLoading ? "Processing payment..." : "Confirm Payment"}
        </Button>
      </div>
    </div>
  );
};

export default GcashPaymentScreen;
