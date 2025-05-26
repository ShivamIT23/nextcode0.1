import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";
import Link from "next/link";
import Logo from "./c_Logo";
import { Button } from "../ui/button";
import { MessageCircleCodeIcon } from "lucide-react";
import WorkBenchHistory from "./WorkBenchHistory";

export default function SideBar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="w-full h-11 flex items-center gap-4 justify-end m-2 cursor-pointer">
          <Link href="/">
            <Logo />
          </Link>
          <h2 className="mt-3 font-thin text-red-400 text-xl"></h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <Button className="m-3">
          <MessageCircleCodeIcon></MessageCircleCodeIcon> Start New Chat
        </Button>
        <SidebarGroup>
          <WorkBenchHistory />
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
