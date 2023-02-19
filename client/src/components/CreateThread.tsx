import { useEffect, useState } from "react";
import { RichTextEditor } from "./RichTextEditor";

type Props = {
  section_id: number
}

type thread = {
  title: string;
  text: string;
};

interface threadBody {
  user_id: number;
  section_id: number;
  thread_title: string | undefined;
  content: string | undefined;
}

const CreateThread: React.FC<Props> = ( { section_id }) => {
  const [openEditor, toggleOpenEditor] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [thread, setThread] = useState<thread>();

  const submitThread = () => {
    console.log(thread);
    toggleOpenEditor(false);
    setText("");
    setTitle("");

    const threadRequest: threadBody = {
      user_id: 7, // REPLACE WITH REAL USER ID LATER
      section_id: section_id,
      thread_title: thread?.title,
      content: thread?.text
    }
    
    // Backend call to create a thread
    fetch("http://localhost:9000/api/thread", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(threadRequest),
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload()
          return response.json()
        }
      })
      .then((data) =>{
        console.log(data)
      });

  };

  useEffect(() => {
    setThread({ ...thread, title: title, text: text });
  }, [title, text]);

  return (
    <div
      className="mx-auto w-11/12 cursor-pointer rounded-2xl border-2 border-gray-500 bg-gray-200 shadow-md  dark:border-gray-600 dark:bg-gray-800 lg:w-4/5"
      id="container"
      onClick={(e) => {
        e.stopPropagation();
        toggleOpenEditor(!openEditor);
      }}
    >
      <div className="rounded-2xl py-2 text-center text-lg font-semibold text-gray-900 hover:bg-gray-400 dark:text-white dark:hover:bg-gray-700">
        Create a thread
      </div>
      {openEditor && (
        <div
          className="mt-4 cursor-default text-gray-900 dark:text-white"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="mx-auto w-11/12">
            <input
              type="text"
              className="w-full break-normal rounded-lg border border-gray-600 bg-gray-50 p-2 text-gray-900 focus:border-gray-600 focus:outline-none focus:outline-0 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-200"
              placeholder="Title"
              maxLength={300}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <div className="mx-auto mt-2 w-full text-right text-gray-400">
              {title.length}/300 characters
            </div>
          </div>
          <div className="mx-auto w-11/12">
            <RichTextEditor setText={setText} />
          </div>

          {thread!.title &&
            thread!.text !== "" &&
            thread!.text !== "<p></p>" && (
              <div className="mx-auto w-11/12 py-2">
                <button
                  className="rounded-lg border border-black bg-blue-600 py-1 px-2 text-white hover:bg-blue-700 dark:border-gray-200 dark:hover:bg-blue-800"
                  onClick={submitThread}
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
