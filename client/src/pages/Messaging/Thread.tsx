import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { atom } from "jotai";
import Footer from "../../components/Footer";
import ThreadPost from "../../components/Thread/ThreadPost";
import Message from "../../components/Message/MessageFormat";
import MessageBox from "../../components/Message/MessageBox";
import SkeletonThreadPost from "../../components/Thread/SkeletonThreadPost";
import SkeletonMessage from "../../components/Message/SkeletonMessage";
import SkeletonMessageBox from "../../components/Message/SkeletonMessageBox";
import InfiniteScroll from "react-infinite-scroll-component";
export const messageBoxAtom = atom("");

type MessageType = {
  thread_id: number;
  user_id: number;
  username: string;
  post_id: number;
  content: string;
  creation_date: string;
  updated_at: string;
  likes: number;
  user_liked: boolean;
  user_saved: boolean;
};

type ThreadType = {
  thread_id: number;
  user_id: number;
  username: string;
  section_id: number;
  thread_title: string;
  content: string;
  creation_date: string;
  updated_at: string;
  likes: number;
  message_count: number;
  user_liked: boolean;
  user_saved: boolean;
};

interface Props {
  activeUserID: number;
  checkedCookie: boolean;
  thread_name: string;
  thread_id: string;
  section_name: string;
  section_id: string;
}

const Thread: React.FC<Props> = ({
  activeUserID,
  checkedCookie,
  thread_name,
  thread_id,
  section_name,
  section_id,
}) => {
  const navigate = useNavigate();
  const [sectionName, setSectionName] = useState<string>("");
  const [thread, setThread] = useState<ThreadType>(Object);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [threadLoaded, setThreadLoaded] = useState(false);
  const [messageLoaded, setMessageLoaded] = useState(false);
  const [userAdmin, setUserAdmin] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [more, setMore] = useState<boolean>(true);

  // Get thread
  const getThread = () => {
    fetch(
      `http://localhost:9000/api/thread/${thread_id}?activeUser=${activeUserID}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          setThread(data);
          console.log(data);
        }
        setThreadLoaded(true);
      });
  };
  // Get messages
  const getMessages = () => {
    fetch(
      `http://localhost:9000/api/thread/${thread_id}/posts?pageNumber=${page}&pageSize=${4}&activeUser=${activeUserID}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && more) {
          setMessages((messages) => [
            ...messages,
            ...data.filter(
              (message: MessageType) =>
                !messages.some((t) => t.post_id === message.post_id)
            ),
          ]);
          setPage((page) => page + 1);
        } else {
          setMore(false);
        }
      })
      .then(() => {
        setMessageLoaded(true);
      });
  };
  // Get section
  const getSection = () => {
    fetch(
      `http://localhost:9000/api/section/${section_id}?activeUser=${activeUserID}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const regex = /^[a-zA-Z]{3}\d{4}$/;
        if (
          !regex.test(section_name) &&
          data.section_name
            .replace(/[\W_]+/g, " ")
            .replace(/\s+/g, "-")
            .toLowerCase() !== section_name
        ) {
          navigate(-1);
        }
        setSectionName(data.section_name);
      });
  };
  // Get user permissions
  const getUserPermission = () => {
    fetch(`http://localhost:9000/api/user/${activeUserID}/roles`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setUserAdmin(
            data.some(
              (role: { role_id: number; role_name: string }) =>
                role.role_name === "Admin"
            )
          );
        }
      });
  };

  useEffect(() => {
    // Check if thread belongs to the section
    fetch(`http://localhost:9000/api/thread/${thread_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // If section_id's don't match, go back
        if (data.section_id.toString() !== section_id) {
          navigate(-1);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.log("404 Error: Thread not found");
        } else {
          console.error("Error fetching API: ", error);
        }
        navigate(-1);
      });

    if (checkedCookie) {
      getSection();
      getThread();
      getMessages();
      getUserPermission();
    }
  }, [section_id, thread_id, navigate, checkedCookie]);

  //dummy ref is used to scroll down to message box after clicking reply button on any message/the thread
  const dummy = useRef<null | HTMLDivElement>(null);
  const replyFunc = () => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <InfiniteScroll
      dataLength={messages.length}
      next={
        checkedCookie
          ? getMessages
          : () =>
              console.log(
                "InfiniteScroll next not loaded yet -- user auth first"
              )
      }
      hasMore={more}
      loader={null}
    >
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center px-4 pt-4">
          <div
            className="mb-4 h-8 cursor-pointer text-2xl font-semibold hover:underline dark:text-white"
            onClick={() => navigate(-1)}
          >
            {threadLoaded && messageLoaded && sectionName}
          </div>

          {/* Load thread or skeleton thread */}
          {threadLoaded && messageLoaded ? (
            <ThreadPost
              key={thread.thread_id}
              thread_id={thread.thread_id}
              user_id={thread.user_id}
              username={thread.username}
              threadTitle={thread.thread_title}
              threadContent={thread.content}
              threadDate={thread.creation_date}
              updatedOn={thread.updated_at}
              likesCount={thread.likes ? thread.likes : 0}
              messagesCount={messages.length}
              userLiked={thread.user_liked}
              userAdmin={userAdmin}
              replyFunc={replyFunc}
              user_saved={thread.user_saved}
            />
          ) : (
            <SkeletonThreadPost />
          )}
          {/* Load messages or three skeleton messages */}
          {threadLoaded && messageLoaded ? (
            messages.map((messages) => {
              return (
                <Message
                  key={messages.post_id}
                  post_id={messages.post_id}
                  user_id={messages.user_id}
                  username={messages.username}
                  messageContent={messages.content}
                  messageDate={messages.creation_date}
                  updatedOn={messages.updated_at}
                  likesCount={messages.likes ? messages.likes : 0}
                  userLiked={messages.user_liked}
                  userAdmin={userAdmin}
                  user_saved={messages.user_saved}
                  replyFunc={replyFunc}
                />
              );
            })
          ) : (
            <>
              <SkeletonMessage />
              <SkeletonMessage />
              <SkeletonMessage />
            </>
          )}
          <div ref={dummy}></div>
          {threadLoaded && messageLoaded ? (
            <MessageBox thread_id={thread.thread_id} />
          ) : (
            <SkeletonMessageBox />
          )}
        </div>
        <Footer />
      </div>
    </InfiniteScroll>
  );
};

export default Thread;
