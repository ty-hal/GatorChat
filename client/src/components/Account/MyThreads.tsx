import Footer from "../../components/Footer";
import { useAtomValue } from "jotai";
import { userIDAtom } from "../../App";
import ThreadPreview from "../../components/Thread/ThreadPreview";
import SkeletonThreadPreview from "../../components/Thread/SkeletonThreadPreview";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

type Thread = {
  thread_id: number;
  section_id: number;
  section_name: string;
  user_id: number;
  username: string;
  thread_title: string;
  content: string;
  creation_date: string;
  updated_at: string;
  likes: number;
  message_count: number;
  user_liked: boolean;
  user_admin: boolean;
  user_saved: boolean;
};

const MyThreads = () => {
  const navigate = useNavigate();
  const [loadedCreatedThreads, setLoadedCreatedThreads] =
    useState<boolean>(false);
  const [userCreatedThreads, setUserCreatedThreads] = useState<Thread[]>([]);
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

  // Get created threads
  const getCreatedThreads = () => {
    fetch(`http://localhost:9000/api/user/${activeUserID}/createdthreads?pageNumber=${page}&pageSize=${4}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && more) {
          setUserCreatedThreads((threads) => [
            ...threads,
            ...data.filter(
              (thread: Thread) =>
                !threads.some((t) => t.thread_id === thread.thread_id)
            ),
          ]);
          setPage((page) => page + 1);
          console.log(data)
        } else {
          setMore(false);
        }
      })
      .then(() => {
        setLoadedCreatedThreads(true)
      }
      );
  };

  useEffect(() => {
    // Get user saved threads
    if (activeUserID != null && activeUserID > 0) {
      getUserPermission();
      getCreatedThreads();
    } else if (activeUserID != null && activeUserID === 0) {
      setLoadedCreatedThreads(true);
    }
  }, [activeUserID]);

  return (
    <InfiniteScroll
      dataLength={userCreatedThreads.length}
      next={getCreatedThreads}
      hasMore={more}
      loader={null}
    >
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto w-11/12 pt-4 text-black dark:text-white">
        {/* User created threads */}
        <div className="mx-auto w-11/12 pt-4 text-black dark:text-white">
          <div
            className="cursor-pointer text-center text-2xl font-bold hover:underline"
            onClick={() => navigate(-1)}
          >
            My Threads
          </div>
          {loadedCreatedThreads ? (
            userCreatedThreads && userCreatedThreads.length > 0 ? (
              userCreatedThreads.map((thread, index) => {
                return (
                  <ThreadPreview
                    key={index} // For TS map purposes
                    thread_id={thread.thread_id}
                    section_id={thread.section_id}
                    section_name=""
                    user_id={thread.user_id}
                    username={thread.username}
                    threadTitle={thread.thread_title}
                    threadContent={thread.content}
                    threadDate={thread.creation_date}
                    updatedOn={thread.updated_at}
                    likesCount={thread.likes ? thread.likes : 0}
                    messagesCount={
                      thread.message_count ? thread.message_count : 0
                    }
                    userLiked={thread.user_liked}
                    userAdmin={userAdmin}
                    user_saved={thread.user_saved}
                  />
                );
              })
            ) : (
              <div className="mt-2 text-center">
                {activeUserID === 0
                  ? "Sign in to your account to create threads and access them here."
                  : "You do not have any threads created on your account."}
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

export default MyThreads;
