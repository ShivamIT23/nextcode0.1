import {
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useFilesStore } from "@nextCode/context/files_detail";

export default function CodeEditor({ activeTab }: { activeTab: string }) {
  const { sandpack } = useSandpack();
  const {setFileCode} = useFilesStore()


  return (
    <SandpackLayout className="w-full block lg:flex">
      {activeTab === "code" && (
        <>
          <SandpackFileExplorer style={{ height: "80vh", minWidth:'19%', maxWidth:'19.9%' }} />
          <CodeMirror
            value={sandpack.files[sandpack.activeFile]?.code || ""}
            height="80vh"
            width="100%"
            theme="dark"
            extensions={[javascript()]}
            onChange={(newCode) => {
              setFileCode(sandpack.activeFile, newCode);
              sandpack.updateFile(sandpack.activeFile, newCode); // Ensure Sandpack updates the code
            }}
            style={{ height: "80vh", minWidth: '80%', maxWidth:'80%' }}
          />
        </>
      )}
      <SandpackPreview
        style={{
          height: "80vh",
          display: activeTab === "preview" ? "flex" : "none",
        }}
        showNavigator
      />
    </SandpackLayout>
  );
}
