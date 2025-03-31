'use client';

import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import correct Link component
import { LogOut, User, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
const TopBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState("/default-profile.jpg"); // Default profile image
  const [username, setUsername] = useState("User")

  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("loginToken");
    const storedUsername = sessionStorage.getItem("username")

    setIsLoggedIn(!!token); // Convert to boolean
     // Update profile image if available
  }, []);

  const logout = () => {
    sessionStorage.removeItem("loginToken");
    sessionStorage.removeItem("username")
    setIsLoggedIn(false);
    router.push("/user/login");
  };

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
      {!isLoggedIn ? (
          <div className="flex items-center gap-2">
            <Link href="/user/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/user/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-1 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profileImage} alt={username} />
                  <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">{username}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="cursor-pointer">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
    </div>
  );
};

export default TopBar;
