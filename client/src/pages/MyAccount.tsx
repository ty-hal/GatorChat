import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userIDAtom } from "../App";
import ThreadPreview from "../components/Thread/ThreadPreview";
import SkeletonThreadPreview from "../components/Thread/SkeletonThreadPreview";
import { useEffect, useState } from "react";

type Thread = {
  thread_id: number;
  section_id: number;
  section_name: string;
  user_id: number;
  username: string;
  threadTitle: string;
  threadContent: string;
  threadDate: string;
  updatedOn: string;
  likesCount: number;
  messagesCount: number;
  userLiked: boolean;
  userAdmin: boolean;
};

const MyAccount = () => {
  const [loadedSavedThreads, setLoadedSavedThreads] = useState<boolean>(false);
  const [userSavedThreads, setUserSavedThreads] = useState<Thread[]>([]);

  const activeUserID = useAtomValue(userIDAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user saved threads
    if (activeUserID != null && activeUserID > 0) {
      console.log(activeUserID);
      fetch(`http://localhost:9000/api/user/${activeUserID}/savedthreads`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUserSavedThreads(data);
          setLoadedSavedThreads(true);
        });
    } else if (activeUserID != null && activeUserID === 0) {
      setLoadedSavedThreads(true);
    }
  }, [activeUserID]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* User saved threads */}
      <div className="mx-auto w-11/12 pt-4 text-black dark:text-white">
        <div className="text-center text-2xl font-bold">My Saved Threads</div>
        {loadedSavedThreads ? (
          userSavedThreads && userSavedThreads.length > 0 ? (
            userSavedThreads.map((thread, index) => {
              return (
                <></>
                //   <ThreadPreview
                //   key={index} // For TS map purposes
                //   thread_id={thread.thread_id}
                //   section_id={thread.section_id}
                //   section_name={section_name ? section_name : ""}
                //   user_id={thread.user_id}
                //   username={thread.username}
                //   threadTitle={thread.thread_title}
                //   threadContent={thread.content}
                //   threadDate={thread.creation_date}
                //   updatedOn={thread.updated_at}
                //   likesCount={thread.likes ? thread.likes : 0}
                //   messagesCount={
                //     thread.message_count ? thread.message_count : 0
                //   }
                //   userLiked={thread.user_liked}
                //   userAdmin={userAdmin}
                //   />
              );
            })
          ) : (
            <div className="mt-2 text-center">
              {activeUserID === 0
                ? "Sign in to your account to save threads and access them here."
                : "You do not have any threads saved on your account."}
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
  );
};

export default MyAccount;
