import { create } from "zustand";

export const default_file = {
  "/public/index.html": {
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NextCode</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
  },
  "/App.css": {
    code: `@tailwind base;
@tailwind components;
@tailwind utilities;`,
  },
  "/App.js": {
    code: `export default function App() {
  return <h1 className="bg-black text-yellow-50">Hello world</h1>;
}`,
    "/index.js": {
      code: `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App.js";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
    },
  },
  "/tailwind.config.js": {
    code: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};`,
  },
  "/postcss.config.js": {
    code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;`,
  },
};

type FileStore = {
  files: typeof default_file;
  setFiles: (newFile: typeof default_file) => void;
  setFileCode: (filePath: string, code: string) => void;
  resetFiles: () => void;
};

type LoadingState = {
  loading: boolean;
  setLoading: (e: boolean) => void;
};

export const useLoading = create<LoadingState>((set) => ({
  loading: false,
  setLoading: (e: boolean) => set({ loading: e }),
}));

export const useFilesStore = create<FileStore>((set) => ({
  files: default_file,
  setFiles: (newFile) => set({ files: newFile }),
  setFileCode: (filePath, code) =>
    set((state) => ({
      files: {
        ...state.files,
        [filePath]: {
          code: code,
        },
      },
    })),
  resetFiles: () =>
    set({
      files: default_file,
    }),
}));
