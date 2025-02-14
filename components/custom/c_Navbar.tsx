import React from "react";
import Logo from "./c_Logo";
import Link from "next/link";
import Profile from "./c_Profile";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between w-full h-[100px]">
      <div className="w-11 h-11 flex justify-start ml-4 cursor-pointer">
        <Link href="./">
          <Logo />
        </Link>
      </div>
      <Profile />
    </div>
  );
}
