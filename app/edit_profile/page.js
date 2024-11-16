"use client";
import {
  sendEmailVerification,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { RiImageEditFill } from "react-icons/ri";
import Button from "../../components/Button";
import Profile from "../../components/Profile";
import { auth } from "../../config/firebase_config";
import { editUser } from "../../config/hooks";
import { AuthContext } from "../../context/authContext";
import { DataContext } from "../../context/dataContext";

const EditProfileScreen = () => {
  const { user, setUser } = useContext(AuthContext);
  const { data } = useContext(DataContext);

  const [username, setUsername] = useState(data?.user?.username || "");
  const [email, setEmail] = useState(data?.user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      // Update email if it has changed
      if (email && email !== data?.user?.email) {
        // Send verification email before updating the email
        await sendEmailVerification(auth.currentUser);
        alert(
          "Please check your inbox to verify your new email before updating."
        );

        // Once the email is verified, the user can proceed to update their email
        await updateEmail(auth.currentUser, email);
      }

      // Update password if provided
      if (password) {
        await updatePassword(auth.currentUser, password);
      }

      // Update other profile details in your database
      const updatedProfile = {
        uid: user?.uid,
        username: username,
        email: email,
        photoUrl: "",
        status: "active",
      };

      await editUser(updatedProfile, data?.userId);

      // Update user context
      setUser({ ...user, email, username });

      alert("Profile updated successfully.");
      router.push("/profile"); // Redirect to profile page or any other desired page
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="w-full h-full bg-white p-4">
      <header className="w-full flex space-x-3 justify-start items-center px-4 py-3 bg-white fixed top-0 left-0 z-50">
        <span onClick={() => router.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="#16a34a"
          >
            <path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" />
          </svg>
        </span>
        <span>
          <b className="text-2xl text-black">Edit Profile</b>
        </span>
      </header>

      <form className="w-full pt-12">
        <div className="relative flex justify-center p-4">
          <Profile size={150} />
          <span className="w-8 h-8 bg-white border border-neutral-500 rounded-full absolute bottom-5 right-28 flex items-center justify-center">
            <RiImageEditFill size={25} />
          </span>
        </div>

        <div className="w-full flex flex-col space-y-4">
          <div className="border border-neutral-300 rounded-xl p-2 px-3">
            <input
              className="w-full focus:outline-none"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              autoComplete="off"
              required
            />
          </div>

          <div className="border border-neutral-300 rounded-xl p-2 px-3">
            <input
              className="w-full focus:outline-none"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="off"
              required
            />
          </div>

          <div className="border border-neutral-300 rounded-xl p-2 px-3 flex items-center">
            <input
              className="w-full focus:outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="off"
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

          <div className="border border-neutral-300 rounded-xl p-2 px-3 flex items-center">
            <input
              className="w-full focus:outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              autoComplete="off"
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
            onPress={handleUpdate}
          >
            {isLoading ? "Loading..." : "Update Account"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileScreen;
