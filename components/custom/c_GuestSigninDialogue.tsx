"use client";

import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useUserDetail } from "@nextCode/context/user_detail";
import { useMutation } from "convex/react";
import { api } from "@nextCode/convex/_generated/api";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function GuestSigninDialogue({
  openDialog,
  closeDialog,
}: {
  openDialog: boolean;
  closeDialog: (e: boolean) => void;
}) {
  const createGuest = useMutation(api.users.createGuest);
  const [name, setName] = useState("");
  const { setUser } = useUserDetail();

  // Guest Sign-In
  const handleGuestSignIn = async () => {
    try {
      const guestId = uuidv4();
      const newGuest = {
        name: name,
        img: "https://res.cloudinary.com/driz5nrim/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1737229524/freepik__the-style-is-candid-image-photography-with-natural__78160_qhvaue.jpg",
        uid: guestId,
        createdAt: Date.now(),
      };
      localStorage.setItem("guest_id", guestId);
      const userConvex = await createGuest(newGuest);
      console.log(userConvex);
      if (!userConvex) throw new Error("Failed to create user");
      setUser({ ...newGuest, isGuest: false ,_id:userConvex});
      closeDialog(false);
    } catch (e) {
      closeDialog(false);
      console.log(e);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-white">
                Continue With NextCode...
              </h2>
              <p>Please fill ur info to signIn</p>
              <div className="mt-3 flex justify-center gap-3">
                <form action={handleGuestSignIn}>
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
                  </div>
                  <Button
                    type="submit"
                    variant="outline"
                    className="text-white "
                  >
                    Signin as Guest
                  </Button>
                </form>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
