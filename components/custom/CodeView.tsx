"use client";

import React, { useEffect, useState } from "react";

import { SandpackProvider } from "@codesandbox/sandpack-react";
import { dependancies } from "@nextCode/lib/dependency";
import { useFilesStore, useLoading } from "@nextCode/context/files_detail";
import useMessageStore from "@nextCode/context/user_input";
import Prompt from "@nextCode/app/lib/prompt";
import { useConvex, useMutation } from "convex/react";
import { api } from "@nextCode/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@nextCode/convex/_generated/dataModel";
import { Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import useLiveAIMessageStore , {liveAIExplanationState} from "@nextCode/context/live_chat";

const CodeEditor = dynamic(() => import("./CodeEditor"), {
  loading: () => <div>Loading...</div>, // Optional loader
  ssr: false,
});

const CodeView = () => {
  const [activeTab, setActiveTab] = useState("code");
  const { files, setFiles, resetFiles } = useFilesStore();
  const { message, setMessage } = useMessageStore();
  const { id } = useParams();
  const updateCodeWorkBench = useMutation(api.workBench.updateCodeWorkBench);
  const updateWorkBench = useMutation(api.workBench.updateWorkBench);
  const convex = useConvex();
  const { loading, setLoading } = useLoading();
  const [sandpackFiles, setSandpackFiles] = useState(files);
  const { setLiveAIMessage, refreshAIMessafe } = useLiveAIMessageStore();
  const { setExplanation , refreshExplanation} = liveAIExplanationState()

  useEffect(() => {
    setSandpackFiles(files); // Ensures Sandpack receives updated files
  }, [files]);

  useEffect(() => {
    if (id) getFileData();
  }, [id]);

  const getFileData = async () => {
    try {
      if (!id) return;
      const res = await convex.query(api.workBench.getWorkBench, {
        workBenchId: id[0] as Id<"workBench">,
      });
      if (!res) {
        resetFiles();
        return;
      }
      const mergedFiles = { ...files, ...res?.fileData };
      setFiles(mergedFiles);
    } catch (err) {
      resetFiles();
      console.error("Error while fetching data:", err);
    }
  };

  useEffect(() => {
    if (message.length > 0) {
      const lastRole = message[message.length - 1]?.role;
      if (lastRole === "user" || lastRole === "guest") {
        GenerateAiCode();
      }
    }
  }, [message.length]);

  const GenerateAiCode = async () => {
    setLoading(true);
    if (!id) return;
    refreshAIMessafe(); // Clear old stream if any
    refreshExplanation(); //clear old Explanation if any

    const PROMPT = JSON.stringify(message) + "  " + Prompt.CODE_GEN_PROMPT;

    const res = await fetch("/api/gen-ai-code", {
      method: "POST",
      body: JSON.stringify({ prompt: PROMPT }),
    });
    
    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let fullResponse = "";

    let i =0;
    
    while (true) {
      if (!reader) break;
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      console.log(chunk)
      if(i>3){
        setExplanation(chunk)
        i++;
      }
      fullResponse += chunk;
      setLiveAIMessage(chunk);
      await new Promise((r) => setTimeout(r, 20)); // Streaming effect
    }

    let aiRes;
    try {
      aiRes = JSON.parse(fullResponse);
    } catch (e) {
      console.error("Streaming JSON parse failed:", e);
      setLoading(false);
      return;
    }

    const AIResChat = {
      role: "ai",
      content: aiRes.projectTitle + "\n\n" + aiRes.explanation,
    };
    setMessage(AIResChat, true);
    const mergedFiles = { ...files, ...aiRes.files };
    setFiles(mergedFiles);

    await updateCodeWorkBench({
      workBenchId: id[0] as Id<"workBench">,
      files: aiRes.files,
    });

    await updateWorkBench({
      message: [...message, AIResChat],
      workBenchId: id[0] as Id<"workBench">,
    });

    setLoading(false);
  };

  return (
    <div className="w-full relative">
      {/* Tab Navigation */}
      <div className="bg-[#181818] rounded-t-lg rounded-b-none w-full p-2 border">
        <div className="flex items-center rounded-full bg-black p-2 px-3 gap-3 max-w-fit">
          {["code", "preview"].map((tab) => (
            <h2
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-semibold cursor-pointer transition-all duration-300 ease-in-out p-1 rounded-3xl ${
                activeTab === tab &&
                `${tab === "code" ? "text-teal-500 bg-teal-500" : "text-blue-500 bg-blue-500"} bg-opacity-25 px-2`
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </h2>
          ))}
        </div>
      </div>
      <SandpackProvider
        key={Object.keys(sandpackFiles).length}
        className="w-full"
        files={sandpackFiles}
        template="react"
        theme="dark"
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
        customSetup={{
          dependencies: { ...dependancies },
        }}
      >
        <CodeEditor activeTab={activeTab} />
      </SandpackProvider>
      {loading && (
        <div className="flex absolute mr-10 justify-center mt-40 opacity-50 gap-4 h-40 w-full text-xl top-0 text-white ">
          <Loader2Icon width="50px" height="50px" className="animate-spin" />
          <h2 className="h-[50px] mt-3">Generating Your Own WebSite...</h2>
        </div>
      )}
    </div>
  );
};

export default CodeView;
