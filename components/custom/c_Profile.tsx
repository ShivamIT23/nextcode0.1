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

export default function Profile() {
  const { user } = useUserDetail();

  return (
    <div className=" w-[300px] flex justify-evenly">
      {!(user.uid.length) ?
        <>
          <div>
            <Button variant="outline"> Register</Button>
          </div>
          <div>
            <Button className="bg-blue-500" variant="outline">
              {" "}
              Get Started
            </Button>
          </div>
        </>:
        <div>
        <Sheet>
          <SheetTrigger asChild>
            <Avatar className=" cursor-pointer">
              <AvatarImage src={user.img} alt="@profile" />
              <AvatarFallback>NC</AvatarFallback>
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
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      }
    </div>
  );
}
