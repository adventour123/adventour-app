import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { DataContext } from "../context/dataContext";
import Ratings from "./Ratings";
const TopPlaces = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useContext(DataContext);

  const handleSelectItem = (id, index) => {
    if (!id) return;
    console.log("Index: ", index + 1);
    console.log("ID: ", id);

    const selectedItem = props.data?.find((item) => item.id === id);
    props.setSelectedItem({
      id: index + 1,
      data: selectedItem,
      active: true,
    });
  };

  return (
    <div className="w-full py-2 relative">
      <div className="flex flex-wrap space-y-2">
        {props.data?.map((item, index) => {
          return (
            <PlaceItem
              onClick={() => handleSelectItem(item.id, index)}
              key={item.id}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
};

const PlaceItem = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`w-full h-44  bg-white rounded-lg relative overflow-hidden
      border border-neutral-300 p-2 bg-contain bg-center bg-no-repeat
    `}
      style={{
        background: `url(${props.imgUrl})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 from-black/50 to-black/5 bg-gradient-to-t z-40"></div>

      <span className="absolute top-3 right-3 z-50">
        {props?.bookmarked === "true" ? (
          <GoBookmarkFill size={20} color="#fff" />
        ) : (
          <GoBookmark size={20} color="#fff" />
        )}
      </span>

      <div className="py-2 absolute bottom-0 z-50">
        <p className="text-base font-semibold text-white">{props?.name}</p>
        <div className="flex space-x-1 items-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Filled"
              fill="#fefefe"
              viewBox="0 0 24 24"
              width="10"
              height="10"
            >
              <path d="M12,.042a9.992,9.992,0,0,0-9.981,9.98c0,2.57,1.99,6.592,5.915,11.954a5.034,5.034,0,0,0,8.132,0c3.925-5.362,5.915-9.384,5.915-11.954A9.992,9.992,0,0,0,12,.042ZM12,14a4,4,0,1,1,4-4A4,4,0,0,1,12,14Z" />
            </svg>
          </span>
          <p className="text-[10px] text-white whitespace-nowrap">
            {props?.address}
          </p>
        </div>

        <Ratings rating={props?.ratings} />
      </div>
    </div>
  );
};

export default TopPlaces;