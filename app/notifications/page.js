"use client";
import moment from "moment";
import { useRouter } from "next/navigation";

const NotificationScreen = () => {
  const router = useRouter();
  const notifications = [
    {
      id: "1",
      subject: "Flight Reminder",
      text: "Your flight to New York is scheduled for tomorrow at 8:00 AM. Please check in.",
      datetime: "2024-11-06T08:00:00Z",
    },
    {
      id: "2",
      subject: "Hotel Booking Confirmation",
      text: "Your hotel booking at The Grand is confirmed for Nov 10 - Nov 15.",
      datetime: "2024-11-05T12:00:00Z",
    },
    {
      id: "3",
      subject: "Itinerary Update",
      text: "Your itinerary has been updated with a new event: City Tour on Nov 12.",
      datetime: "2024-11-05T16:30:00Z",
    },
    {
      id: "4",
      subject: "Weather Alert",
      text: "Heavy rain expected in Paris on Nov 11. Consider packing an umbrella.",
      datetime: "2024-11-05T18:00:00Z",
    },
    {
      id: "5",
      subject: "Check-in Reminder",
      text: "Don't forget to check in for your flight to London on Nov 13.",
      datetime: "2024-11-05T14:00:00Z",
    },
    {
      id: "6",
      subject: "Discount Alert",
      text: "20% off on selected hotels in Rome. Book now and save!",
      datetime: "2024-11-05T09:00:00Z",
    },
    {
      id: "7",
      subject: "Passport Reminder",
      text: "Ensure your passport is valid for your upcoming international trip.",
      datetime: "2024-11-05T10:15:00Z",
    },
    {
      id: "8",
      subject: "Travel Insurance Reminder",
      text: "Don't forget to purchase travel insurance for your trip to Canada.",
      datetime: "2024-11-05T11:45:00Z",
    },
    {
      id: "9",
      subject: "Upcoming Reservation",
      text: "Your car rental reservation in Tokyo is confirmed for Nov 18.",
      datetime: "2024-11-05T13:30:00Z",
    },
    {
      id: "10",
      subject: "Welcome to Rewards!",
      text: "You've been enrolled in our rewards program. Start earning points today.",
      datetime: "2024-11-05T15:00:00Z",
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
