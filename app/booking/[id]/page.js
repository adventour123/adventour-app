"use client";
import { PlaceItem } from "@/app/search/page";
import Button from "@/components/Button";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const BookingScreen = () => {
  const { id } = useParams();
  const router = useRouter();

  const [schedule, setSchedule] = useState({
    startDate: null,
    endDate: null,
  });

  const selectedItem = {
    id: "1",
    name: "The Grand Hotel",
    address: "123 Main St, New York, NY",
    description: "A luxurious hotel with stunning views of the city skyline.",
    imgUrl: "https://wallpaperaccess.com/full/8540106.jpg",
    ratings: 4.5,
    priceRange: "$$$$",
    bookmarked: true,
  };

  const [timeslots, setTime] = useState([
    {
      id: "1",
      time: "8:00 AM - 10:00 AM",
      select: false,
    },
    {
      id: "2",
      time: "10:00 AM - 12:00 PM",
      select: false,
    },
    {
      id: "3",
      time: "12:00 PM - 2:00 PM",
      select: false,
    },
    {
      id: "4",
      time: "2:00 PM - 4:00 PM",
      select: false,
    },
    {
      id: "5",
      time: "4:00 PM - 6:00 PM",
      select: false,
    },
  ]);

  const selectTimeSlot = (id) => {
    const selectedTime = timeslots.map((slot) => ({
      ...slot,
      select: slot.id === id ? !slot.select : false,
    }));
    setTime(selectedTime);
  };

  return (
    <div className="w-full h-full bg-white relative">
      <header className="w-full flex space-x-3 justify-start items-center px-4 py-3 bg-white z-[100]">
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

      <div className="px-4">
        <p className="text-2xl text-black pb-2">New Booking</p>

        <div className="">
          <span className="flex space-x-2 justify-between items-center">
            <b className="text-sm">Selected tourist spot</b>
            <div className="flex-1 border-b border-neutral-300"></div>
          </span>

          <div className="py-2">
            <PlaceItem {...selectedItem} />
          </div>
        </div>

        <div>
          <span className="flex space-x-2 justify-between items-center">
            <b className="text-sm">Schedule tour</b>
            <div className="flex-1 border-b border-neutral-300"></div>
          </span>

          <div className="w-full py-2 ">
            <p className="text-sm">Date: </p>

            <div className="flex space-x-2 py-1">
              <div className="flex flex-col">
                <label className="text-xs text-neutral-500">From:</label>
                <span className="border border-neutral-300 rounded-md px-2 py-1">
                  <input
                    className="w-full placeholder:text-neutral-500 text-sm"
                    type="date"
                    onChange={(e) => setSchedule({ startDate: e.target.value })}
                    placeholder=""
                  />
                </span>
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-neutral-500">To:</label>
                <span className="border border-neutral-300 rounded-md px-2 py-1">
                  <input
                    className="w-full placeholder:text-neutral-500 text-sm"
                    type="date"
                    onChange={(e) => setSchedule({ endDate: e.target.value })}
                    placeholder=""
                  />
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm">Time: </p>

            <div className="py-2 flex flex-wrap gap-2">
              {timeslots.map((item) => {
                return (
                  <TimeList
                    onSelect={() => selectTimeSlot(item.id)}
                    key={item.id}
                    {...item}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <span className="flex space-x-2 justify-between items-center">
            <b className="text-sm">Client Information</b>
            <div className="flex-1 border-b border-neutral-300"></div>
          </span>

          <div className="w-full py-2 ">
            <p className="text-sm">Number of Participants: </p>
            <div className="w-full flex space-x-2">
              <div className="">
                <label className="text-xs text-neutral-500">Adults</label>
                <input
                  className="w-full text-sm border border-neutral-300 p-2 rounded-md"
                  type="number"
                  placeholder="Number of adults"
                />
              </div>
              <div className="">
                <label className="text-xs text-neutral-500">Children</label>
                <input
                  className="w-full text-sm border border-neutral-300 p-2 rounded-md"
                  type="number"
                  placeholder="Number of children"
                />
              </div>
            </div>

            <div className="">
              <label className="text-xs text-neutral-500">Contact Number</label>
              <input
                className="w-full text-sm border border-neutral-300 p-2 rounded-md"
                type="text"
                placeholder="Phone number"
              />
            </div>
          </div>
        </div>

        <div className="pt-10 pb-5">
          <Button>Submit booking</Button>
        </div>
      </div>
    </div>
  );
};

const TimeList = (props) => {
  return (
    <div
      onClick={props.onSelect}
      className={`${
        props.select ? "outline-green-500" : "outline-neutral-200"
      } w-auto p-2 px-4 bg-white outline outline-1 rounded-2xl`}
    >
      <p
        className={`${
          props.select ? "text-green-500 font-semibold" : "text-neutral-500 "
        } text-xs font-sans text-center`}
      >
        {props.time}
      </p>
    </div>
  );
};
export default BookingScreen;
