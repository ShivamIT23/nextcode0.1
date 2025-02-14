"use client"

import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import ArrowRight from "./c_ArrowRight";
import Link from "./c_Link";
import useMessageStore from "@nextCode/context/user_input";
import SigninDialog from "./c_SigninDialog";
import { useUserDetail } from "@nextCode/context/user_detail";
// import { useMutation } from "convex/react";
// import { api } from "@nextCode/convex/_generated/api";

const Suggestions = ['Create TODO App in React','Create Budget Track App','Create a Random Game Website','Create a Simon Game Website','Create a Youtube Frontend Website','Create a Amazon Frontend Website']

export default function Main() {
  const[userInput , setUserInput] = useState("")
  const[openDialog , setOpenDialog] = useState(false)
  const { setMessage } = useMessageStore();
  const {user} = useUserDetail();

  // const CreateWorkSpace = useMutation(api.workSpace.CreateWorkSpace)

  const onGenerate = (input:string) => {
    console.log(user.uid.length)
    if(!user.uid.length) {
    setOpenDialog(true);
    }
    setMessage({
      role:"user",
      content:input
    })
  }

  return (
    <div className="w-80vw h-[calc(80vh-100px)] mx-[10vw] mt-[15vh] mb-[5vh] flex flex-col justify-start items-center">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl">What do you want to build?</h2>
        <p> Prompt, run, edit, and deploy full-stack web app </p>
        <div className="relative w-full max-w-xl min-h-fit bg-zinc-900 rounded-2xl">
          <Textarea
            className="h-[25vh] p-3 rounded-2xl"
            placeholder="Type your message here."
            onChange={(e)=>setUserInput(e.target.value)}
          />
          {userInput && <Button onClick={()=> onGenerate(userInput)} variant="outline" className="bg-blue-500 mt-2 mr-2 text-white absolute top-0 right-0">
            <ArrowRight></ArrowRight>
          </Button>}
          <Button variant="link" className=" mb-2 ml-2 w-4 h-6 text-white absolute bottom-0 left-0">
            <Link />
          </Button>
        </div>
        <div className="flex flex-wrap mt-5 max-w-2xl justify-center gap-3">
            {Suggestions.map((suggestion, index) => (
              <h2 onClick={()=> onGenerate(suggestion)} className="p-1 px-2 border rounded-full text-sm text-gray-300 hover:text-white transition-all cursor-pointer" key={index}>{suggestion}</h2>
            ))}
        </div>
        <SigninDialog openDialog={openDialog} closeDialog={(e:boolean)=> setOpenDialog(e)} />
      </div>
    </div>
  );
}
