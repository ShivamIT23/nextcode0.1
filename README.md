# NextCode 0.1

NextCode 0.1 is an AI-powered web application that helps users generate website code dynamically using natural language prompts. It integrates Google’s generative AI models to transform user input into fully functional code snippets and previews.

---

## Features

- **AI-Powered Code Generation:** Uses Google’s generative AI (`@google/generative-ai`) to create website code from prompts.
- **Live Code Editor & Preview:** Integrates `@codesandbox/sandpack-react` and `@monaco-editor/react` for in-browser code editing and real-time preview.
- **Modern UI Components:** Uses Radix UI primitives (`@radix-ui/react-avatar`, `dialog`, `tooltip`, etc.) for accessible and customizable UI elements.
- **Theme Support:** Supports light/dark mode via `next-themes`.
- **State Management:** Uses `zustand` for efficient React state management.
- **Markdown Rendering:** Renders markdown content with `react-markdown` and `rehype-raw`.
- **TypeScript and ESLint:** Built with TypeScript for type safety and ESLint for code quality.
- **Styling:** Powered by Tailwind CSS with utilities for animation, scrollbars, and class variance management.

---

## Tech Stack

- Next.js 15 with App Router
- React 18
- Google Generative AI API
- CodeSandbox Sandpack & Monaco Editor for code editing & live preview
- Radix UI for accessible components
- Tailwind CSS with animations & utilities
- Next Themes for dark/light mode toggle
- Zustand for global state
- NextAuth for authentication (optional, if configured)
- TypeScript & ESLint for developer experience

---

## Getting Started

### Prerequisites

- Node.js v16 or higher
- npm or yarn

### Installation

```bash
git clone https://github.com/ShivamIT23/nextcode0.1.git
cd nextcode0.1
npm install
Running Locally
bash
Copy
Edit
npm run dev

### Open your browser

at http://localhost:3000 to start using NextCode.