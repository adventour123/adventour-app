"use client";
import moment from "moment";
import { useRouter } from "next/navigation";

const NotificationScreen = () => {
  const router = useRouter();
  const notifications = [
    {
      id: "1",
      subject: "Booking Confirmation",
      text: "Your booking for the Bali tour has been confirmed. Check your itinerary for details.",
      datetime: "2024-11-05T15:00:00Z",
    },
    {
      id: "2",
      subject: "Flight Reminder",
      text: "Your flight to New York is scheduled for tomorrow at 8:00 AM. Please check in.",
      datetime: "2024-11-06T08:00:00Z",
    },
    {
      id: "3",
      subject: "Tour Departure Reminder",
      text: "Your city tour to Paris departs tomorrow at 9:00 AM. Make sure you're on time!",
      datetime: "2024-11-06T10:00:00Z",
    },
    {
      id: "4",
      subject: "Payment Confirmation",
      text: "Your payment for the Rome tour package has been successfully processed.",
      datetime: "2024-11-07T12:30:00Z",
    },
    {
      id: "5",
      subject: "Upcoming Tour Reminder",
      text: "Your booked tour to Tokyo is coming up next week. Don't forget to pack your essentials!",
      datetime: "2024-11-08T09:00:00Z",
    },
    {
      id: "6",
      subject: "Hotel Booking Confirmation",
      text: "Your reservation at the Parisian Hotel has been confirmed. Check-in details are in your itinerary.",
      datetime: "2024-11-09T13:00:00Z",
    },
    {
      id: "7",
      subject: "Flight Change Notification",
      text: "Your flight to Sydney has been rescheduled to 12:00 PM tomorrow.",
      datetime: "2024-11-09T17:45:00Z",
    },
    {
      id: "8",
      subject: "Tour Booking Reminder",
      text: "Your guided tour of the Grand Canyon is scheduled for tomorrow at 10:00 AM.",
      datetime: "2024-11-10T08:00:00Z",
    },
    {
      id: "9",
      subject: "Itinerary Update",
      text: "There has been an update to your Tokyo itinerary. Please check your schedule.",
      datetime: "2024-11-10T12:00:00Z",
    },
    {
      id: "10",
      subject: "Payment Reminder",
      text: "Your payment for the Maldives vacation is due tomorrow. Please complete it to confirm your booking.",
      datetime: "2024-11-10T14:00:00Z",
    },
    {
      id: "11",
      subject: "Booking Canceled",
      text: "Your booking for the Hawaii tour has been canceled as per your request.",
      datetime: "2024-11-11T09:30:00Z",
    },
    {
      id: "12",
      subject: "Special Offer",
      text: "Limited-time offer: Book your next tour with us and get 20% off!",
      datetime: "2024-11-11T11:00:00Z",
    },
    {
      id: "13",
      subject: "New Booking Available",
      text: "New tour packages to Bali are now available! Book your trip today.",
      datetime: "2024-11-11T12:00:00Z",
    },
    {
      id: "14",
      subject: "Tour Reminder",
      text: "Don't forget your zip-lining tour in Costa Rica tomorrow at 11:00 AM.",
      datetime: "2024-11-12T08:00:00Z",
    },
    {
      id: "15",
      subject: "Hotel Check-In Reminder",
      text: "Your hotel check-in for the London stay is scheduled for 3:00 PM tomorrow.",
      datetime: "2024-11-12T10:00:00Z",
    },
    {
      id: "16",
      subject: "Tour Feedback Request",
      text: "We hope you enjoyed your visit to the Eiffel Tower. Please share your feedback with us.",
      datetime: "2024-11-12T15:00:00Z",
    },
    {
      id: "17",
      subject: "Flight Booking Reminder",
      text: "Your flight to Tokyo is confirmed for tomorrow at 9:00 AM. Check your flight details.",
      datetime: "2024-11-13T07:00:00Z",
    },
    {
      id: "18",
      subject: "Booking Status Update",
      text: "Your booking for the Dubai tour has been successfully updated. Check your new itinerary.",
      datetime: "2024-11-13T11:30:00Z",
    },
    {
      id: "19",
      subject: "Tour Package Expiry",
      text: "Your exclusive tour package for Greece will expire in 24 hours. Don't miss out!",
      datetime: "2024-11-13T14:00:00Z",
    },
    {
      id: "20",
      subject: "Booking Reminder",
      text: "Your booking for the Venice gondola ride is confirmed for tomorrow at 5:00 PM.",
      datetime: "2024-11-13T16:00:00Z",
    },
  ];

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

        <span>
          <b className="text-2xl text-black">Notifications</b>
        </span>
      </header>

      <div className="p-4 flex flex-col space-y-2 h-full overflow-y-auto pt-16">
        {notifications.map((item) => {
          return <NotificationItem key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
};

const NotificationItem = (props) => {
  return (
    <div
      className="w-full bg-white shadow-sm rounded-xl p-4
      flex space-x-2 justify-between items-center border border-neutral-100"
    >
      <span className="shrink-0 w-1 h-1 bg-green-500 rounded-full"></span>
      <div className="">
        <p className="text-xs text-neutral-600">
          <b className="text-black">{props.subject}: </b>
          {props.text}
        </p>
        <span className="text-[11px] text-neutral-500">
          {moment(props.datetime).fromNow()}
        </span>
      </div>
    </div>
  );
};

export default NotificationScreen;
