"use client";

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
import { signIn } from "next-auth/react";
import GuestSigninDialogue from "./c_GuestSigninDialogue";
import { getCookieValue } from "@nextCode/app/lib/helper";
import { useMutation } from "convex/react";
import { api } from "@nextCode/convex/_generated/api";

export default function SigninDialog({
  openDialog,
  closeDialog,
}: {
  openDialog: boolean;
  closeDialog: (e: boolean) => void;
}) {
  const { user, setUser } = useUserDetail();
  const [openGuestDialogue, setOpenGuestDialogue] = useState(false);

  const getGuest = useMutation(api.users.getGuest);

  // Guest Sign-In
  const handleGuestSignIn = async () => {
    try {
      if (user && user.uid) {
        return;
      }
      const preGuestId =
        localStorage.getItem("guest_id") || getCookieValue("guest_id");
      if (preGuestId) {
        const guestUser = await getGuest({ uid: preGuestId });
        if (guestUser && guestUser !== "Database Error") {
          setUser({
            name: guestUser.name,
            uid: guestUser.uid,
            img: guestUser.img,
            isGuest: guestUser.isGuest,
            createdAt: guestUser.createdAt,
            _id: guestUser._id,
          });
          setOpenGuestDialogue(false);
          closeDialog(false);
          return;
        } else {
          console.log("User not found in DB");
          setOpenGuestDialogue(true);
        }
      }
      setOpenGuestDialogue(true);
      closeDialog(false);
    } catch (e) {
      closeDialog(false);
      console.log(e);
    }
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-white">
                  Continue With NextCode...
                </h2>
                <p>
                  To use NextCode you must log into an existing account or
                  create one.
                </p>
                <small>OR</small>
                <p>
                  You can also{" "}
                  <span className="font-semibold">
                    Continue {user?.name || "hii"}
                  </span>{" "}
                  as a Guest
                </p>
                <div className="mt-3 flex justify-center gap-3">
                  <Button
                    onClick={() => {
                      closeDialog(false);
                      signIn("google");
                    }}
                    className="text-white bg-blue-400 hover:bg-blue-500"
                  >
                    Signin With Google
                  </Button>
                  <Button
                    onClick={handleGuestSignIn}
                    variant="outline"
                    className="text-white "
                  >
                    Continue as Guest
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <GuestSigninDialogue
        openDialog={openGuestDialogue}
        closeDialog={(e: boolean) => setOpenGuestDialogue(e)}
      ></GuestSigninDialogue>
    </>
  );
}
