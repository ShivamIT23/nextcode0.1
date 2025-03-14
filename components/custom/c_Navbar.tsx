import React from "react";
import Logo from "./c_Logo";
import Link from "next/link";
import Profile from "./c_Profile";

export default function Navbar() {
  return (
    <div className="flex items-center justify-center w-full h-[100px]">
      <div
      className="w-[40%] p-2 shadow-lg bg-[#2c3e507a] shadow-[#2c3e50d3] drop-shadow-lg rounded-lg flex items-center justify-between">
        <div className="w-11 h-11 flex justify-start ml-4 cursor-pointer">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <Profile />
      </div>
    </div>
  );
}
