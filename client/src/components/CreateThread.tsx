import { useEffect, useState } from "react";
import { RichTextEditor } from "./RichTextEditor";

type thread = {
  title: string;
  text: string;
};

const CreateThread = () => {
  const [openEditor, toggleOpenEditor] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [thread, setThread] = useState<thread>();

  useEffect(() => {
    setThread({ ...thread, title: title, text: text });
  }, [title, text]);

  return (
    <div
      className="mx-auto w-11/12 cursor-pointer rounded-2xl border-2 border-gray-600 bg-gray-200 shadow-xl dark:bg-gray-800 lg:w-4/5"
      id="container"
      onClick={(e) => {
        e.stopPropagation();
        toggleOpenEditor(!openEditor);
      }}
    >
      <div className="rounded-2xl py-2 text-center text-lg  font-semibold text-gray-900 hover:bg-gray-700 dark:text-white">
        Create a thread
      </div>
      {openEditor && (
        <div
          className="mt-1 cursor-default text-gray-900 dark:text-white"
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
              className="w-full break-normal rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter a title..."
              maxLength={300}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <div className="mx-auto mt-2 w-full text-right text-gray-400">
              {title.length}/300 characters
            </div>
          </div>
          <div className="mx-auto w-11/12">
            <div className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
              Text
            </div>
            <RichTextEditor setText={setText} />
          </div>

          {thread!.title && thread!.text !== "<p></p>" && (
            <div className="mx-auto w-11/12 py-2">
              <button
                className="rounded-lg border border-black bg-blue-600 py-1 px-2 text-white  hover:bg-blue-800 dark:border-white"
                onClick={() => {
                  console.log(thread);
                }}
              >
                Create thread
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateThread;
