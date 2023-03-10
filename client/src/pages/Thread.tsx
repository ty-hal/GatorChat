import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { atom } from "jotai";
import Footer from "../components/Footer";
import ThreadPost from "../components/Thread/ThreadPost";
import Message from "../components/Message/MessageFormat";
import MessageBox from "../components/Message/MessageBox";
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
  const { thread_name, thread_id, section_name, section_id } = useParams();
  const navigate = useNavigate();

  const [thread, setThread] = useState<ThreadType>(Object);
  const [messages, setMessages] = useState<MessageType[]>([]);

  // API call here to get thread and messages
  const getThread = () => {
    fetch(`http://localhost:9000/api/thread/${thread_id}`, {
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
    fetch(`http://localhost:9000/api/thread/${thread_id}/posts`, {
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
    // If thread_id (URL param) is not a number, go back to the previous page
    if (!/^\d+$/.test(thread_id || "") || !/^\d+$/.test(section_id || "")) {
      navigate(-1);
    }
    getThread();
    getMessages();
  }, [section_id, thread_id, navigate]);

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
        <ThreadPost
          key={thread.thread_id}
          thread_id={thread.thread_id}
          user_id={thread.user_id}
          username={thread.username}
          threadTitle={thread.thread_title}
          threadContent={thread.content}
          threadDate={thread.creation_date}
          updatedOn={thread.updated_on}
          likesCount={thread.likes ? thread.likes : 0}
          messagesCount={messages.length}
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
              updatedOn={messages.updated_on}
              likesCount={messages.likes ? messages.likes : 0}
              replyFunc={replyFunc}
            />
          );
        })}
        <div ref={dummy}></div>
        <MessageBox thread_id={thread.thread_id} />
      </div>
      <Footer />
    </div>
  );
};

export default SampleThread;
