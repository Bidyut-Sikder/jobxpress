"use client";

import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import React from "react";

const JsonToHtml = ({ json }: { json: JSONContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Typography,
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert" +
          "prose-h1:text-gray-500 prose-h2:text-gray-500 prose-h3:text-gray-500 " +
          "prose-h4:text-gray-500 prose-h5:text-gray-500 prose-h6:text-gray-500 " +
          "prose-p:text-gray-400 " +
          "prose-a:text-blue-400 hover:prose-a:underline " +
          "prose-strong:text-gray-400 prose-em:text-gray-200 prose-del:text-red-400 " 
        
      },
    },
    editable: false,
    content: json,
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
};

export default JsonToHtml;

////////////////////////  

// "use client";

// import TextAlign from "@tiptap/extension-text-align";
// import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Typogrophy from "@tiptap/extension-typography";
// import React from "react";

// const JsonToHtml = ({ json }: { json: JSONContent }) => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       TextAlign.configure({
//         types: ["heading", "paragraph"],
//       }),
//       Typogrophy,
//     ],
//     editorProps: {
//       attributes: {
//         class:
//           "prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert ",
//       },
//     },
//     editable: false,
//     content: json,
//     immediatelyRender: false,
//   });
//   return <EditorContent editor={editor} />;
// };

// export default JsonToHtml;
