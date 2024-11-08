"use client";

import { IconProfile } from "./Icons";

// Utility function to select a random profile picture
const getRandomProfilePicture = (profilePictures) => {
  if (!profilePictures || profilePictures.length === 0) {
    throw new Error("Profile pictures array is empty or undefined");
  }

  const randomIndex = Math.floor(Math.random() * profilePictures.length);
  return profilePictures[randomIndex];
};

// Profile component using IconProfile with random default profile picture
const Profile = ({ photoUrl, size }) => {
  const profilePictures = [
    require("../assets/default_profiles/boy.png"),
    require("../assets/default_profiles/bussiness-man.png"),
    require("../assets/default_profiles/girl.png"),
    require("../assets/default_profiles/girl2.png"),
    require("../assets/default_profiles/profile.png"),
    require("../assets/default_profiles/man.png"),
  ];

  const defaultProfilePicture =
    photoUrl || getRandomProfilePicture(profilePictures);

  return (
    <div className="rounded-full overflow-hidden">
      <IconProfile
        imgUrl={defaultProfilePicture}
        width={size || 35}
        height={size || 35}
      />
    </div>
  );
};

export default Profile;
