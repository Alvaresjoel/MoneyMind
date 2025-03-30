'use client';

import React from "react";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";

const TopBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-web2 p-4 shadow-md">

      {/* Search Bar */}
      <div className="relative w-2/4">
        <input
          type="text"
          placeholder="Enter Mutual Fund, Stock or Index"
          className="w-full p-2 pl-5 pr-12 border bg-web3 border-black rounded-lg focus:outline-none focus:ring-2"
        />

        {/* Search Icon Inside Button (Right Side) */}
        <button className="absolute right-1 top-1 bottom-1 px-3 bg-web1 text-white rounded-md flex items-center justify-center hover:bg-gray-800 transition">
          <FaSearch className="text-white" />
        </button>
      </div>


      {/* Profile Section */}
      <div className="flex items-center space-x-4">
        <Image
          src="/profile.jpg" // Change this to dynamic user profile image
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
        />
      </div>

    </div>
  );
};

export default TopBar;
