import Footer from "../../components/Footer";
import { useAtomValue } from "jotai";
import { userIDAtom } from "../../App";
import SkeletonThreadPreview from "../../components/Thread/SkeletonThreadPreview";
import { useEffect, useState } from "react";
import Message from "../../components/Message/MessageFormat";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

type Message = {
  thread_id: number;
  user_id: number;
  username: string;
  post_id: number;
  content: string;
  creation_date: string;
  updated_at: string;
  likes: number;
  user_liked: boolean;
};

const MyMessages = () => {
  const navigate = useNavigate();
  const [loadedCreatedMessages, setLoadedCreatedMessages] =
    useState<boolean>(false);
  const [userCreatedMessages, setUserCreatedMessages] = useState<Message[]>([]);
  const [userAdmin, setUserAdmin] = useState<boolean>(false);
  const activeUserID = useAtomValue(userIDAtom);

  const [page, setPage] = useState<number>(1);
  const [more, setMore] = useState<boolean>(true);

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
        setUserAdmin(
          data.some(
            (role: { role_id: number; role_name: string }) =>
              role.role_name === "Admin"
          )
        );
      });
  };

  // Get created messages
  const getCreatedMessages = () => {
    fetch(`http://localhost:9000/api/user/${activeUserID}/createdposts?pageNumber=${page}&pageSize=${4}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && more) {
          setUserCreatedMessages((messages) => [
            ...messages,
            ...data.filter(
              (message: Message) =>
                !messages.some((t) => t.post_id === message.post_id)
            ),
          ]);
          setPage((page) => page + 1);
          console.log(data)
        } else {
          setMore(false);
        }
      })
      .then(() => {
        setLoadedCreatedMessages(true)
      }
      );
  };

  useEffect(() => {
    // Get user saved threads
    if (activeUserID != null && activeUserID > 0) {
      getUserPermission();
      getCreatedMessages();
    } else if (activeUserID != null && activeUserID === 0) {
      setLoadedCreatedMessages(true);
    }
  }, [activeUserID]);

  return (
    <InfiniteScroll
    dataLength={userCreatedMessages.length}
    next={getCreatedMessages}
    hasMore={more}
    loader={null}
    >
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto w-11/12 pt-4 text-black dark:text-white">
        {/* User created messages */}
        <div className="mx-auto w-11/12 pt-4 text-black dark:text-white">
          <div
            className="cursor-pointer text-center text-2xl font-bold hover:underline"
            onClick={() => navigate(-1)}
          >
            My Messages
          </div>
          {loadedCreatedMessages ? (
            userCreatedMessages && userCreatedMessages.length > 0 ? (
              userCreatedMessages.map((messages, index) => {
                return (
                  <Message
                    key={index}
                    post_id={messages.post_id}
                    user_id={messages.user_id}
                    username={messages.username}
                    messageContent={messages.content}
                    messageDate={messages.creation_date}
                    updatedOn={messages.updated_at}
                    likesCount={messages.likes ? messages.likes : 0}
                    userLiked={messages.user_liked}
                    userAdmin={userAdmin}
                    classname="relative my-2 mx-auto w-11/12 cursor-pointer rounded-2xl border-2 border-gray-500 bg-gray-200 py-8 font-normal shadow-md hover:border-blue-600 dark:bg-gray-800 lg:w-4/5"
                  />
                );
              })
            ) : (
              <div className="mt-2 text-center">
                {activeUserID === 0
                  ? "Sign in to your account to create messages and access them here."
                  : "You do not have any messages created on your account."}
              </div>
            )
          ) : (
            <>
              <SkeletonThreadPreview />
              <SkeletonThreadPreview />
              <SkeletonThreadPreview />
              <SkeletonThreadPreview />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
    </InfiniteScroll>
  );
};

export default MyMessages;
