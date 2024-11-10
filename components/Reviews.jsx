"use client";

import moment from "moment";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa6";
import {
  fetchAllReviews,
  fetchAllUser,
  fetchUserBookings,
  insertReview,
} from "../config/hooks";
import { DataContext } from "../context/dataContext";
import { defaultProfile } from "./Profile";
import Ratings from "./Ratings";

const Reviews = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const { data } = useContext(DataContext);

  const [rating, setRating] = useState(0); // For the user's rating
  const [value, setValue] = useState(""); // For the review message
  const [wasBooked, setIfBooked] = useState(false);
  // Get all reviews
  useEffect(() => {
    if (!props.travelId) return;

    const fetchReviews = async () => {
      try {
        const res = await fetchAllReviews();
        if (res.success) {
          const filteredData = res.data?.filter(
            (item) => item.travelId === props.travelId
          );
          setReviews(filteredData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [props.travelId]);

  // Fetch all users for reviews
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await fetchAllUser();
        const usersId = reviews?.map((item) => item.userId);
        const filteredUsers = res.users?.filter((user) =>
          usersId.includes(user.uid)
        );
        console.log(filteredUsers);

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [reviews]);

  // Combine reviews and users data
  useEffect(() => {
    if (reviews.length && users.length) {
      const combinedData = reviews.map((review) => {
        console.log(review);

        const user = users.find((user) => user.uid === review.userId);
        console.log(user);

        return {
          ...review,
          name: user?.name,
          photoUrl: user?.photoUrl,
          ratings: review.ratings, // Include ratings from review
        };
      });

      console.log("Combined Data:", combinedData);
      setReviewsData(combinedData);
    }
  }, [reviews, users]);

  const [isEmptyValue, setIsEmptyValue] = useState(false);

  const handleSubmit = async () => {
    if (!value) {
      setIsEmptyValue(true);
      return;
    }

    const newReview = {
      travelId: props.travelId,
      userId: data?.user?.uid,
      name: data?.user?.username,
      message: value,
      ratings: rating, // Send the selected rating
    };
    await insertReview(newReview); // Assuming insertReview takes the newReview as an argument
    setReviewsData([
      ...reviewsData,
      {
        ...newReview,
        name: data?.user?.username,
        photoUrl: data?.user?.photoUrl,
      },
    ]); // Update the local state with the new review
    setValue(""); // Clear the review message
    setRating(0); // Clear the rating
    setIsEmptyValue(false);
  };

  const handleRatings = (newRating) => {
    setRating(newRating); // Update the rating in the parent component
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetchUserBookings();
        if (res.success) {
          const filteredData = res.data.find(
            (item) => item.travelId === props.travelId
          );
          const isAlreadyBooked = filteredData.status === "completed";
          console.log("Already booked?: ", isAlreadyBooked);
          setIfBooked(isAlreadyBooked);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  }, [props.travelId]);

  return (
    <div className="">
      {reviewsData.length > 0 && (
        <div className="w-full relative min-h-72 overflow-y-auto flex flex-col space-y-2 py-2 px-2 border border-neutral-200 rounded-lg">
          {isLoading ? (
            <p className="text-neutral-500">Loading...</p>
          ) : (
            reviewsData.map((item) => <ReviewItem key={item.id} {...item} />)
          )}
        </div>
      )}

      {wasBooked && (
        <div className="py-4">
          <p className="text-xs text-neutral-300">Rate us</p>
          <div className="py-2">
            <Ratings rating={rating} size={30} onRatingChange={handleRatings} />
          </div>
          <p className="text-xs text-neutral-300 pb-2">Review</p>
          <ReviewForm
            emptyInput={isEmptyValue}
            value={value}
            setValue={setValue}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};

const ReviewForm = (props) => {
  return (
    <div className="w-full flex flex-col items-end">
      <span
        className={`${
          props.emptyInput ? "border-red-500" : "border-neutral-200 "
        } w-full flex space-x-3 items-center h-24 rounded-md border p-3`}
      >
        <textarea
          className="w-full outline-none text-sm h-full resize-none"
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
        ></textarea>
      </span>
      <div
        className="max-w-32 py-2 rounded-xl flex justify-center items-center space-x-3 bg-green-500 px-3 my-2"
        onClick={props.onSubmit}
      >
        <FaRegPaperPlane size={20} color="#fff" />
        <p className="text-white text-base">Send</p>
      </div>
    </div>
  );
};

const ReviewItem = (props) => {
  return (
    <div className="w-full rounded-lg border border-neutral-100 p-2">
      <header className="w-full flex justify-between">
        <div className="flex space-x-2">
          <Image
            className="w-12 h-12 shrink-0 rounded-full relative overflow-hidden border border-neutral-300 bg-contain bg-center bg-fixed"
            src={props.photoUrl || defaultProfile} // Fallback image
            width={80}
            height={60}
            alt={props.data?.name}
          />

          <div className="flex flex-col">
            <p className="text-base text-black">{props.name}</p>
            <p className="text-sm text-neutral-500">
              {moment().fromNow(props.datetime)}
            </p>
          </div>
        </div>
        <div>
          <Ratings rating={props.ratings} size={15} />
        </div>
      </header>

      <div className="p-2">
        <p className="text-base text-neutral-500">{props.message}</p>
      </div>
    </div>
  );
};

export default Reviews;
