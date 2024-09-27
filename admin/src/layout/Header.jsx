import React from "react";
import SearchBar from "../components/SearchBar";
import { FaBell, FaEnvelope } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

function Header() {
  const toggleDarkMode = () => {
    const html = document.getElementById("main");
    html.classList.toggle("dark");
  };
  return (
    <div className="w-full p-4 flex items-center justify-between dark-mode transition duration-200 h-[80px] dark:border-b ">
      <SearchBar />
      <div className="flex items-center gap-4 text-gray-400">
        {/* Theme Icon */}
        <button onClick={toggleDarkMode}>
          <div className="relative ">
            <MdDarkMode className="text-xl cursor-pointer" />
          </div>
        </button>

        {/* Notification Icon */}
        <div className="relative">
          <FaBell className="text-xl cursor-pointer" />
          {/* Optional: Notification badge */}
          <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white text-[10px] rounded-full size-5 flex items-center justify-center">
            1
          </span>
        </div>

        {/* Messages Icon */}
        <div className="relative">
          <FaEnvelope className="text-xl cursor-pointer" />
          {/* Optional: Messages badge */}
          <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white text-[10px] rounded-full size-5 flex items-center justify-center">
            3
          </span>
        </div>

        {/* Avatar Image */}
        <img
          src="https://via.placeholder.com/40" // Replace with your avatar image URL
          alt="User Avatar"
          className="rounded-full w-10 h-10 cursor-pointer mr-10"
        />
      </div>
    </div>
  );
}

export default Header;
