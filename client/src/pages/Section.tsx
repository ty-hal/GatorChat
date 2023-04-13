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
  user_saved: boolean;
};

interface Props {
  activeUserID: number;
  checkedCookie: boolean;
  section_name: string;
  section_id: string;
  embedded: boolean;
}

const Section: React.FC<Props> = ({
  activeUserID,
  checkedCookie,
  section_name,
  section_id,
  embedded,
}) => {
  const navigate = useNavigate();
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [sectionName, setSectionName] = useState<string>("");
  const [sectionDescription, setSectionDescription] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [more, setMore] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [savedSection, setSavedSection] = useState<boolean>(false);
  const [userAdmin, setUserAdmin] = useState<boolean>(false);

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
    if (parseInt(section_id) > 0) {
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
          setSavedSection(data.user_saved);
          setSectionName(data.section_name);
          setSectionDescription(data.description);
        });
    }
  };
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
  const toggleSaveSection = () => {
    fetch(
      `http://localhost:9000/api/togglesavedsection?sectionID=${section_id}&activeUser=${activeUserID}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((response) => response.json());
  };
  function hyphenToTitleCase(input: string): string {
    const excludedWords = ["and", "of", "a"];

    // Check if class section
    const regex = /^[A-Za-z]{3}\d{4}$/;
    const match = input.match(regex);
    if (match) {
      return input.substr(0, 3).toUpperCase() + " " + input.substr(3);
    }
    const words = input.split("-");
    const titleCaseWords = words.map((word, index) => {
      if (index === 0 || !excludedWords.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    });

    return titleCaseWords.join(" ");
  }
  useEffect(() => {
    if (checkedCookie) {
      getSection();
      getThreads();
      if (activeUserID !== null && activeUserID !== 0) {
        getUserPermission();
      }
    }
  }, [section_id, navigate, checkedCookie]);

  if (embedded) {
    return (
      <EmbeddedSection
        activeUserID={activeUserID}
        checkedCookie={checkedCookie}
        section_name={section_name}
        section_id={section_id}
        description={sectionDescription}
      />
    );
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
          {/* Section Name */}
          {sectionName ? (
            <div className="relative">
              <div
                className="cursor-pointer text-2xl font-semibold hover:underline dark:text-white"
                onClick={() => navigate(-1)}
              >
                {sectionName}
              </div>
              <div
                className="absolute top-0 -right-6 sm:-right-12"
                title={
                  savedSection
                    ? "Unbookmark this section"
                    : "Bookmark this section"
                }
                id="bookmark-section"
                onClick={() => {
                  if (!activeUserID || activeUserID <= 0) {
                    return;
                  }
                  setSavedSection(!savedSection);
                  toggleSaveSection();
                }}
              >
                {savedSection ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-8 w-8 cursor-pointer rounded-md p-1 hover:bg-gray-200 dark:stroke-blue-600 dark:hover:bg-gray-700"
                  >
                    <path
                      d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2Z"
                      fill="rgb(28 100 242 / var(--tw-bg-opacity))"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-8 w-8 cursor-pointer rounded-md stroke-blue-600 p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <path
                      d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"
                      fill="rgb(28 100 242 / var(--tw-bg-opacity))"
                    ></path>
                  </svg>
                )}
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="h-8 animate-pulse text-2xl font-semibold filter dark:text-white">
                {hyphenToTitleCase(section_name)}
              </div>
              <div
                className="absolute top-0 -right-6 animate-pulse sm:-right-12"
                title="Bookmark this section"
                id="loading-bookmark-section"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-8 w-8  rounded-md stroke-blue-600 p-1"
                >
                  <path
                    d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"
                    fill="rgb(28 100 242 / var(--tw-bg-opacity))"
                  ></path>
                </svg>
              </div>
            </div>
          )}

          {/* Section Description */}
          {sectionDescription ? (
            <div className="mb-2 text-lg font-normal dark:text-white">
              {sectionDescription}
            </div>
          ) : (
            <div className="mx-auto my-2 mb-3 h-4 w-1/2 animate-pulse rounded bg-gray-500 dark:bg-gray-300 md:w-1/3 lg:w-1/4"></div>
          )}

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
                    userAdmin={userAdmin}
                    user_saved={thread.user_saved}
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
