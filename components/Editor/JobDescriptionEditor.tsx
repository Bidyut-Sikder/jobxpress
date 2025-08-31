import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import Typogrophy from "@tiptap/extension-typography";

const JobDescriptionEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typogrophy,
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl  min-h-[300px] p-4 max-w-none focus:outline-none " ,
      },
    },
    immediatelyRender: false,
  });

  return (
    <div className="w-full border rounded-lg overflow-hidden bg-card">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default JobDescriptionEditor;
//////////////////////////////////////////////
// pnpm add @tiptap/extension-underline @tiptap/extension-link @tiptap/extension-highlight @tiptap/extension-text-align @tiptap/extension-placeholder

// import React from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import Link from "@tiptap/extension-link";
// import Highlight from "@tiptap/extension-highlight";
// import TextAlign from "@tiptap/extension-text-align";
// import Placeholder from "@tiptap/extension-placeholder";
// import MenuBar from "./MenuBar";

// const JobDescriptionEditor = () => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         heading: { levels: [1, 2, 3] },
//       }),
//       Underline,
//       Link.configure({
//         openOnClick: false,
//       }),
//       Highlight,
//       TextAlign.configure({
//         types: ["heading", "paragraph"],
//       }),
//       Placeholder.configure({
//         placeholder: "Write the job description here...",
//       }),
//     ],
//     editorProps: {
//       attributes: {
//         class:
//           "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[200px] p-4",
//       },
//     },
//     immediatelyRender: false,
//   });

//   return (
//     <div className="w-full border rounded-lg bg-card">
//       {/* Toolbar */}
//       <MenuBar editor={editor} />

//       {/* Editor Content */}
//       <EditorContent editor={editor} className="min-h-[200px]" />
//     </div>
//   );
// };

// export default JobDescriptionEditor;

//////////

// import React from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import Link from "@tiptap/extension-link";
// import Highlight from "@tiptap/extension-highlight";
// import TextAlign from "@tiptap/extension-text-align";
// import Placeholder from "@tiptap/extension-placeholder";
// import { Color } from "@tiptap/extension-color";
// import {TextStyle} from "@tiptap/extension-text-style";
// import MenuBar from "./MenuBar";

// const JobDescriptionEditor = () => {
//   const editor = useEditor({
//     immediatelyRender: false,
//     extensions: [
//       StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
//       Underline,
//       Link,
//       TextStyle,
//       Highlight,
//       TextAlign.configure({ types: ["heading", "paragraph"] }),
//       Color,
//       Placeholder.configure({
//         placeholder: "Write the job description here...",
//       }),
//     ],
//     editorProps: {
//       attributes: {
//         class:
//           "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[200px] p-4",
//       },
//     },
//   });

//   return (
//     <div className="w-full border rounded-lg bg-card">
//       <MenuBar editor={editor} />
//       <EditorContent editor={editor} className="min-h-[200px]" />
//     </div>
//   );
// };

// export default JobDescriptionEditor;
