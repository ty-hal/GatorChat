import { useState } from "react";
// Rich Text Editor via Tip Tap
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RTE } from "./RTE";

const CreateThread = () => {
  const [openEditor, toggleOpenEditor] = useState(true);
  return (
    <div
      className="mx-auto w-11/12 cursor-pointer rounded-2xl border-2 border-gray-600 bg-gray-200 py-2  shadow-xl hover:border-blue-600 dark:bg-gray-800 lg:w-4/5"
      id="container"
      // onClick={() => toggleOpenEditor(!openEditor)}
    >
      <div className="text-center text-lg font-semibold text-gray-900 dark:text-white">
        Create a thread
      </div>
      {openEditor && (
        <div className="text-gray-900 dark:text-white">
          <div className="text-center font-semibold">Title</div>
          <div className="text-center font-semibold">Text</div>
          <RTE />
        </div>
      )}
    </div>
  );
};

export default CreateThread;
