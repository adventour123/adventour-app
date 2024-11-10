"use client";

import { IconProfile } from "./Icons";

export const defaultProfile =
  "https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png";
// Profile component using IconProfile with random default profile picture
const Profile = ({ photoUrl, size }) => {
  const profileImg = photoUrl || defaultProfile;

  return (
    <div className="rounded-full overflow-hidden">
      <IconProfile imgUrl={profileImg} width={size || 35} height={size || 35} />
    </div>
  );
};

export default Profile;
