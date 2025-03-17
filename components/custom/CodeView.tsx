"use client";

import React, { useEffect, useState } from "react";
// import {
//   SandpackProvider,
// } from "@codesandbox/sandpack-react";
// import { dependancies } from "@nextCode/lib/dependency";
// import CodeEditor from "./CodeEditor";
// import { useFilesStore } from "@nextCode/context/files_detail";

// export default function CodeView() {
//   const [activeTab, setActiveTab] = useState("code");
//   const { files } = useFilesStore();
//   const [activeFile , setActiveFile] = useState("/App.js")

//   return (
//     <div>
//       {/* Tab Navigation */}
//       <div className="bg-[#181818] w-full p-2 border">
//         <div className="flex items-center rounded-full bg-black p-2 px-3 gap-3 max-w-fit">
//           {["code", "preview"].map((tab) => (
//             <h2
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`text-sm font-semibold cursor-pointer transition-all duration-300 ease-in-out p-1 rounded-3xl ${
//                 activeTab === tab &&
//                 `${tab === "code" ? "text-teal-500 bg-teal-500" : "text-blue-500 bg-blue-500"} bg-opacity-25 px-2`
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </h2>
//           ))}
//         </div>
//       </div>

//       <SandpackProvider
//         files={files}
//         options={{
//           externalResources: ["https://cdn.tailwindcss.com"],
//           autoReload: false,
//         }}
//         customSetup={{ dependencies: { ...dependancies } }}
//         theme="dark"
//         template="react"
//         className="h-full"
//       >
//         <CodeEditor activeTab={activeTab} setActiveFile={setActiveFile} />
//       </SandpackProvider>
//     </div>
//   );
// }

import { SandpackProvider } from "@codesandbox/sandpack-react";
import { dependancies } from "@nextCode/lib/dependency";
import { useFilesStore, useLoading } from "@nextCode/context/files_detail";
import axios from "axios";
import useMessageStore from "@nextCode/context/user_input";
import Prompt from "@nextCode/app/lib/prompt";
import CodeEditor from "./CodeEditor";
import { useConvex, useMutation } from "convex/react";
import { api } from "@nextCode/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@nextCode/convex/_generated/dataModel";
import { Loader2Icon } from "lucide-react";

const CodeView = () => {
  const [activeTab, setActiveTab] = useState("code");
  const { files, setFiles, resetFiles } = useFilesStore();
  const { message, setMessage } = useMessageStore();
  const { id } = useParams();
  const updateCodeWorkBench = useMutation(api.workBench.updateCodeWorkBench);
  const updateWorkBench = useMutation(api.workBench.updateWorkBench);
  const convex = useConvex();
  const { loading, setLoading } = useLoading();

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
    const PROMPT = JSON.stringify(message) + "  " + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post("/api/gen-ai-code", {
      prompt: PROMPT,
    },{
      timeout:60000
    });
    const aiRes = Array.isArray(result.data) ? result.data[0] : result.data;
    const AIResChat = {
      role: "ai",
      content: aiRes.projectTitle + "\n\n" + aiRes.explanation,
    };
    console.log(aiRes);
    console.log(AIResChat);
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
        className="w-full"
        files={files}
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
          <Loader2Icon width='50px' height='50px' className="animate-spin"/>
          <h2 className="h-[50px] mt-3">Generating Your Own WebSite...</h2>
        </div>
      )}
    </div>
  );
};

export default CodeView;
