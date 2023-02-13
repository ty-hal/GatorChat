import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Thread from "../../components/ThreadPreview";

type ThreadType = {
  thread_id: number;
  user_id: number;
  username: string;
  section_id: number;
  thread_title: string;
  content: string;
  CreationDate: string;
  UpdatedOn: string;
  likes: number;
  messageCount: number;
};

const SampleThreadsPreview = () => {
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const location = useLocation();
  const { section_id } = location.state;
  useEffect(() => {
    fetch(`http://localhost:9000/api/section/${section_id}/threads`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setThreads(data);
        console.log(data);
      });
  }, [section_id]);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center rounded-xl p-10">
        {threads.map((thread) => {
          return (
            <Thread
              key={thread.thread_id}
              id={thread.thread_id}
              username={thread.username}
              threadTitle={thread.thread_title}
              threadContent={thread.content}
              threadDate={thread.CreationDate}
              likesCount={thread.likes ? thread.likes : 0}
              messagesCount={thread.messageCount ? thread.messageCount : 0}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default SampleThreadsPreview;
