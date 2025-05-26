"use client";

import { useUserDetail } from "@nextCode/context/user_detail";
import { api } from "@nextCode/convex/_generated/api";
import { Id } from "@nextCode/convex/_generated/dataModel";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";

interface History {
  _id: Id<"workBench">;
  _creationTime: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileData?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: any;
  user: Id<"users">;
}

export default function WorkBenchHistory() {
  const { user } = useUserDetail();
  const convex = useConvex();
  const [historyList, setHistoryList] = useState<History[]>();
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    getAllWorkBench();
  });

  useEffect(() => {
    getAllWorkBench();
  }, [user]);

  const getAllWorkBench = async () => {
    if (!user) return;
    const result = await convex.query(api.workBench.getHistory, {
      userId: user._id as Id<"users">,
    });
    console.log("hiii");
    setHistoryList(result);

  };

  return (
    <div>
      <h2 className="font-semibold text-lg text-red-300">Your Chats :</h2>
      {historyList && (
        <div>
          {historyList.map((bench, index) => {
            return (
              <Link href={`/workBench/` + bench._id} key={index}>
                <div
                  onClick={toggleSidebar}
                  className="text-sm text-gray-400 font-light mt-2 hover:text-white cursor-pointer"
                >
                  {JSON.stringify(bench.message[0].content)}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
