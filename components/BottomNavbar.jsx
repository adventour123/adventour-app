"use client";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineBookmarks } from "react-icons/md";

const BottomNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const links = [
    { href: "/home", icon: <AiOutlineHome size={25} />, label: "Home" },
    { href: "/map", icon: <FiMapPin size={25} />, label: "Map" },
    {
      href: "/bookmarks",
      icon: <MdOutlineBookmarks size={25} />,
      label: "Bookmarks",
    },
    { href: "/profile", icon: <IoPersonOutline size={25} />, label: "Profile" },
  ];

  return (
    <div className="w-full bg-white rounded-t-3xl shadow-md fixed bottom-0 left-0 right-0 border-t border-neutral-300 flex justify-around items-center px-2 py-4 z-[100]">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <span
            key={link.href}
            className={`transition-colors duration-200 ${
              isActive ? "text-green-500" : "text-gray-500"
            }`}
            onClick={() => router.push(link.href)}
          >
            {link.icon}
          </span>
        );
      })}
    </div>
  );
};

export default BottomNavbar;
