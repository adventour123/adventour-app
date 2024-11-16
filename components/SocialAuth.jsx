"use client";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase_config";
import { ToastifySuccess } from "../config/functions";
import { createAccount, isUserExist } from "../config/hooks";
import { AuthContext } from "../context/authContext";
import { DataContext } from "../context/dataContext";
import { IconFacebook, IconGoogle } from "./Icons";

const SocialAuth = ({ setLoading }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data, setData } = useContext(DataContext);
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      setLoading(isLoading);
    }
  }, [isLoading, setLoading]);

  const handleSocialSignIn = async (provider) => {
    setIsLoading(true);
    try {
      const res = await signInWithRedirect(auth, provider);

      const result = res.user;
      console.log(result);
      const userExists = await isUserExist(result.email);
      console.log(userExists);

      const userData = {
        uid: result.uid,
        username: result.displayName,
        email: result.email,
        photoUrl: result.photoURL,
      };
      if (!userExists) {
        const response = await createAccount(userData);

        if (response?.status) {
          ToastifySuccess(response.message);
          setData((prevData) => ({
            ...prevData,
            user: userData,
            userId: response?.id,
          }));
        }
      } else {
        ToastifySuccess("User registered successfully");
        setData((prevData) => ({
          ...prevData,
          user: userData,
        }));
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Authentication error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2 justify-center items-center">
      <span
        className="w-full flex justify-center items-center space-x-4 px-2 py-1 bg-white border border-neutral-200 rounded-md"
        onClick={() => handleSocialSignIn(new GoogleAuthProvider())}
      >
        <IconGoogle width={30} height={30} />
        <p className="text-base text-neutral-500">Sign in with Google</p>
      </span>
      <span
        className="w-full flex justify-center items-center space-x-4 px-2 py-1 bg-white border border-neutral-200 rounded-md"
        onClick={() => handleSocialSignIn(new FacebookAuthProvider())}
      >
        <IconFacebook width={35} height={35} />
        <p className="text-base text-neutral-500">Sign in with Facebook</p>
      </span>
    </div>
  );
};

export default SocialAuth;
