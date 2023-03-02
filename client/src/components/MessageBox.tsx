import React, { useEffect, useState } from "react";
import { RichTextEditor } from "./RichTextEditor";
import { useAtomValue } from "jotai";
import { messageBoxAtom } from "../pages/DeleteLater/SampleThread";
interface Props {
  thread_id: number;
}
interface messageBody {
  user_id: number;
  thread_id: number;
  content: string | undefined;
}

const MessageBox: React.FC<Props> = ({ thread_id }) => {
  const [message, setMessage] = useState<string>("");
  const replyMessage = useAtomValue(messageBoxAtom);

  const [openEditor, toggleOpenEditor] = useState(false);
  useEffect(() => {
    if (replyMessage) {
      setMessage(replyMessage);
      toggleOpenEditor(true);
    } else toggleOpenEditor(false);
  }, [replyMessage]);

  const submitMessage = () => {
    console.log(message);
    // API CALL TO POST MESSAGE

    // After successful API call, clear states and message div
    toggleOpenEditor(false);
    setMessage("");

    const messageRequest: messageBody = {
      user_id: 7, // REPLACE WITH REAL USER ID LATER
      thread_id: thread_id,
      content: message,
    };

    // Backend call to create a thread
    // CHANGE THE API TO MESSAGE
    //   fetch("http://localhost:9000/api/thread", {
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     body: JSON.stringify(messageRequest),
    //   })
    //     .then((response) => {
    //       if (response.status === 200) {
    //         window.location.reload();
    //         return response.json();
    //       }
    //     })
    //     .then((data) => {
    //       console.log(data);
    //     });
    // };
  };

  return (
    <div
      className="mx-auto flex w-11/12 rounded-b-lg border-2 border-t border-gray-500 bg-gray-200 px-1 py-4 shadow-xl dark:border-gray-300 dark:bg-gray-800 md:px-3 lg:w-4/5"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* Message */}
      <div className="flex w-full justify-between">
        {openEditor ? (
          <div className="mx-2 -my-2 w-5/6 sm:w-full md:mx-4" id="text">
            <RichTextEditor
              setText={setMessage}
              textContent={message}
              charLimit={4000}
            />
          </div>
        ) : (
          <div
            id="message-placeholder"
            className="mx-2 block w-full cursor-text rounded-lg border border-blue-500 bg-white 
        p-2.5 text-sm text-gray-400 ring-blue-500 dark:border-blue-500 
         dark:bg-gray-800  
        dark:text-gray-400 dark:ring-blue-500 md:mx-4 md:text-base"
            onClick={(e) => {
              e.stopPropagation();
              toggleOpenEditor(true);
            }}
          >
            Your message...
          </div>
        )}

        <div className="flex flex-col">
          {/* Submit Message */}
          <button
            type="submit"
            className="inline-flex h-8 cursor-pointer justify-center rounded-full p-1 text-blue-600 hover:bg-blue-100 
            dark:text-blue-500 dark:hover:bg-gray-600 md:h-10 md:p-2"
            onClick={submitMessage}
            id="submit-message"
            title="Submit message"
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6 rotate-90"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
          {/* Cancel */}
          {openEditor && (
            <button
              type="submit"
              className="inline-flex h-8 cursor-pointer justify-center rounded-full hover:bg-blue-100 dark:hover:bg-gray-600 md:h-10"
              onClick={() => {
                toggleOpenEditor(false);
                setMessage("");
              }}
              id="cancel-message"
              title="Close message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 fill-red-500 md:h-9 md:w-9 md:pt-1"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
