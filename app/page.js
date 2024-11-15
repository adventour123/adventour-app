"use client";

import { useRouter } from "next/navigation";
import Button from "../components/Button";

const Home = () => {
  const router = useRouter();

  return (
    <div
      className="w-full h-screen relative overflow-hidden
    "
    >
      <div className="w-full h-full flex flex-col justify-end pb-8 bg-viewpage bg-cover bg-no-repeat relative ">
        <span className="px-8 z-50">
          <p className="text-4xl text-center font-semibold text-green-400 drop-shadow-2xl shadow-white">
            Find your next adventure
          </p>
          <p className="text-sm text-center italic py-2 px-4 text-white/90">
            Let’s explore, conquer, and make every moment an adventure.
          </p>
        </span>
        <div className="absolute inset-0  from-black/40 to-transparent bg-gradient-to-t z-40"></div>

        <div className="w-full z-50 p-6 flex flex-col justify-center">
          <Button onPress={() => router.push("/login")}>Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
