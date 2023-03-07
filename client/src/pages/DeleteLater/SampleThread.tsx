import Footer from "../../components/Footer";
import Thread from "../../components/ThreadPost";
import Message from "../../components/MessageFormat";
import MessageBox from "../../components/MessageBox";
import { useEffect, useRef, useState } from "react";
import { atom } from "jotai";
export const messageBoxAtom = atom("");

type MessageType = {
  thread_id: number;
  user_id: number;
  post_id: number;
  content: string;
  creation_date: string;
  updated_on: string;
  likes: number;
  username: string;
  section_id?: number; // We probably dont need this, right?
  thread_title?: string; // We probably dont need this, right?
};

type ThreadType = {
  thread_id: number;
  user_id: number;
  username: string;
  section_id: number;
  thread_title: string;
  content: string;
  creation_date: string;
  updated_on: string;
  likes: number;
  message_count: number;
};

const SampleThread = () => {
  const [thread, setThread] = useState<ThreadType>(Object);
  const [messages, setMessages] = useState<MessageType[]>([]);

  // API call here to get thread and messages
  let section_id = 22;
  const getThread = () => {
    fetch(`http://localhost:9000/api/thread/${section_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data !== null) {
          setThread(data);
        }
      });
  };
  const getMessages = () => {
    fetch(`http://localhost:9000/api/thread/${section_id}/posts`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data !== null) {
          setMessages(data);
        }
      });
  };

  useEffect(() => {
    getThread();
    getMessages();
  }, []);

  //dummy ref is used to scroll down to message box after clicking reply button on any message/the thread
  const dummy = useRef<null | HTMLDivElement>(null);
  const replyFunc = () => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 ">
      <div className="flex flex-col items-center px-4 pt-4">
        <Thread
          key={thread.thread_id}
          thread_id={thread.thread_id}
          user_id={thread.user_id}
          username={thread.username}
          threadTitle={thread.thread_title}
          threadContent={thread.content}
          threadDate={thread.creation_date}
          likesCount={thread.likes}
          messagesCount={thread.message_count}
          replyFunc={replyFunc}
        />
        {messages.map((messages) => {
          return (
            <Message
              key={messages.post_id}
              post_id={messages.post_id}
              user_id={messages.user_id}
              username={messages.username}
              messageContent={messages.content}
              messageDate={messages.creation_date}
              likesCount={messages.likes}
              replyFunc={replyFunc}
            />
          );
        })}
        <div ref={dummy}></div>
        <MessageBox thread_id={1} />
      </div>
      <Footer />
    </div>
  );
};

export default SampleThread;
