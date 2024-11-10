"use client";
import { useContext, useEffect, useState } from "react";

import { account } from "../config/appwrite";
import { ToastifyError, ToastifySuccess } from "../config/functions";
import { createAccount, isUserExist } from "../config/hooks";
import { AuthContext } from "../context/authContext";
import { DataContext } from "../context/dataContext";
import { IconFacebook, IconGoogle } from "./Icons";

const SocialAuth = ({ setLoading }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data, setData } = useContext(DataContext);
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    if (isLoading) {
      setLoading(isLoading);
    }
  }, [isLoading, setLoading]);

  const handleGoogleSignin = async () => {
    setIsLoading(true);

    try {
      const res = account.createOAuth2Session(
        "google",
        "https://cloud.appwrite.io/home",
        "https://cloud.appwrite.io/login",
        ["email", "public_profile"]
      );
      console.log(res);

      const user = await account.get();
      console.log(user);
      setUser({
        uid: user?.$id,
        accessToken: currentUser?.accessedAt,
      });
      const result = user;
      const userExist = await isUserExist(result.uid);

      if (!userExist) {
        const data = {
          uid: result.$id,
          username: result.name,
          email: result.email,
          photoUrl: result.prefs?.picture || "",
        };
        const response = await createAccount(data);

        if (response?.status) {
          ToastifySuccess(response.message);
          setData((prevData) => ({
            ...prevData,
            user: data,
            userId: response?.id,
          }));
        }
      } else {
        ToastifySuccess("User registered successfully");
        setData((prevData) => ({
          ...prevData,
          user: result,
        }));
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      ToastifyError(
        "An error occurred during Google sign-in. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignin = async () => {
    setIsLoading(true);

    try {
      const res = account.createOAuth2Session(
        "facebook",
        "https://cloud.appwrite.io/home",
        "https://cloud.appwrite.io/login"
      );
      console.log(res);

      const user = await account.get();
      console.log(user);
      setUser({
        uid: user?.$id,
        accessToken: currentUser?.accessedAt,
      });
      const result = user;
      const userExist = await isUserExist(result.uid);

      if (!userExist) {
        const data = {
          uid: result.$id,
          username: result.name,
          email: result.email,
          photoUrl: result.prefs?.picture || "",
        };
        const response = await createAccount(data);

        if (response?.status) {
          ToastifySuccess(response.message);
          setData((prevData) => ({
            ...prevData,
            user: data,
            userId: response?.id,
          }));
        }
      } else {
        ToastifySuccess("User registered successfully");
        setData((prevData) => ({
          ...prevData,
          user: result,
        }));
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      ToastifyError(
        "An error occurred during Google sign-in. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGoogleSignin = async () => {
  //   setIsLoading(true);
  //   const provider = new GoogleAuthProvider();
  //   await signInWithPopup(auth, provider)
  //     .then(async (res) => {
  //       console.log("Google auth: ", res.user);

  //       const result = res.user;
  //       const userExist = await isUserExist(result.uid);
  //       // check if user is not exist in database
  //       // then create the account
  //       if (!userExist) {
  //         const data = {
  //           uid: result.uid,
  //           username: result.displayName,
  //           email: result.email,
  //           photoUrl: result.photoURL,
  //         };
  //         const response = await createAccount(data);

  //         if (response?.status) {
  //           ToastifySuccess(response.message);
  //           setIsLoading(false);

  //           setData((prevData) => ({
  //             ...prevData,
  //             user: data,
  //             userId: response?.id,
  //           }));
  //         }
  //       } else {
  //         ToastifySuccess("User registered successfully");
  //         setIsLoading(false);

  //         setData((prevData) => ({
  //           ...prevData,
  //           user: data,
  //         }));
  //       }
  //     })
  //     .then((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="flex flex-col space-y-2 justify-center items-center">
      <span
        className="w-full flex justify-center items-center space-x-4 px-2 py-1 bg-white border border-neutral-200 rounded-md"
        onClick={() => handleFacebookSignin()}
      >
        <IconFacebook width={35} height={35} />
        <p className="text-base text-neutral-500">Signin with Facebook</p>
      </span>

      <span
        className="w-full flex justify-center items-center space-x-4 px-2 py-1 bg-white border border-neutral-200 rounded-md"
        onClick={() => handleGoogleSignin()}
      >
        <IconGoogle width={30} height={30} />
        <p className="text-base text-neutral-500">Signin with Google</p>
      </span>
    </div>
  );
};

export default SocialAuth;
