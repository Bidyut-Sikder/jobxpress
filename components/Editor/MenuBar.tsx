import React from "react";
import { Editor } from "@tiptap/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toggle } from "../ui/toggle";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  ListIcon,
  ListOrderedIcon,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { cn } from "@/lib/utils";
// import TextAlign from "@tiptap/extension-text-align";
import { Button } from "../ui/button";
interface iAppProps {
  editor: Editor | null;
}

const MenuBar = ({ editor }: iAppProps) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="border rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                className={cn(
                  editor.isActive("bold") && "bg-muted text-muted-foreground"
                )}
              >
                <Bold />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
                className={cn(
                  editor.isActive("italic") && "bg-muted text-muted-foreground"
                )}
              >
                <Italic />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("strike")}
                onPressedChange={() =>
                  editor.chain().focus().toggleStrike().run()
                }
                className={cn(
                  editor.isActive("strike") && "bg-muted text-muted-foreground"
                )}
              >
                <Strikethrough />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Hedding 1</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={cn(
                  editor.isActive("heading", { level: 1 }) &&
                    "bg-muted text-muted-foreground"
                )}
              >
                <Heading1 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={cn(
                  editor.isActive("heading", { level: 2 }) &&
                    "bg-muted text-muted-foreground"
                )}
              >
                <Heading2 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={cn(
                  editor.isActive("heading", { level: 3 }) &&
                    "bg-muted text-muted-foreground"
                )}
              >
                <Heading3 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Heading 3</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
                className={cn(
                  editor.isActive("bulletList") &&
                    "bg-muted text-muted-foreground"
                )}
              >
                <ListIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("orderedList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
                className={cn(
                  editor.isActive("orderedList") &&
                    "bg-muted text-muted-foreground"
                )}
              >
                <ListOrderedIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Ordered List</TooltipContent>
          </Tooltip>
        </div>
        <div className="w-px h-6 bg-border mx-2"></div>

        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive({ textAlign: "left" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className={cn(
                  editor.isActive({ textAlign: "left" }) &&
                    "bg-muted text-muted-foreground"
                )}
              >
                <AlignLeftIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align Left</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive({ textAlign: "center" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={cn(
                  editor.isActive({ textAlign: "center" }) &&
                    "bg-muted text-muted-foreground"
                )}
              >
                <AlignCenterIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align Center</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive({ textAlign: "right" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={cn(
                  editor.isActive({ textAlign: "right" }) &&
                    "bg-muted text-muted-foreground"
                )}
              >
                <AlignRightIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align Rihgt</TooltipContent>
          </Tooltip>
        </div>
        <div className="w-px h-6 bg-border mx-2"></div>
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={"sm"}
                variant={"ghost"}
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={"sm"}
                variant={"ghost"}
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default MenuBar;
////////////////////////////////////

// import React, { useState } from "react";
// import { Editor } from "@tiptap/react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { TooltipProvider } from "@radix-ui/react-tooltip";
// import { Toggle } from "../ui/toggle";
// import { Input } from "../ui/input";
// import {
//   Bold,
//   Italic,
//   Underline,
//   Strikethrough,
//   Heading1,
//   Heading2,
//   Heading3,
//   Quote,
//   Code,
//   List,
//   ListOrdered,
//   Undo2,
//   Redo2,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   AlignJustify,
//   Link as LinkIcon,
//   Droplet,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface MenuBarProps {
//   editor: Editor | null;
// }

// const MenuBar = ({ editor }: MenuBarProps) => {
//   const [linkUrl, setLinkUrl] = useState("");

//   if (!editor) return null;

//   const addLink = () => {
//     if (linkUrl) {
//       editor
//         .chain()
//         .focus()
//         .extendMarkRange("link")
//         .setLink({ href: linkUrl })
//         .run();
//       setLinkUrl("");
//     }
//   };

//   const removeLink = () => {
//     editor.chain().focus().unsetLink().run();
//   };

//   return (
//     <div className="border-b p-2 bg-card flex flex-wrap gap-2 items-center">
//       <TooltipProvider>
//         {/* Text Styles */}
//         <ToggleButton
//           editor={editor}
//           command={() => editor.chain().focus().toggleBold().run()}
//           icon={<Bold />}
//           label="Bold"
//           isActive={editor.isActive("bold")}
//         />
//         <ToggleButton
//           editor={editor}
//           command={() => editor.chain().focus().toggleItalic().run()}
//           icon={<Italic />}
//           label="Italic"
//           isActive={editor.isActive("italic")}
//         />
//         <ToggleButton
//           editor={editor}
//           command={() => editor.chain().focus().toggleUnderline().run()}
//           icon={<Underline />}
//           label="Underline"
//           isActive={editor.isActive("underline")}
//         />
//         <ToggleButton
//           editor={editor}
//           command={() => editor.chain().focus().toggleStrike().run()}
//           icon={<Strikethrough />}
//           label="Strikethrough"
//           isActive={editor.isActive("strike")}
//         />

//         {/* Headings */}
//         <ToggleButton
//           editor={editor}
//           command={() =>
//             editor.chain().focus().toggleHeading({ level: 1 }).run()
//           }
//           icon={<Heading1 />}
//           label="H1"
//           isActive={editor.isActive("heading", { level: 1 })}
//         />
//         <ToggleButton
//           editor={editor}
//           command={() =>
//             editor.chain().focus().toggleHeading({ level: 2 }).run()
//           }
//           icon={<Heading2 />}
//           label="H2"
//           isActive={editor.isActive("heading", { level: 2 })}
//         />
//         <ToggleButton
//           editor={editor}
//           command={() =>
//             editor.chain().focus().toggleHeading({ level: 3 }).run()
//           }
//           icon={<Heading3 />}
//           label="H3"
//           isActive={editor.isActive("heading", { level: 3 })}
//         />

//         {/* Blockquote & Code */}
//         <ToggleButton
//           editor={editor}
//           command={() => editor.chain().focus().toggleBlockquote().run()}
//           icon={<Quote />}
//           label="Blockquote"
//           isActive={editor.isActive("blockquote")}
//         />
//         <ToggleButton
//           editor={editor}
//           command={() => editor.chain().focus().toggleCode().run()}
//           icon={<Code />}
//           label="Code"
//           isActive={editor.isActive("code")}
//         />

//         {/* Lists */}
//         <ToggleButton
//           editor={editor}
//           command={() => editor.chain().focus().toggleBulletList().run()}
//           icon={<List />}
//           label="Bullet List"
//           isActive={editor.isActive("bulletList")}
//         />
//         <ToggleButton
//           editor={editor}
//           command={() => editor.chain().focus().toggleOrderedList().run()}
//           icon={<ListOrdered />}
//           label="Ordered List"
//           isActive={editor.isActive("orderedList")}
//         />

//         {/* Alignment */}
//         <ToggleButton
//           editor={editor}
//           command={() => editor.chain().focus().setTextAlign("left").run()}
//           icon={<AlignLeft />}
//           label="Align Left"
//           isActive={editor.isActive({ textAlign: "left" })}
//         />
//         <ToggleButton
//           editor={editor}
//           command={() => editor.chain().focus().setTextAlign("center").run()}
//           icon={<AlignCenter />}
//           label="Align Center"
//           isActive={editor.isActive({ textAlign: "center" })}
//         />
//         <ToggleButton
//           editor={editor}
//           command={() => editor.chain().focus().setTextAlign("right").run()}
//           icon={<AlignRight />}
//           label="Align Right"
//           isActive={editor.isActive({ textAlign: "right" })}
//         />
//         <ToggleButton
//           editor={editor}
//           command={() => editor.chain().focus().setTextAlign("justify").run()}
//           icon={<AlignJustify />}
//           label="Justify"
//           isActive={editor.isActive({ textAlign: "justify" })}
//         />

//         {/* Undo / Redo */}
//         <ToggleButton
//           editor={editor}
//           command={() => editor.chain().focus().undo().run()}
//           icon={<Undo2 />}
//           label="Undo"
//           isActive={false}
//         />
//         <ToggleButton
//           editor={editor}
//           command={() => editor.chain().focus().redo().run()}
//           icon={<Redo2 />}
//           label="Redo"
//           isActive={false}
//         />

//         {/* Link */}
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <div className="flex items-center gap-1">
//               <Input
//                 placeholder="URL"
//                 value={linkUrl}
//                 onChange={(e) => setLinkUrl(e.target.value)}
//                 className="w-[120px] h-8 p-1 rounded border border-input"
//               />
//               <Toggle size="sm" onPressedChange={addLink}>
//                 <LinkIcon />
//               </Toggle>
//               <Toggle size="sm" onPressedChange={removeLink}>
//                 <LinkIcon className="line-through" />
//               </Toggle>
//             </div>
//           </TooltipTrigger>
//           <TooltipContent>Add / Remove Link</TooltipContent>
//         </Tooltip>

//         {/* Highlight Color Picker */}
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <input
//               type="color"
//               className="w-8 h-8 p-0 border rounded cursor-pointer"
//               onChange={(e) =>
//                 editor.chain().focus().setColor(e.target.value).run()
//               }
//             />
//           </TooltipTrigger>
//           <TooltipContent>Text Color</TooltipContent>
//         </Tooltip>

//         <Tooltip>
//           <TooltipTrigger asChild>
//             <input
//               type="color"
//               className="w-8 h-8 p-0 border rounded cursor-pointer"
//               onChange={(e) =>
//                 editor
//                   .chain()
//                   .focus()
//                   .setHighlight({ color: e.target.value })
//                   .run()
//               }
//             />
//           </TooltipTrigger>
//           <TooltipContent>Highlight Color</TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
//     </div>
//   );
// };

// // ToggleButton Component for reusable buttons
// const ToggleButton = ({ editor, command, icon, label, isActive }: any) => (
//   <Tooltip>
//     <TooltipTrigger asChild>
//       <Toggle
//         size="sm"
//         pressed={isActive}
//         onPressedChange={command}
//         className={cn(
//           "transition-colors hover:bg-muted hover:text-muted-foreground",
//           isActive && "bg-muted text-muted-foreground"
//         )}
//       >
//         {icon}
//       </Toggle>
//     </TooltipTrigger>
//     <TooltipContent>{label}</TooltipContent>
//   </Tooltip>
// );

// export default MenuBar;
