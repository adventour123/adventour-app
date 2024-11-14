"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FaPesoSign } from "react-icons/fa6";
import PaymentSuccessfull from "./PaymentSuccessfull";
import { addBooking } from "../config/hooks";
import { DataContext } from "../context/dataContext";

const CardPaymentScreen = (props) => {
  const [name, setName] = useState(props.formdata.fullName || "");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { data, setData } = useContext(DataContext);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log(props.formdata);

      const res = await addBooking(props.formdata);

      if (res && res.success) {
        setIsSubmitting(true);

        // set to the notification
        const title = "Booking";
        const bookTitle = data?.bookItem;
        const datetime = "";
        // NotificationProcess;
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return <PaymentSuccessfull />;
  }
  return (
    <section className="absolute inset-0 w-full h-full py-8 antialiased  md:py-16 bg-gray-900">
      <div className="bg-gray-900 px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <span onClick={props.back} className="py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Outline"
              viewBox="0 0 24 24"
              width="35"
              height="35"
              fill="#fff"
            >
              <path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" />
            </svg>
          </span>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Payment
          </h2>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
            >
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="full_name"
                    className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                  >
                    Full name (as displayed on card)*
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Enter Name"
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="card-number-input"
                    className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                  >
                    Card number*
                  </label>
                  <input
                    type="text"
                    id="card-number-input"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="card-expiration-input"
                    className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                  >
                    Card expiration*
                  </label>
                  <input
                    type="text"
                    id="card-expiration-input"
                    value={expiration}
                    onChange={(e) => setExpiration(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="12/23"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="cvv-input"
                    className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                  >
                    CVV*
                  </label>
                  <input
                    type="number"
                    id="cvv-input"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="•••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full italic items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-base font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Pay now
              </button>
            </form>

            <div className="mt-6 grow sm:mt-8 lg:mt-0">
              <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Original price
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                      <FaPesoSign size={20} />
                      {props.data.priceRange}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tax
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                      0
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white flex items-center">
                    <FaPesoSign size={20} />
                    {props.data.priceRange}
                  </dd>
                </dl>
              </div>

              <div className="mt-6 flex items-center justify-center gap-8">
                <Image
                  width={30}
                  height={30}
                  className="h-8 w-auto dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                  alt=""
                />
                <Image
                  width={30}
                  height={30}
                  className="hidden h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                  alt=""
                />
                <Image
                  width={30}
                  height={30}
                  className="h-8 w-auto dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                  alt=""
                />
                <Image
                  width={30}
                  height={30}
                  className="hidden h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                  alt=""
                />
                <Image
                  width={30}
                  height={30}
                  className="h-8 w-auto dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                  alt=""
                />
                <Image
                  width={30}
                  height={30}
                  className="hidden h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardPaymentScreen;
