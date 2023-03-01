import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { darkModeAtom } from "../App";
import { RichTextEditor } from "./RichTextEditor";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface Props {
  thread_id: number;
}
interface messageBody {
  user_id: number;
  thread_id: number;
  content: string | undefined;
}

const MessageBox: React.FC<Props> = ({ thread_id }) => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [message, setMessage] = useState<string>("");
  const [emojiPicker, toggleEmojiPicker] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(null);

  const [openEditor, toggleOpenEditor] = useState(false);

  const submitMessage = () => {
    console.log(message);
    // API CALL TO POST MESSAGE

    // After successful API call, clear states and message div
    toggleOpenEditor(false);
    setMessage("");
    setCurrentEmoji(null);

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

  useEffect(() => {
    if (currentEmoji) {
      setMessage(message + currentEmoji);
      console.log(message);
    }
  }, [currentEmoji]);

  return (
    <div
      className="mx-auto flex w-11/12 rounded-b-lg border-2 border-t border-gray-500 bg-gray-200 px-1 py-4 shadow-xl dark:border-gray-300 dark:bg-gray-800 md:px-3 lg:w-4/5"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* Emoji */}
      <div className="relative">
        <button
          type="button"
          id="emoji-button"
          className="inline-flex 
        h-8 cursor-pointer 
        justify-center rounded-lg p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 
        dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white 
        md:h-10 md:p-2"
          onClick={(e) => {
            e.stopPropagation();
            toggleEmojiPicker(!emojiPicker);
          }}
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        {emojiPicker && (
          <div className="absolute top-10 -left-12" id="emoji-selector">
            <Picker
              data={data}
              previewPosition="none"
              onEmojiSelect={(e: { native: React.SetStateAction<null> }) => {
                setCurrentEmoji(e.native);
                toggleEmojiPicker(!emojiPicker);
              }}
              categories={[
                "frequent",
                "people",
                "nature",
                "foods",
                "activity",
                "places",
                "objects",
                "symbols",
              ]}
              theme={darkMode === true ? "dark" : "light"}
              onClickOutside={(e: any) => {
                e.stopPropagation();
                toggleEmojiPicker(false);
              }}
              autoFocus={true}
            />
          </div>
        )}
      </div>

      {/* Message */}
      <div className="flex w-full justify-between">
        {openEditor ? (
          <div className="mx-2 -my-2 w-5/6 sm:w-full md:mx-4" id="text">
            <RichTextEditor
              setText={setMessage}
              textContent={message}
              charLimit={2000}
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
      </div>
    </div>
  );
};

export default MessageBox;
