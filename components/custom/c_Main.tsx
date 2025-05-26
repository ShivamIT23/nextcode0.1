"use client";

import React, { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import ArrowRight from "./c_ArrowRight";
import Link from "./c_Link";
import SigninDialog from "./c_SigninDialog";
import { useUserDetail } from "@nextCode/context/user_detail";
import { api } from "@nextCode/convex/_generated/api";
import { useMutation } from "convex/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFilesStore } from "@nextCode/context/files_detail";

const Suggestions = [
  "Create TODO App in React",
  "Create Budget Track App",
  "Create a Random Game Website",
  "Create a Simon Game Website",
  "Create a Youtube Frontend Website",
  "Create an Amazon Frontend Website",
];

export default function Main() {
  const [userInput, setUserInput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const {resetFiles} = useFilesStore();
  const { user, setUser } = useUserDetail();
  const getUser = useMutation(api.users.getUser);
  const createWorkBench = useMutation(api.workBench.createWorkBench);
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) return; // ✅ Set checking first to avoid duplicate calls

      try {
        if (session?.data?.user?.email) {
          const fetchedUser = await getUser({ email: session.data.user.email });
          if (fetchedUser && fetchedUser !== "Database Error") {
            setUser({
              name: fetchedUser.name,
              uid: fetchedUser.uid,
              img: fetchedUser.img,
              isGuest: fetchedUser.isGuest,
              email: fetchedUser.email,
              createdAt: fetchedUser.createdAt,
              _id: fetchedUser._id,
            });
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [session]);

  useEffect(() => {
    // Close dialog automatically if the user logs in
    if (user && user.uid) {
      setOpenDialog(false);
    }
  }, [user]);

  const onGenerate = async (input: string) => {
    try {
      if (user && user.uid) {
        setLoading(true);
        const msg = {
          role: user.isGuest ? "guest" : "user",
          content: input,
        };
        const workBenchId = await createWorkBench({
          user: user._id,
          message: [msg],
        });
        resetFiles();
        router.push("/workBench/" + workBenchId);
        setLoading(false);
      } else {
        setOpenDialog(true);
      }
    } catch (err) {
      setLoading(false);
      console.error("Error was:", err);
    }
  };

  return (
    <div className="w-4/5 h-[calc(80vh-100px)] mx-auto mt-[15vh] mb-[5vh] flex flex-col justify-start items-center">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl">
          What do you want to build?
        </h2>
        <p className="text-gray-400">
          Prompt, run, edit, and deploy a full-stack web app
        </p>
        <div className="relative w-full max-w-xl min-h-fit bg-zinc-900 rounded-2xl">
          <Textarea
            className="h-[25vh] p-3 rounded-2xl shadow-lg drop-shadow-lg shadow-rose-400 bg-[#1e1e2f]"
            placeholder="Type your message here."
            onChange={(e) => setUserInput(e.target.value)}
          />
          {userInput && (
            <Button
              onClick={() => onGenerate(userInput)}
              variant="outline"
              className="bg-blue-500 mt-2 mr-2 text-white absolute top-0 right-0"
            >
              <ArrowRight />
            </Button>
          )}
          <Button
            variant="link"
            className="mb-2 ml-2 w-4 h-6 text-white absolute bottom-0 left-0"
          >
            <Link />
          </Button>
        </div>
        <div className="flex flex-wrap mt-5 max-w-2xl justify-center gap-3">
          {Suggestions.map((suggestion, index) => (
            <h2
              onClick={() => onGenerate(suggestion)}
              className="p-1 px-2 border rounded-full text-sm text-gray-300 hover:text-white transition-all cursor-pointer"
              key={index}
            >
              {suggestion}
            </h2>
          ))}
        </div>
        <SigninDialog
          openDialog={openDialog}
          closeDialog={(e: boolean) => setOpenDialog(e)}
        />
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-lg z-50">
          <div className="shadow-lg bg-neutral-900/90 px-6 py-3 drop-shadow-lg rounded-xl text-white sm:text-xl lg:text-2xl font-medium animate-pulse border border-gray-700">
            Loading Your WorkBench...
          </div>
        </div>
      )}
    </div>
  );
}
