"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useUserDetail } from "@nextCode/context/user_detail";
import { useRouter } from "next/navigation";
// import { useMutation } from "convex/react";
// import { api } from "@nextCode/convex/_generated/api";
// import { Authenticate } from "@nextCode/app/api/authenticate";

export default function SigninDialog({
  openDialog,
  closeDialog,
}: {
  openDialog: boolean;
  closeDialog: (e: boolean) => void;
}) {
  // const { user, signInWithGoogle } = useAuth();
  const { user, setUser } = useUserDetail();
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""; // Replace with actual Client ID
  const redirectUri = encodeURIComponent(
    "http://localhost:3000/api/auth/callback/google"
  );

  const handleGoogleLogin = () => {
    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${clientId}&scope=openid%20email%20profile&response_type=code&redirect_uri=${redirectUri}&state=7F-IDWfDq255en_Sd2ytk8-hOgVljO5jIDorPdjxwlc&code_challenge=t_w3o_DCsus1rGyPhBafUW0Jz1zE3t39FBlzGxDCkaU&code_challenge_method=S256&service=lso&o2v=2&ddm=1&flowName=GeneralOAuthFlow`;
    router.push(googleAuthURL);
  };
  // const createUser = useMutation(api.users.CreateUser);
  // const createGuest = useMutation(api.users.CreateGuest);

  // const handleGoogleSignIn = async () => {
  //   try {
  //     // const result = await signInWithGoogle();
  //     if (result) {
  //       const user = result.user;
  //       const userToken = await user.getIdToken();
  //       const userId = await Authenticate(userToken);
  //       if (typeof window !== undefined) {
  //         if (
  //           localStorage.getItem("user_id") &&
  //           localStorage.getItem("user_id") == userId
  //         ) {
  //           return;
  //         }
  //         if (localStorage.getItem("user_id")) {
  //           localStorage.setItem("user_id", "");
  //         }
  //       }
  //       const newUser = {
  //         name:
  //           user.displayName ||
  //           `random${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`,
  //         email:
  //           typeof user.email === "string"
  //             ? user.email
  //             : `random${Math.floor(Math.random() * 1000000)}${Math.floor(Math.random() * 1000000)}${Math.floor(Math.random() * 1000000)}@gmail.com`,
  //         img:
  //           typeof user.photoURL === "string"
  //             ? user.photoURL
  //             : "https://res.cloudinary.com/driz5nrim/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1737229524/freepik__the-style-is-candid-image-photography-with-natural__78160_qhvaue.jpg",
  //         uid: userToken,
  //       };
  //       if (typeof window !== undefined) {
  //         localStorage.setItem("user_id", userId|| newUser.uid);
  //       }
  //       console.log(userId);
  //       if (!userId) {
  //         return;
  //       }
  //       const userConvex = await createUser({ ...newUser, userId });
  //       console.log(userConvex);
  //       setUser(userConvex);
  //       closeDialog(false);
  //     }
  //   } catch (e) {
  //     closeDialog(false);
  //     console.log(e);
  //   }
  // };

  // Guest Sign-In
  // const handleGuestSignIn = async () => {
  //   try {
  //     const newGuest = {
  //       img: "https://res.cloudinary.com/driz5nrim/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1737229524/freepik__the-style-is-candid-image-photography-with-natural__78160_qhvaue.jpg",
  //       uid: localStorage.getItem("guest_id") || crypto.randomUUID(),
  //     };
  //     localStorage.setItem("guest_id", newGuest.uid);
  //     const userConvex = await createGuest(newGuest);
  //     console.log(userConvex);
  //     setUser(userConvex);
  //     closeDialog(false);
  //   } catch (e) {
  //     closeDialog(false);
  //     console.log(e);
  //   }
  // };

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
              <p>
                To use NextCode you must log into an existing account or create
                one.
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
                    console.log(clientId);
                    handleGoogleLogin();
                  }}
                  className="text-white bg-blue-400 hover:bg-blue-500"
                >
                  Signin With Google
                </Button>
                <Button
                  onClick={()=>console.log("hello")}
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
  );
}
