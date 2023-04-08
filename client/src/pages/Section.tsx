import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import ThreadPreview from "../components/Thread/ThreadPreview";
import CreateThread from "../components/Thread/CreateThread";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonThreadPreview from "../components/Thread/SkeletonThreadPreview";
import EmbeddedSection from "./EmbeddedSection";

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
  section_name: string;
  section_id: string;
}

const Section: React.FC<Props> = ({
  activeUserID,
  checkedCookie,
  section_name,
  section_id,
}) => {
  const navigate = useNavigate();
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [sectionName, setSectionName] = useState<string>("");
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [loaded, setLoaded] = useState(false);
  // let activeUserID = useAtomValue(userIDAtom);
  const [embeddedSection, setEmbeddedSection] = useState<any>(null);

  const getThreads = () => {
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
        // console.log(data);
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
        setLoaded(true);
      });
  };
  const getSection = () => {
    fetch(`http://localhost:9000/api/section/${section_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.parent_section === true) {
          setEmbeddedSection(
            <EmbeddedSection
              activeUserID={activeUserID}
              checkedCookie={checkedCookie}
              section_name={section_name}
              section_id={section_id}
            />
          );
        }
        setSectionName(data.section_name);
      });
  };

  useEffect(() => {
    if (embeddedSection !== null) {
      return embeddedSection;
    }
    if (checkedCookie) {
      getSection();
      getThreads();
    }
  }, [section_id, navigate, checkedCookie]);

  if (embeddedSection !== null) {
    return embeddedSection;
  }

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
        <div className="flex flex-col items-center rounded-xl px-10 pt-6">
          <div
            className="mb-4 h-8 cursor-pointer text-2xl font-semibold hover:underline dark:text-white"
            onClick={() => navigate(-1)}
          >
            {loaded && sectionName}
          </div>

          <CreateThread
            section_id={parseInt(section_id || "")}
            loaded={loaded}
          />
          {loaded ? (
            threads.length > 0 ? (
              threads.map((thread, index) => {
                return (
                  <ThreadPreview
                    key={index} // For TS map purposes
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
              <div className="mt-6 dark:text-white">
                There are no threads in this section yet.
              </div>
            )
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
