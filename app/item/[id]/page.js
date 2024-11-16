"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FaPesoSign } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoBookmark } from "react-icons/io5";
import { MdBookmarkBorder } from "react-icons/md";
import Button from "../../../components/Button";
import Ratings from "../../../components/Ratings";
import Reviews from "../../../components/Reviews";

const PlaceItemScreen = () => {
  const { id } = useParams();
  const router = useRouter();
  const [bookmark, setBookmark] = useState({
    id: 1,
    booked: false,
  });

  return (
    <div className="w-full h-full bg-white relative p-4 pb-16">
      <div
        className="w-full min-h-80 rounded-3xl bg-white shadow-md p-4 overflow-hidden"
        style={{
          background: `url('https://i.pinimg.com/736x/bf/e1/1d/bfe11d05d69527f8d4891033a9c6b10c.jpg')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex justify-between items-center">
          <span
            onClick={() => router.back()}
            className="bg-white/50 rounded-full p-1"
          >
            <IoIosArrowBack size={25} color="#fff" />
          </span>

          <span
            className="bg-white/50 rounded-full p-1"
            onClick={() =>
              setBookmark({
                id: 1,
                booked: !bookmark.booked,
              })
            }
          >
            {bookmark.booked ? (
              <IoBookmark size={25} color="#fff" />
            ) : (
              <MdBookmarkBorder size={25} color="#fff" />
            )}
          </span>
        </div>
      </div>
      <div className="h-full py-2 px-2">
        <div className="w-full flex space-x-4 justify-between items-start">
          <div className="">
            <p className="text-xl font-semibold text-black pt-1">
              Balayong Park
            </p>
            <div className="flex space-x-1">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Filled"
                  fill="#22c55e"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                >
                  <path d="M12,.042a9.992,9.992,0,0,0-9.981,9.98c0,2.57,1.99,6.592,5.915,11.954a5.034,5.034,0,0,0,8.132,0c3.925-5.362,5.915-9.384,5.915-11.954A9.992,9.992,0,0,0,12,.042ZM12,14a4,4,0,1,1,4-4A4,4,0,0,1,12,14Z" />
                </svg>
              </span>
              <p className="text-xs text-neutral-500 ">
                Brgy. Tiniguiban, Puerto Princesa City, Palawan
              </p>
            </div>
          </div>

          <div className="flex space-x-1 items-center pt-2">
            <Ratings size={13} rating={4} />
            <p className="text-neutral-500 text-xs">4.5</p>
          </div>
        </div>

        <div className="py-3">
          <p className="text-xs text-neutral-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book{" "}
            <span className="text-green-500">Read more...</span>
          </p>
        </div>

        <div className="py-3">
          <b className="text-sm">Reviews</b>

          <Reviews />
        </div>
      </div>

      <BookFooter navigate={() => router.push(`/booking/${id}`)} />
    </div>
  );
};

const BookFooter = (props) => {
  return (
    <div className="w-full flex justify-between items-center fixed bottom-0 left-0 bg-white border-t border-neutral-100 p-3 rounded-t-3xl">
      <b className="text-2xl font-bold flex items-center">
        <FaPesoSign />
        2,500
      </b>

      <div onClick={props.navigate} className="min-w-40">
        <Button fontSize="xl">Book now</Button>
      </div>
    </div>
  );
};

export default PlaceItemScreen;
