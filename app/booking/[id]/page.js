"use client";

import { PlaceItem } from "@/app/search/page";
import gcash from "@/assets/gcash.png";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { fetchAllTouristSpots } from "@/config/hooks";
import { AuthContext } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaPesoSign } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const BookingScreen = () => {
  const { id } = useParams();
  const router = useRouter();

  // States
  const [activePaymentScreen, setActivePaymentScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    contactNumber: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(AuthContext);

  // Fetch tourist spot details
  useEffect(() => {
    if (!id) return;

    const fetchTouristSpots = async () => {
      setIsLoading(true);
      try {
        const res = await fetchAllTouristSpots();
        if (res.success) {
          const selected = res.data.find((item) => item.id === id);
          console.log(selected);
          setSelectedItem(selected);
        }
      } catch (error) {
        console.error("Error fetching tourist spots:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTouristSpots();
  }, [id]);

  const bookingData = {
    bookId: new Date().getTime().toString(),
    travelId: id,
    userId: user?.uid,
    bookingPrice: selectedItem.priceRange,
    status: "pending",
    ...formData,
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10,}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Please enter a valid contact number";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    if (!validateForm()) return;

    setTimeout(() => {
      setIsSubmitting(false);
      setActivePaymentScreen(true);
    }, 2000);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (activePaymentScreen && !isSubmitting) {
    return (
      <PaymentScreen
        data={selectedItem}
        formdata={bookingData}
        back={() => setActivePaymentScreen(false)}
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <header className="w-full flex items-center px-4 py-3 bg-white sticky top-0 z-10 border-b">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="#16a34a"
          >
            <path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" />
          </svg>
        </button>
        <h1 className="ml-4 text-xl font-semibold">New Booking</h1>
      </header>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6">
        {/* Selected Tourist Spot Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-bold">Selected Tourist Spot</h2>
            <div className="flex-1 border-b border-neutral-300" />
          </div>
          {selectedItem && <PlaceItem data={selectedItem} />}
        </section>

        {/* Client Information Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-bold">Client Information</h2>
            <div className="flex-1 border-b border-neutral-300" />
          </div>

          <div className="space-y-4">
            <div className="flex space-x-3">
              <div className="">
                <label
                  htmlFor="fullName"
                  className="text-xs text-neutral-500 block mb-1"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full text-sm border border-neutral-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div className="max-w-24">
                <label
                  htmlFor="age"
                  className="text-xs text-neutral-500 block mb-1"
                >
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full text-sm border border-neutral-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="0"
                />
                {errors.age && (
                  <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contactNumber"
                className="text-xs text-neutral-500 block mb-1"
              >
                Contact Number
              </label>
              <input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="w-full text-sm border border-neutral-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Enter your contact number"
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contactNumber}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-bold">Schedule Tour</h2>
            <div className="flex-1 border-b border-neutral-300" />
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <label
                  htmlFor="startDate"
                  className="text-xs text-neutral-500 block mb-1"
                >
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full text-sm border border-neutral-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                {errors.startDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.startDate}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label
                  htmlFor="endDate"
                  className="text-xs text-neutral-500 block mb-1"
                >
                  End Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full text-sm border border-neutral-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                {errors.endDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            disabled={
              !formData ||
              !formData.fullName ||
              !formData.startDate ||
              !formData.endDate
            }
            onPress={handleSubmit}
            className="w-full"
          >
            {isSubmitting ? "Processing..." : "Proceed to payment"}
          </Button>
        </div>
      </form>
    </div>
  );
};

const PaymentScreen = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(props.formdata);
  const handleSubmit = () => {
    setIsLoading(true);
    console.log(props.formdata);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitting(true);
    }, 3000);
  };

  if (isSubmitting) {
    return <PaymentSuccessfull />;
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
              Agency Name
            </span>

            <b className="text-xs font-mono">Elmundo Travel&Tours</b>
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
              Destination Name
            </span>

            <b className="text-xs font-mono">{props.data.name}</b>
          </div>
          <div className="w-full flex justify-between items-center py-1">
            <span className="text-xs text-neutral-500 font-mono">
              Travel Date
            </span>

            <b className="text-xs font-mono">{props.formdata.scheduleDate}</b>
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
          Confirm
        </Button>
      </div>
    </div>
  );
};

const PaymentSuccessfull = () => {
  return (
    <div className="w-full h-screen bg-white flex flex-col justify-center items-center p-6">
      <Link href="/home" className="absolute top-5 right-5">
        <RxCross2 size={30} />
      </Link>

      <iframe
        className="py-2"
        src="https://lottie.host/embed/d1e9e39a-06c7-4230-bc3a-1253a14ed858/blnFThLBw7.json"
      ></iframe>
      <p className="text-lg font-semibold">Payment Confirmed!</p>
      <p className="text-sm text-center py-2">
        Thank you for your payment. Your booking is now confirmed, and we’re
        excited to have you join us!
      </p>
    </div>
  );
};
export default BookingScreen;
