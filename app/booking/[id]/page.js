"use client";

import moment from "moment";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import card from "../../../assets/card.png";
import gcashLogo from "../../../assets/gcash-logo.png";
import CardPaymentScreen from "../../../components/CardPayment";
import GcashPaymentScreen from "../../../components/GcashPayment";
import Loader from "../../../components/Loader";
import PlaceItem from "../../../components/PlaceItem";
import { fetchAllTouristSpots } from "../../../config/hooks";
import { AuthContext } from "../../../context/authContext";
import { DataContext } from "../../../context/dataContext";

const BookingScreen = () => {
  const { id } = useParams();
  const router = useRouter();

  // States
  const { data, setData } = useContext(DataContext);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState([]);
  const [paymentMethods, setPaymentMethod] = useState({
    method: "",
    active: false,
  });
  const [formData, setFormData] = useState({
    fullName: data?.user?.username || "",
    age: "",
    email: data?.user?.email || "",
    contactNumber: "",
    package: selectedPackage[0]?.name || "",
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
          setPackages(JSON.parse(selected?.packages) || []);
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
    bookingPrice: selectedItem?.priceRange,
    status: "pending",
    datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
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

    // Full Name validation
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    }

    // Contact Number validation
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10,}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Please enter a valid contact number";
    }

    // Start Date validation
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    // End Date validation
    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Package validation
    if (packages.length !== 0) {
      if (!selectedPackage || selectedPackage.length === 0) {
        newErrors.package = "You must select a package";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (method) => {
    if (!validateForm()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      if (method === "card") {
        setPaymentMethod({ method: "card", active: true });
      }

      if (method === "gcash") {
        setPaymentMethod({ method: "gcash", active: true });
      }
      setIsSubmitting(false);
    }, 1000);

    setData((prev) => ({
      ...prev,
      bookItem: selectedItem,
    }));
  };

  const handlePackage = (name) => {
    const updatedPackages = packages.map((pkg) => ({
      ...pkg,
      selected: pkg.name === name, // Assuming you want to track which package is selected
    }));
    setPackages(updatedPackages); // Update the state with the modified packages

    const selectedPackage = packages.filter((pkg) => pkg.name === name);
    console.log(selectedPackage);
    setSelectedPackage(selectedPackage); // Store the full package details
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isSubmitting) {
    return <Loader />;
  }

  if (paymentMethods.active && paymentMethods.method === "gcash") {
    return (
      <GcashPaymentScreen
        data={selectedItem}
        formdata={bookingData}
        travelName={selectedItem?.name}
        back={() => setPaymentMethod({ active: false })}
      />
    );
  }

  if (paymentMethods.active && paymentMethods.method === "card") {
    return (
      <CardPaymentScreen
        data={selectedItem}
        formdata={bookingData}
        travelName={selectedItem?.name}
        back={() => setPaymentMethod({ active: false })}
      />
    );
  }

  return (
    <div className="w-full h-screen bg-white relative">
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

            <div className="">
              <label
                htmlFor="email"
                className="text-xs text-neutral-500 block mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full text-sm border border-neutral-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
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

        {packages.length !== 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-bold">Select Package</h2>
              <div className="flex-1 border-b border-neutral-300" />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {packages.map((item, index) => (
                <PackageItem
                  key={index}
                  onClick={() => handlePackage(item.name)}
                  name={item.name}
                  isSelected={item.selected}
                />
              ))}
            </div>
            {errors.package && (
              <p className="text-red-500 text-xs mt-1">{errors.package}</p>
            )}

            <div>
              {selectedPackage?.map((item, idx) => (
                <div className="p-2" key={idx}>
                  <h2 className="text-xs font-semibold">{item.name}</h2>
                  <ul className="text-xs  text-neutral-800">
                    {item.tours.map((tour, i) => (
                      <li key={i}>
                        {tour.name ? `Tour ${tour.name} - ` : "Tour - "}
                        {tour.destinations
                          ? tour.destinations.join(" | ")
                          : tour}
                      </li>
                    ))}
                    <li>Transportation - {item.transportation}</li>
                    <li>Hotel - {item.hotel}</li>
                    <li>Price - {item.price.toLocaleString()}</li>
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

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
                  placeholder="mm/dd/yyyy"
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
                  placeholder="mm/dd/yyyy"
                  className="w-full text-sm border border-neutral-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                {errors.endDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-bold">Select Payment Method</h2>
            <div className="flex-1 border-b border-neutral-300" />
          </div>

          <div className="w-full flex flex-col space-y-2">
            <div
              onClick={() => handleSubmit("card")}
              className="w-full p-2 border border-green-500
            flex space-x-4 justify-center items-center rounded-md text-center bg-white shadow-sm"
            >
              <Image src={card} width={40} height={40} alt="Credit card" />

              <p className="text-base ">Via Credit Card</p>
            </div>
            <div
              onClick={() => handleSubmit("gcash")}
              className="w-full p-2 border border-blue-500
            flex space-x-4 justify-center items-center rounded-md text-center bg-white shadow-sm"
            >
              <Image src={gcashLogo} width={40} height={40} alt="Gcash" />
              <p className="text-base ">Via Gcash Pay</p>
            </div>
          </div>
        </section>
      </form>

      {/* Submit Button */}
      {/* <div className="w-full pt-4  p-4">
        <Button onPress={handleSubmit} className="w-full">
          {isSubmitting ? "Processing..." : "Proceed to payment"}
        </Button>
      </div> */}
    </div>
  );
};

const PackageItem = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`${
        props.isSelected ? "outline-green-500" : "outline-neutral-200"
      } w-auto p-2 px-4 bg-white outline outline-1  rounded-2xl`}
    >
      <p
        className={`${
          props.isSelected
            ? "text-green-500 font-semibold"
            : "text-neutral-500 "
        } text-xs font-sans text-center whitespace-nowrap`}
      >
        {props.name}
      </p>
    </div>
  );
};

export default BookingScreen;
