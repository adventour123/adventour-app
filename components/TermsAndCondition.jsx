"use client";

import { RxCross2 } from "react-icons/rx";

const TermsAndCondition = (props) => {
  return (
    <div className="w-full h-full bg-white absolute inset-0 overflow-y-auto z-[999]">
      <div className="w-full flex justify-end p-4" onClick={props.close}>
        <RxCross2 size={30} />
      </div>

      <div className="max-w-4xl mx-auto  bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-3xl font-bold  text-green-600 mb-6">
          Terms and Conditions
        </h1>
        <p className="text-base mb-4">
          Welcome to <span className="font-bold">Adventour App</span>. The App
          allows you to discover, book, and manage tours, events, and
          activities. By accessing or using the App, you agree to be bound by
          these Terms and Conditions and our Privacy Policy.
        </p>

        <ul className="list-none space-y-2">
          <li>
            ✓ You must be at least 18 years old to use the App. If you are under
            18, you must have the consent of a parent or guardian to use the
            App.
          </li>
          <li>
            ✓ To access certain features, you may need to create an account. You
            agree to provide accurate, current, and complete information during
            registration and to keep your account details up to date.
          </li>
        </ul>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Booking Process:
          </h2>
          <p className="mt-2">
            Users can book tours or events through the App. The App allows you
            to review details about tours, including dates, prices, and
            availability.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-700">Payment:</h2>
          <p className="mt-2">
            Payments for tours are processed through a third-party payment
            processor. The App is not responsible for any issues with payment
            processing.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Accurate Information:
          </h2>
          <p className="mt-2">
            You agree to provide accurate and truthful information when booking
            tours or using the App.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Compliance with Laws:
          </h2>
          <p className="mt-2">
            You agree to use the App in compliance with all applicable laws,
            rules, and regulations.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-700">Conduct:</h2>
          <p className="mt-2">
            You agree not to engage in any unlawful or disruptive activity when
            using the App.
          </p>
        </div>

        <div className="mt-4">
          <p className="text-base">
            All content, designs, and trademarks on the App are owned by{" "}
            <span className="font-bold">AdvenTour</span> or its partners and are
            protected by copyright laws. Users are granted a limited,
            non-transferable license to use the App for personal purposes only.
          </p>
        </div>

        <div className="mt-4">
          <p className="text-base">
            The App is provided "as is” without warranties of any kind.{" "}
            <span className="font-bold">AdvenTour</span> will not be liable for
            any direct or indirect damages resulting from your use of the App,
            including but not limited to tour cancellations, travel disruptions,
            or personal injury.
          </p>
        </div>

        <div className="mt-4">
          <p className="text-base">
            The App may contain links to third-party websites or services that
            are not controlled by <span className="font-bold">AdvenTour</span>.
            We are not responsible for the content or policies of third-party
            sites.
          </p>
        </div>

        <div className="mt-4">
          <p className="text-base">
            By using the App, you consent to the collection and use of your data
            as described in our Privacy Policy.
          </p>
        </div>

        <div className="mt-4">
          <p className="text-base">
            We reserve the right to update these Terms and Conditions at any
            time. Any changes will be posted on this page, and the date of the
            last update will be revised.
          </p>
        </div>

        <div className="mt-4">
          <p className="text-base">
            We may suspend or terminate your account if you violate these Terms
            and Conditions. Upon termination, you must stop using the App and
            may lose access to your account and any booked tours.
          </p>
        </div>

        <div className="mt-4">
          <p className="text-base">
            These Terms and Conditions are governed by the laws of the
            Philippines without regard to its conflict of law principles. Any
            disputes will be resolved in the appropriate courts of Palawan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;
