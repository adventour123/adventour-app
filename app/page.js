"use client";

import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timestamp = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timestamp);
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className="w-full h-screen relative overflow-hidden
    "
    >
      <div className="w-full h-full flex flex-col justify-end pb-8 bg-viewpage bg-cover bg-no-repeat relative ">
        <span className="px-8 z-50">
          <p className="text-4xl text-center font-semibold text-green-400 drop-shadow-xl">
            Find your next adventure
          </p>
          <p className="text-sm text-center italic py-2 px-4 text-white/90">
            Let’s explore, conquer, and make every moment an adventure.
          </p>
        </span>
        <div className="absolute inset-0 from-black/80 to-transparent bg-gradient-to-t z-40"></div>

        <div className="w-full z-50 p-6 flex flex-col justify-center">
          <Button onPress={() => router.push("/login")}>Get Started</Button>

          {/* <p className="text-center text-gray-300 text-sm py-2">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-green-500 ">
              Login
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
