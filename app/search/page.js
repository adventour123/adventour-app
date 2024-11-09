"use client";
import { IconSearch } from "@/components/Icons";
import Ratings from "@/components/Ratings";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SearchScreen = () => {
  const [searchInput, setSearchInput] = useState("");

  const [locations, setLocation] = useState([
    {
      id: "1",
      name: "The Grand Hotel",
      address: "123 Main St, New York, NY",
      description: "A luxurious hotel with stunning views of the city skyline.",
      imgUrl: "https://wallpaperaccess.com/full/8540106.jpg",
      ratings: 4.5,
      priceRange: "$$$$",
      bookmarked: true,
    },
    {
      id: "2",
      name: "Sunset Bistro",
      address: "45 Ocean Ave, Miami, FL",
      description:
        "A seaside bistro known for fresh seafood and amazing sunsets.",
      imgUrl: "https://wallpaperaccess.com/full/8540106.jpg",
      ratings: 4.7,
      priceRange: "$$$",
      bookmarked: false,
    },
    {
      id: "3",
      name: "Green Park Botanical Gardens",
      address: "789 Park Lane, San Francisco, CA",
      description:
        "A beautiful botanical garden with exotic plants and peaceful walking trails.",
      imgUrl: "https://wallpaperaccess.com/full/8540106.jpg",
      ratings: 4.8,
      priceRange: "$",
      bookmarked: true,
    },
    {
      id: "4",
      name: "Mountain View Lodge",
      address: "500 Peaks Rd, Denver, CO",
      description:
        "A cozy lodge offering breathtaking mountain views and ski access.",
      imgUrl: "https://wallpaperaccess.com/full/8540106.jpg",
      ratings: 2.5,
      priceRange: "$$$$",
      bookmarked: false,
    },
    {
      id: "5",
      name: "The Art Gallery Café",
      address: "321 Culture Blvd, Chicago, IL",
      description:
        "A café with a curated art collection and specialty coffees.",
      imgUrl: "https://wallpaperaccess.com/full/8540106.jpg",
      ratings: 4.3,
      priceRange: "$$",
      bookmarked: false,
    },
    {
      id: "6",
      name: "Blue Lagoon Spa",
      address: "456 Wellness Way, Orlando, FL",
      description:
        "A spa and wellness center with natural hot springs and luxurious treatments.",
      imgUrl: "https://wallpaperaccess.com/full/8540106.jpg",
      ratings: 4.9,
      priceRange: "$$$",
      bookmarked: true,
    },
    {
      id: "7",
      name: "City Central Museum",
      address: "88 Heritage Ave, Boston, MA",
      description:
        "A museum showcasing historical artifacts and cultural exhibitions.",
      imgUrl: "https://wallpaperaccess.com/full/8540106.jpg",
      ratings: 4.6,
      priceRange: "$",
      bookmarked: true,
    },
    {
      id: "8",
      name: "Oceanfront Villas",
      address: "22 Beach Rd, Honolulu, HI",
      description:
        "Villas overlooking the ocean with private access to the beach.",
      imgUrl: "https://wallpaperaccess.com/full/8540106.jpg",
      ratings: 4.9,
      priceRange: "$$$$",
      bookmarked: false,
    },
    {
      id: "9",
      name: "The Mountain Grill",
      address: "99 Alpine Dr, Aspen, CO",
      description:
        "A grill restaurant famous for steaks and locally sourced ingredients.",
      imgUrl: "https://wallpaperaccess.com/full/8540106.jpg",
      ratings: 4.7,
      priceRange: "$$$",
      bookmarked: true,
    },
    {
      id: "10",
      name: "Cityscape Rooftop Lounge",
      address: "55 Skyview St, Seattle, WA",
      description:
        "A rooftop lounge with panoramic views of the city and handcrafted cocktails.",
      imgUrl: "https://wallpaperaccess.com/full/8540106.jpg",
      ratings: 4.8,
      priceRange: "$$$$",
      bookmarked: false,
    },
  ]);

  useEffect(() => {
    if (!searchInput) return;

    const filterData = () => {
      const filteredData = locations.filter((item) =>
        item.name.match(searchInput)
      );
      console.log(filteredData);
    };

    filterData();
  }, [locations, searchInput]);

  return (
    <div className="w-full h-full overflow-y-auto bg-white p-4 relative">
      <header className="w-full flex space-x-3 justify-between items-center px-4 py-3 bg-white fixed top-0 left-0 z-50">
        <Link href="/home">
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
        </Link>
        <span className="w-full flex space-x-2 items-center border border-neutral-300 rounded-3xl p-2 px-3">
          <IconSearch width={20} height={20} />
          <input
            className="w-full border-none focus:outline-none text-sm"
            placeholder="Search"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        </span>
      </header>

      <div className="mt-10 py-2">
        <div className="flex flex-col space-y-2">
          {locations.map((item) => {
            return <PlaceItem key={item.id} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export const PlaceItem = (props) => {
  return (
    <div className="w-full flex space-x-2 rounded-lg shadow-sm p-2 border border-neutral-100">
      <Image
        className="w-20 h-16 rounded-lg object-cover"
        src={props.data?.imgUrl || "/fallback-image.jpg"} // Fallback image
        width={80}
        height={60}
        alt={props.data?.name || "Place image"}
      />

      <div className="py-2">
        <p className="text-base text-black">{props.data?.name}</p>
        <div className="flex space-x-1 items-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#22c55e"
              viewBox="0 0 24 24"
              width="10"
              height="10"
            >
              <path d="M12,.042a9.992,9.992,0,0,0-9.981,9.98c0,2.57,1.99,6.592,5.915,11.954a5.034,5.034,0,0,0,8.132,0c3.925-5.362,5.915-9.384,5.915-11.954A9.992,9.992,0,0,0,12,.042ZM12,14a4,4,0,1,1,4-4A4,4,0,0,1,12,14Z" />
            </svg>
          </span>
          <p
            className="text-[10px] text-neutral-500 whitespace-nowrap"
            title={props.data?.address} // Full address on hover
          >
            {props.data?.address.length > 40
              ? props.data?.address.substring(0, 40) + "..."
              : props.data?.address}
          </p>
        </div>

        <Ratings rating={props.data?.ratings} />
      </div>
    </div>
  );
};

export default SearchScreen;
