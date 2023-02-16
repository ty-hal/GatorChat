import { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";

const CreateThread = () => {
  const [openEditor, toggleOpenEditor] = useState(false);
  return (
    <div
      className="mx-auto w-11/12 cursor-pointer rounded-2xl border-2 border-gray-600 bg-gray-200 py-2 shadow-xl dark:bg-gray-800 lg:w-4/5"
      id="container"
      onClick={(e) => {
        e.stopPropagation();
        toggleOpenEditor(!openEditor);
      }}
    >
      <div className="text-center text-lg font-semibold text-gray-900 dark:text-white">
        Create a thread
      </div>
      {openEditor && (
        <div
          className="cursor-default text-gray-900 dark:text-white"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="mx-auto w-11/12">
            <div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Title
            </div>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter a title..."
            />
          </div>
          <RichTextEditor />
        </div>
      )}
    </div>
  );
};

export default CreateThread;
