import ChatView from "@nextCode/components/custom/ChatView";
import CodeView from "@nextCode/components/custom/CodeView";
import SideBar from "@nextCode/components/custom/c_SideBar";
import { SidebarProvider } from "@nextCode/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider className="max-h-fit min-h-min pb-5">
      <div className="flex max-h-fit w-lvw">
        <SideBar />
        <div className="flex-1 px-10 pt-4">
          <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-10">
            <ChatView />
            <div className="col-span-2">
              <CodeView />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
