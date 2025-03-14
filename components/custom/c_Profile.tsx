"use client";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useUserDetail } from "@nextCode/context/user_detail";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Profile() {
  const { user, setUser } = useUserDetail();
  const [name, setName] = useState("Ran");
  const [uid, setUid] = useState("#123");

  useEffect(() => {
    if (user) {
      setName(user.name || "Ran");
      setUid(user.uid || "#123");
    }
  }, [user]);

  return (
    <>
      {!user?.uid.length ? (
        <>
          <div className=" max-w-[50%] w-[300px] flex justify-between mr-2">
            <div>
              <Button variant="outline"> Register</Button>
            </div>
            <div>
              <Button className="bg-blue-500" variant="outline">
                {" "}
                Get Started
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className=" max-w-[50%] w-[200px] flex justify-end mr-2">
          <Sheet>
            <SheetTrigger asChild>
              <Avatar className=" cursor-pointer">
                <AvatarImage src={user.img} alt="@profile" />
                <AvatarFallback>
                  <Image
                  width={35}
                  height={35}
                    onClick={() => console.log(user)}
                    src={`${user.img}`}
                    alt="User Image"
                  />
                </AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Uid
                  </Label>
                  <Input
                    id="uid"
                    onChange={(e) => setUid(e.target.value)}
                    value={uid}
                    className="col-span-3"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
              <Button
                type="submit"
                onClick={async () => {
                  if (!user.isGuest) {
                    await signOut();
                  }
                  setUser(null);
                }}
              >
                SignOut
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </>
  );
}
