"use client";

import Button from "@/components/Button";
import { AppIcon } from "@/components/Icons";
import Loader from "@/components/Loader";
import SocialAuth from "@/components/SocialAuth";
import { auth } from "@/config/firebase_config";
import { ToastifyError, ToastifySuccess } from "@/config/functions";
import { createAccount } from "@/config/hooks";
import { AuthContext } from "@/context/authContext";
import { DataContext } from "@/context/dataContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(AuthContext);
  const { data, setData } = useContext(DataContext);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  const handleRegisterAccount = async () => {
    if (!email || !password || !confirmPassword) {
      ToastifyError("Please fill up all fields");
      setIsLoading(false);
      clearInputs();

      return;
    }

    if (password !== confirmPassword) {
      ToastifyError("Password not match");
      setIsLoading(false);
      clearInputs();
      return;
    }
    setIsLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        console.log("Registered account: ", res.user);
        const result = res.user;

        const data = {
          uid: result.uid,
          username: username,
          email: result.email,
          photoUrl: "",
        };
        const response = await createAccount(data);

        if (response?.status) {
          ToastifySuccess(response.message);
          setIsLoading(false);

          setData((prevData) => ({
            ...prevData,
            user: data,
            userId: response?.id,
          }));
        }
      })
      .catch((error) => {
        console.log("Firebase create account: ", error);

        // If the error is "auth/email-already-in-use"
        if (error.code === "auth/email-already-in-use") {
          ToastifyError("User already exist!");
          setIsLoading(false);
          return;
        }
      });

    clearInputs();
  };

  const clearInputs = () => {
    // clear inputs
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  if (loadingPage) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full bg-white p-6 relative">
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

      <Link href="/login">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Outline"
          viewBox="0 0 24 24"
          width="40"
          height="40"
          fill="#16a34a"
        >
          <path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" />
        </svg>
      </Link>

      <div className="flex justify-center items-center">
        <AppIcon width={200} height={200} />
      </div>

      <form>
        <p className="pb-4 text-sm text-neutral-600">Create your Account</p>

        <div className="w-full flex flex-col space-y-4">
          <div className="border border-neutral-300 rounded-3xl p-2 px-3">
            <input
              className="w-full focus:outline-none"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              autocompleted="off"
              required
            />
          </div>

          <div className="border border-neutral-300 rounded-3xl p-2 px-3">
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
            className="border border-neutral-300 rounded-3xl p-2 px-3
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

          <div
            className="border border-neutral-300 rounded-3xl p-2 px-3
          flex items-center"
          >
            <input
              className="w-full focus:outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
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

          <Button
            disabled={!username || !email || !password || !confirmPassword}
            onPress={handleRegisterAccount}
          >
            {isLoading ? "Loading..." : "Create Account"}
          </Button>

          <p className="text-xs text-neutral-500 text-center">
            Or sign in with
          </p>

          <SocialAuth setLoading={(load) => setLoadingPage(load)} />
        </div>
      </form>
    </div>
  );
};

export default SignupScreen;
