"use client";

import { api } from "@nextCode/convex/_generated/api";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Id } from "@nextCode/convex/_generated/dataModel";
import useMessageStore from "@nextCode/context/user_input";
import { useUserDetail } from "@nextCode/context/user_detail";
import Image from "next/image";
import defaultImage from "@nextCode/public/3122584.png";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import ArrowRight from "./c_ArrowRight";
import Link from "./c_Link";
import { Loader2Icon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useLoading } from "@nextCode/context/files_detail";

export default function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { message, setMessage } = useMessageStore();
  const { user } = useUserDetail();
  const [userInput, setUserInput] = useState("");
  const {loading} = useLoading();

  useEffect(() => {
    if (id) getWorkBenchData();
  }, [id]);

  /// Getting workSpace
  const getWorkBenchData = async () => {
    if (!id) return;
    const res = await convex.query(api.workBench.getWorkBench, {
      workBenchId: id[0] as Id<"workBench">,
    });
    setMessage(res?.message);
  };



  const onGenerate = (input: string) => {
    if (!userInput.trim()) return;
    setMessage(
      { role: user?.isGuest ? "guest" : "user", content: input },
      true
    );
    setUserInput("");
  };

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }) // Scroll to bottom
    }
  }, [message, loading]);

  return (
    <div className="relative h-[80vh] flex flex-col rounded-lg">
      <div
        ref={chatRef}
        className="flex-1 overflow-y-scroll rounded-lg scroll-smooth scrollbar-hide"
      >
        {message.map((msg, i) => (
          <div
            key={i}
            className="p-3 rounded-lg bg-gray-700 mr-5 mb-2 flex gap-2 items-start leading-7"
          >
            {(msg?.role == "user" || msg?.role== "guest") && (
              <Image
                src={user?.img || defaultImage}
                alt="userImg"
                width={35}
                height={35}
                className="rounded-full flex-shrink-0"
              />
            )}
            <div className="flex-grow rounded-lg">
              <ReactMarkdown 
                rehypePlugins={[rehypeRaw]}
                components={{
                  p: ({children}) => <div className="space-y-4 rounded-lg">{children}</div>,
                  pre: ({children}) => <pre className="bg-gray-800 p-4 rounded-lg my-2 overflow-x-auto w-full">{children}</pre>,
                  code: ({children}) => <code className="font-mono bg-gray-800 rounded-lg px-1">{children}</code>,
                  ul: ({children}) => <ul className="list-disc ml-6 my-2 rounded-lg space-y-2">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal ml-6 my-2 rounded-lg space-y-2">{children}</ol>,
                  li: ({children}) => <li>{children}</li>
                }}
              >
                {msg?.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="p-3 rounded-lg bg-gray-700 mr-5 mb-2 flex gap-2 items-start">
            <Loader2Icon className="animate-spin" />
            <h2>Generating Response...</h2>
          </div>
        )}
      </div>
      <div className="relative mr-5 min-h-fit bg-zinc-900 rounded-2xl">
        <Textarea
          value={userInput}
          className="h-[20vh] p-3 pr-16 rounded-2xl shadow-lg drop-shadow-lg bg-[#1e1e2f]"
          placeholder="Type your message here."
          onChange={(e) => setUserInput(e.target.value)}
        />
        {userInput && (
          <Button
          type="submit"
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
    </div>
  );
}
