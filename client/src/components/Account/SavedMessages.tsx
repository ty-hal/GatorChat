import Footer from "../../components/Footer";
import { useAtomValue } from "jotai";
import { userIDAtom } from "../../App";
import SkeletonThreadPreview from "../../components/Thread/SkeletonThreadPreview";
import { useEffect, useState } from "react";
import Message from "../../components/Message/MessageFormat";
import { useNavigate } from "react-router-dom";

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
  user_saved: boolean;
};

const SavedMessages = () => {
  const navigate = useNavigate();
  const [loadedSavedMessages, setLoadedSavedMessages] =
    useState<boolean>(false);
  const [userSavedMessages, setUserSavedMessages] = useState<Message[]>([]);
  const [userAdmin, setUserAdmin] = useState<boolean>(false);
  const activeUserID = useAtomValue(userIDAtom);

  // Get user permissions
  const getUserPermission = () => {
    fetch(`http://localhost:9000/api/user/${activeUserID}/roles`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => 
      {
        if (data && data.length > 0) 
        {
          setUserAdmin(
            data.some(
              (role: { role_id: number; role_name: string }) =>
                role.role_name === "Admin"
            )
          );
        }
      });
  };

  // Get saved messages
  const getSavedMessages = () => {
    fetch(`http://localhost:9000/api/user/${activeUserID}/savedposts`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserSavedMessages(data);
        setLoadedSavedMessages(true);
      });
  };

  useEffect(() => {
    // Get user saved threads
    if (activeUserID != null && activeUserID > 0) {
      getUserPermission();
      getSavedMessages();
    } else if (activeUserID != null && activeUserID === 0) {
      setLoadedSavedMessages(true);
    }
  }, [activeUserID]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto w-11/12 pt-4 text-black dark:text-white">
        {/* User saved messages */}
        <div className="mx-auto w-11/12 pt-4 text-black dark:text-white">
          <div
            className="cursor-pointer text-center text-2xl font-bold hover:underline"
            onClick={() => navigate(-1)}
          >
            My Saved Messages
          </div>
          {loadedSavedMessages ? (
            userSavedMessages && userSavedMessages.length > 0 ? (
              userSavedMessages.map((messages, index) => {
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
                    user_saved={messages.user_saved}
                    classname="relative my-2 mx-auto w-11/12 cursor-pointer rounded-2xl border-2 border-gray-500 bg-gray-200 py-8 font-normal shadow-md hover:border-blue-600 dark:bg-gray-800 lg:w-4/5"
                  />
                );
              })
            ) : (
              <div className="mt-2 text-center">
                {activeUserID === 0
                  ? "Sign in to your account to save messages and access them here."
                  : "You do not have any messages saved on your account."}
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
  );
};

export default SavedMessages;
