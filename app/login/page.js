"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import Button from "../../components/Button";
import { AppIcon } from "../../components/Icons";
import Loader from "../../components/Loader";
import SocialAuth from "../../components/SocialAuth";
import { auth } from "../../config/firebase_config";
import { ToastifyError, ToastifySuccess } from "../../config/functions";
import { AuthContext } from "../../context/authContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      ToastifyError("Please fill up all fields");
      clearInputs();

      return;
    }

    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("Logged In: ", res);
        ToastifySuccess("Logged in successfull");
        setIsLoading(false);
      })
      .catch((error) => {
        ToastifyError("Wrong credentials");
        setIsLoading(false);
      });

    clearInputs();
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  if (loadingPage) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full bg-white p-6">
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="flex justify-center items-center">
        <AppIcon width={200} height={200} />
      </div>

      <form>
        <p className="pb-4 text-base text-neutral-600">Login to your Account</p>

        <div className="w-full flex flex-col space-y-4">
          <div className="border border-neutral-300 rounded-xl p-2 px-3">
            <input
              className="w-full focus:outline-none"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autocompleted="off"
              required
            />
          </div>

          <div
            className="border border-neutral-300 rounded-xl p-2 px-3
          flex items-center"
          >
            <input
              className="w-full focus:outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autocompleted="off"
              required
            />

            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <FaEye size={20} color="#333" />
              ) : (
                <FaEyeSlash size={20} color="#ccc" />
              )}
            </span>
          </div>

          <div>
            <Button disabled={!email || !password} onPress={handleLogin}>
              {isLoading ? "Loading..." : "Sign In"}
            </Button>

            <Link
              href="/forgot_password"
              className="text-sm text-neutral-500 flex justify-end p-1"
            >
              forgot password?
            </Link>
          </div>

          <p className="text-sm text-neutral-500 text-center">
            or sign in with
          </p>

          <SocialAuth setLoading={(load) => setLoadingPage(load)} />

          <p className="text-sm text-neutral-500 text-center pt-5">
            Don't have an Account?{" "}
            <Link href="/signup" className="text-green-500 font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
