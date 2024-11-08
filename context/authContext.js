"use client";
import { auth } from "@/config/firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // redirect to home page
  useEffect(() => {
    if (user?.uid || user?.accessToken) {
      router.push("/home");
    } else {
      router.push("/");
    }
  }, [router, user?.accessToken, user?.uid]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("Sign-in provider: " + currentUser.providerId);
        console.log("  Provider-specific UID: " + currentUser.uid);
        console.log("  Name: " + currentUser.displayName);
        console.log("  Email: " + currentUser.email);
        console.log("  Photo URL: " + currentUser.photoURL);

        setUser({
          uid: currentUser?.uid,
          accessToken: currentUser?.accessToken,
        });
      } else {
        setUser(null);
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
