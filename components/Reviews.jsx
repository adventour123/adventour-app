"use client";

import Ratings from "./Ratings";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      uid: "user001",
      photoUrl: "https://example.com/photos/user001.jpg",
      name: "Alice Smith",
      msg: "Great experience! The product was exactly as described.",
      ratings: 5,
      datetime: "2024-11-01T10:15:30Z",
    },
    {
      id: 2,
      uid: "user002",
      photoUrl: "https://example.com/photos/user002.jpg",
      name: "Bob Johnson",
      msg: "Service was okay, but delivery took a bit longer than expected.",
      ratings: 3,
      datetime: "2024-11-02T14:25:10Z",
    },
    {
      id: 3,
      uid: "user003",
      photoUrl: "https://example.com/photos/user003.jpg",
      name: "Catherine Lee",
      msg: "Absolutely loved it! Will definitely order again.",
      ratings: 5,
      datetime: "2024-11-03T08:45:05Z",
    },
    {
      id: 4,
      uid: "user004",
      photoUrl: "https://example.com/photos/user004.jpg",
      name: "Daniel Park",
      msg: "Product quality was good but packaging could be improved.",
      ratings: 4,
      datetime: "2024-11-03T19:30:50Z",
    },
    {
      id: 5,
      uid: "user005",
      photoUrl: "https://example.com/photos/user005.jpg",
      name: "Evelyn Green",
      msg: "Not satisfied with the product. It did not meet my expectations.",
      ratings: 2,
      datetime: "2024-11-04T09:20:30Z",
    },
    {
      id: 6,
      uid: "user006",
      photoUrl: "https://example.com/photos/user006.jpg",
      name: "Frank White",
      msg: "Decent quality for the price. Might consider buying again.",
      ratings: 3,
      datetime: "2024-11-04T16:10:15Z",
    },
    {
      id: 7,
      uid: "user007",
      photoUrl: "https://example.com/photos/user007.jpg",
      name: "Grace Kim",
      msg: "Highly recommended! Great customer service and fast delivery.",
      ratings: 5,
      datetime: "2024-11-05T11:55:40Z",
    },
  ];

  return (
    <div className="w-full flex flex-col space-y-2 py-2">
      {reviews.map((item) => {
        return <ReviewItem key={item.id} {...item} />;
      })}
    </div>
  );
};

const ReviewItem = (props) => {
  return (
    <div
      className="w-full flex space-x-2 items-center rounded-lg border border-neutral-100
    p-2"
    >
      <div
        className="w-10 h-10 shrink-0 rounded-full relative overflow-hidden
      border border-neutral-300 p-2 bg-contain bg-center bg-fixed
    "
        style={{
          background: `url(${props.photoUrl})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>

      <div className="">
        <p className="text-sm text-black">{props.name}</p>
        <p className="text-[10px] text-neutral-500">{props.msg}</p>

        <Ratings rating={props.ratings} />
      </div>
    </div>
  );
};

export default Reviews;
