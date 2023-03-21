import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import ThreadPreview from "../components/Thread/ThreadPreview";
import CreateThread from "../components/Thread/CreateThread";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonThreadPreview from "../components/Thread/SkeletonThreadPreview";

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
};

interface Props {
  activeUserID: number;
  checkedCookie: boolean;
}

const Section: React.FC<Props> = ({ activeUserID, checkedCookie }) => {
  const { section_name, section_id } = useParams();
  const navigate = useNavigate();

  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [loaded, setLoaded] = useState(false);
  // let activeUserID = useAtomValue(userIDAtom);

  const getThreads = () => {
    console.log(activeUserID);
    fetch(
      `http://localhost:9000/api/section/${section_id}/threads?pageNumber=${page}&pageSize=${4}&activeUser=${activeUserID}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && more) {
          setThreads((threads) => [
            ...threads,
            ...data.filter(
              (thread: ThreadType) =>
                !threads.some((t) => t.thread_id === thread.thread_id)
            ),
          ]);
          setPage((page) => page + 1);
        } else {
          setMore(false);
        }
      })
      .then(() => {
        console.log(threads);
        setLoaded(true);
      });
  };

  useEffect(() => {
    // If section_id (URL param) is not a number, go back to the previous page
    if (!/^\d+$/.test(section_id || "a")) {
      navigate(-1);
    }
    // If user authentication is checked
    if (checkedCookie) {
      console.log(activeUserID);
      getThreads();
    }
  }, [section_id, navigate, checkedCookie]);

  return (
    <InfiniteScroll
      dataLength={threads.length}
      next={
        checkedCookie
          ? getThreads
          : () =>
              console.log(
                "InfiniteScroll next not loaded yet -- user auth first"
              )
      }
      hasMore={more}
      loader={null}
    >
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center rounded-xl p-10">
          <CreateThread
            section_id={parseInt(section_id || "")}
            loaded={loaded}
          />
          {loaded ? (
            threads.map((thread, index) => {
              return (
                <ThreadPreview
                  key={index} // For Javascript map purposes
                  thread_id={thread.thread_id}
                  section_id={thread.section_id}
                  section_name={section_name ? section_name : ""}
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
                />
              );
            })
          ) : (
            <>
              <SkeletonThreadPreview />
              <SkeletonThreadPreview />
              <SkeletonThreadPreview />
            </>
          )}
        </div>
        <Footer />
      </div>
    </InfiniteScroll>
  );
};

export default Section;
