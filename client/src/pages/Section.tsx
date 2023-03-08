import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import ThreadPreview from "../components/ThreadPreview";
import CreateThread from "../components/CreateThread";
import InfiniteScroll from "react-infinite-scroll-component";

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

const Section = () => {
  const { section_name, section_id } = useParams();
  const navigate = useNavigate();

  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const getThreads = () => {
    fetch(
      `http://localhost:9000/api/section/${section_id}/threads?pageNumber=${page}&pageSize=${4}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setThreads((threads) => [...threads, ...data]);
          setPage((page) => page + 1);
          console.log(data);
        } else {
          setMore(false);
        }
      })
      .then(() => setLoaded(true));
  };

  useEffect(() => {
    // If section_id (URL param) is not a number, go back to the previous page
    if (!/^\d+$/.test(section_id || "a")) {
      navigate(-1);
    }
    getThreads();
    console.log(section_id);
  }, [section_id, navigate]);

  return (
    <InfiniteScroll
      dataLength={threads.length}
      next={getThreads}
      hasMore={more}
      loader={null}
    >
      <div className="bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center rounded-xl p-10">
          {loaded && <CreateThread section_id={parseInt(section_id || "")} />}
          {threads.map((thread) => {
            return (
              <ThreadPreview
                key={thread.thread_id} // For Javascript map purposes
                thread_id={thread.thread_id}
                section_id={thread.section_id}
                section_name={section_name ? section_name : ""}
                user_id={thread.user_id}
                username={thread.username}
                threadTitle={thread.thread_title}
                threadContent={thread.content}
                threadDate={thread.creation_date}
                updatedOn={thread.updated_on}
                likesCount={thread.likes ? thread.likes : 0}
                messagesCount={thread.message_count ? thread.message_count : 0}
              />
            );
          })}
        </div>
        <Footer />
      </div>
    </InfiniteScroll>
  );
};

export default Section;
