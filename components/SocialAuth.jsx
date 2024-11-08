import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";

import { auth } from "@/config/firebase_config";
import { ToastifySuccess } from "@/config/functions";
import { createAccount, isUserExist } from "@/config/hooks";
import { DataContext } from "@/context/dataContext";
import { IconFacebook, IconGoogle } from "./Icons";

const SocialAuth = ({ setLoading }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data, setData } = useContext(DataContext);

  useEffect(() => {
    if (isLoading) {
      setLoading(isLoading);
    }
  }, [isLoading, setLoading]);

  const handleGoogleSignin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async (res) => {
        console.log("Google auth: ", res.user);

        const result = res.user;
        const userExist = await isUserExist(result.uid);
        // check if user is not exist in database
        // then create the account
        if (!userExist) {
          const data = {
            uid: result.uid,
            username: result.displayName,
            email: result.email,
            photoUrl: result.photoURL,
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
        } else {
          ToastifySuccess("User registered successfully");
          setIsLoading(false);

          setData((prevData) => ({
            ...prevData,
            user: data,
          }));
        }
      })
      .then((error) => {
        console.log(error);
      });
  };

  const handleFacebookSignin = async () => {
    setIsLoading(true);

    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async (res) => {
        console.log("Google auth: ", res.user);

        const result = res.user;
        const userExist = await isUserExist(result.uid);
        // check if user is not exist in database
        // then create the account
        if (!userExist) {
          const data = {
            uid: result.uid,
            username: result.displayName,
            email: result.email,
            photoUrl: result.photoURL,
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
        } else {
          ToastifySuccess("User registered successfully");
          setIsLoading(false);

          setData((prevData) => ({
            ...prevData,
            user: data,
          }));
        }
      })
      .then((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex space-x-6 justify-center items-center">
      <span onClick={() => handleFacebookSignin()}>
        <IconFacebook width={40} height={40} />
      </span>

      <span onClick={() => handleGoogleSignin()}>
        <IconGoogle width={35} height={35} />
      </span>
    </div>
  );
};

export default SocialAuth;
