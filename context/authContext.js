"use client";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase_config";
import { fetchUser } from "../config/hooks";
import { DataContext } from "./dataContext";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { data } = useContext(DataContext);
  const router = useRouter();

  // Redirect to the appropriate page based on user state
  useEffect(() => {
    if (user) {
      router.push("/home");
    } else {
      router.push("/");
    }
  }, [router, user]);

  useEffect(() => {
    const unsubscribe = async () => {
      try {
        if (data?.id) {
          const res = await fetchUser(data?.id);
          if (res.success) {
            console.log("Fetch User: ", res.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    unsubscribe();
  }, [data?.id]);

  useEffect(() => {
    const getUser = async () => {
      try {
        // Handle Google and other provider-based redirects
        const response = await getRedirectResult(auth);
        if (response) {
          const token = await response.user.getIdToken();
          setUser({
            uid: response.user.uid,
            accessToken: token,
          });
        }
      } catch (error) {
        console.log("Error getting redirect result:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        setUser({
          uid: currentUser.uid,
          accessToken: token,
        });
      } else {
        setUser(null);
      }
    });

    // Initialize by calling getUser for redirect-based auth
    getUser();

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
