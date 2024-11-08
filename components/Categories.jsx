"use client";

import { fetchAllCategories } from "@/config/hooks";
import { DataContext } from "@/context/dataContext";
import { useContext, useEffect, useState } from "react";

const Categories = () => {
  const { data, setData } = useContext(DataContext);
  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchCategories = async () => {
      try {
        const res = await fetchAllCategories();

        if (res.success) {
          const updatedCategories = res.data.map((category) => ({
            ...category,
            active: category.active === "true",
          }));

          setCategories(updatedCategories);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategory = (id) => {
    const updatedCategories = categories.map((category) => ({
      ...category,
      active: category.id === id,
    }));
    setCategories(updatedCategories);

    // Filter data based on the selected category
    const selectedCategory = updatedCategories.find((item) => item.id === id);

    setData((prevData) => ({
      ...prevData,
      category: selectedCategory.category,
    }));
  };
  return (
    <div className="w-full py-2">
      <b className="text-sm font-bold">Categories</b>

      <div className="flex space-x-3 p-2 overflow-x-auto">
        {categories.map((item) => {
          return (
            <CategoryItem
              onClick={() => handleCategory(item.id)}
              key={item.id}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
};

const CategoryItem = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`${
        props.active ? "outline-green-500" : "outline-neutral-200"
      } w-auto p-2 px-4 bg-white outline outline-1  rounded-2xl`}
    >
      <p
        className={`${
          props.active ? "text-green-500 font-semibold" : "text-neutral-500 "
        } text-xs font-sans text-center whitespace-nowrap`}
      >
        {props.category}
      </p>
    </div>
  );
};

export default Categories;
