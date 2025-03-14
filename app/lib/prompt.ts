import dedent from "dedent";

export default {
  CHAT_PROMPT: dedent`
    'You are a AI Assistant and experience in React Development.
    GUIDELINES:
    - Tell user what you are building
    - response less than 15 lines.
    - Skip code examples and commentary'
`,
  //   CODE_GEN_PROMPT: dedent`
  //   Generate a Project in React. Create multiple components, organizing them.

  //   Return the response in JSON format with the following schema:
  //   {
  //     "projectTitle":"",
  //     "explanation":"",
  //     "files": {
  //         "/App.js": {
  //             "code":""
  //         },
  //         ...
  //     },
  //     "generatedFiles": []
  // }

  // Here's the reformatted and improved version of your prompt:

  // Generate a programming code structure for a React project using Vite.

  // Return the response in JSON format with the following schema:

  // json
  // Copy code
  // {
  //     "projectTitle":"",
  //     "explanation":"",
  //     "files": {
  //         "/App.js": {
  //             "code":""
  //         },
  //         ...
  //     },
  //     "generatedFiles": []
  // }
  // Ensure the files field contains all created files and the generatedFiles
  // files:{
  //     "/App.js":{
  //         "code":"import React from 'react';\nimport './styles.css;\n export default function App(){...}
  //     }
  // }
  // Additionally, include an explanation of the project's structure, pu
  // - For placeholder images, please use a https://archive.org/download/image
  // -Add Emoji icons whenever needed to give good user experience
  // - The lucide-react library is also available to be imported If NECCESARY
  // `,
  CODE_GEN_PROMPT: dedent`
Generate a programming code structure for a React project using Vite.

Return the response in JSON format with the following schema:

{
    "projectTitle": "",
    "explanation": "",
    "files": {
        "/App.js": {
            "code": ""
        },
        ...
    },
    "generatedFiles": []
}

Ensure the **files** field contains all the created files with their corresponding file paths and code content.

- Include an **explanation** field that describes the project's structure, purpose, and how the components interact.
- For placeholder images, please use URLs from **https://archive.org/download/placeholder-image/placeholder-image.png**.
- Add **emoji icons** wherever they enhance the user experience.
- The **lucide-react** library is available to be imported whenever necessary.
- Write clean, organized, and reusable code with proper comments.
- Use consistent naming conventions.
- Include minimal styling in separate **CSS** or **module.css** files.
- Ensure that **index.js** correctly imports the generated **App.js** file directly without any **src** folder.
- Ensure **package.json** includes all the necessary dependencies such as **react**, **react-dom**, **vite**, **lucide-react**, and any other libraries used in the code.
-Ensure the theme is gray.
-Ensure every import have it's file.
`,
};
