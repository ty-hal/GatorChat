import { useState, useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { useLocation, useNavigate } from "react-router-dom";
import { userIDAtom } from "../../App";
import ProfilePicture from "../ProfilePicture";
import { RichTextEditor } from "../RichTextEditor";
import DeletePopup from "../Popups/DeletePopup";
import ReportPopup from "../Popups/ReportPopup";
import SignInPopup from "../Popups/SignInPopup";
import UserProfilePopup from "../Popups/UserProfilePopup";

type Props = {
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
  user_saved: boolean;
};

interface threadBody {
  thread_title?: string | undefined;
  content?: string | undefined;
}

const Thread: React.FC<Props> = ({
  thread_id,
  section_id,
  section_name,
  user_id,
  username,
  threadTitle,
  threadContent,
  threadDate,
  updatedOn,
  likesCount,
  messagesCount,
  userLiked,
  userAdmin,
  user_saved,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showReportPopup, setShowReportPopup] = useState<boolean>(false);
  const [showSignInPopup, setShowSignInPopup] = useState<boolean>(false);
  const [popupReason, setPopupReason] = useState<string>("");
  const [showUserProfilePopup, setShowUserProfilePopup] =
    useState<boolean>(false);
  const [showCopiedLink, setShowCopiedLink] = useState<boolean>(false);
  const [savedThread, setSavedThread] = useState<boolean>(false);

  const [edit, toggleEdit] = useState<boolean>(false);
  const activeUserID = useAtomValue(userIDAtom);
  const [thread_name, set_thread_name] = useState<string>("");
  const [sectionName, setSectionName] = useState<string>("");
  const [liked, setLiked] = useState<boolean>(userLiked);
  const [numLikes, toggleLike] = useState<number>(likesCount);
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [postTimeDifference, setPostTimeDifference] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tempTitle, setTempTitle] = useState<string>("");

  const [content, setContent] = useState<string>("");
  const [tempContent, setTempContent] = useState<string>("");

  let navigate = useNavigate();
  const location = useLocation();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [listening, setListening] = useState(false);
  let parent_section = false;

  // Creates event listener to toggle dropdown menu
  useEffect(() => {
    listenForOutsideClick(
      listening,
      setListening,
      dropdownRef,
      setShowDropdown
    );
  }, []);

  // Toggles user dropdown menu if user clicks outside of the menu
  const listenForOutsideClick = (
    listening: boolean,
    setListening: React.Dispatch<React.SetStateAction<boolean>>,
    menuRef: React.RefObject<HTMLDivElement>,
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (listening) return;
    if (!menuRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        const cur = menuRef.current;
        const node = evt.target;
        if (cur && node && cur.contains(node as Node)) return;
        setShowDropdown(false);
      });
    });
  };

  // Load data
  useEffect(() => {
    setTitle(threadTitle);
    setContent(threadContent);
    setSavedThread(user_saved);
    let temp = threadTitle.replace(/[\W_]+/g, " ");
    set_thread_name(temp.replace(/\s+/g, "-").toLowerCase().substring(0, 50));
    // Updates postTimeDifference with how long ago the thread was created
    let postTime = new Date(threadDate);
    let currentTime = new Date();
    const _MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;
    const _MS_PER_MONTH = 1000 * 60 * 60 * 24 * 30;
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const _MS_PER_HOUR = 1000 * 60 * 60;
    const _MS_PER_MINUTE = 1000 * 60;

    // Convert to UTC date format
    const utcPost = Date.UTC(
      postTime.getFullYear(),
      postTime.getMonth(),
      postTime.getDate(),
      postTime.getHours(),
      postTime.getMinutes(),
      postTime.getSeconds()
    );
    const utcCurrent = Date.UTC(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      currentTime.getHours(),
      currentTime.getMinutes(),
      currentTime.getSeconds()
    );
    let timeDifference = Math.floor(utcCurrent - utcPost);
    if (timeDifference / _MS_PER_MINUTE < 1) {
      setPostTimeDifference("now");
    } else if (timeDifference / _MS_PER_HOUR < 1) {
      let minutesAgo = Math.floor(timeDifference / _MS_PER_MINUTE).toString();
      setPostTimeDifference(
        minutesAgo === "1" ? "1 minute ago" : minutesAgo + " minutes ago"
      );
    } else if (timeDifference / _MS_PER_DAY < 1) {
      let hoursAgo = Math.floor(timeDifference / _MS_PER_HOUR).toString();
      setPostTimeDifference(
        hoursAgo === "1" ? "1 hour ago" : hoursAgo + " hours ago"
      );
    } else if (timeDifference / _MS_PER_MONTH < 1) {
      let daysAgo = Math.floor(timeDifference / _MS_PER_DAY).toString();
      setPostTimeDifference(
        daysAgo === "1" ? "1 day ago" : daysAgo + " days ago"
      );
    } else if (timeDifference / _MS_PER_YEAR < 1) {
      let monthsAgo = Math.floor(timeDifference / _MS_PER_MONTH).toString();
      setPostTimeDifference(
        monthsAgo === "1" ? "1 month ago" : monthsAgo + " months ago"
      );
    } else {
      let yearsAgo = Math.floor(timeDifference / _MS_PER_YEAR).toString();
      setPostTimeDifference(
        yearsAgo === "1" ? "1 year ago" : yearsAgo + " years ago"
      );
    }

    // GET and SET the user who posted the thread's profile picture
    if (user_id !== null && user_id > 0) {
      fetch(`http://localhost:9000/api/user/${user_id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.profile_pic) {
            setProfilePicture(data.profile_pic);
          } else {
            setProfilePicture("");
          }
        });
    }

    getSectionName();
  }, []);

  const getSectionName = () => {
    fetch(`http://localhost:9000/api/section/${section_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let temp = data.section_name.replace(/[\W_]+/g, " ");
        setSectionName(temp.replace(/\s+/g, "-").toLowerCase());
      });
  };

  // Edit thread
  const editThread = () => {
    toggleEdit(false);

    const threadRequest: threadBody = {
      thread_title: title,
      content: content,
    };

    fetch(`http://localhost:9000/api/thread/${thread_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(threadRequest),
    }).then((response) => {
      if (response.status === 200) {
        window.location.reload();
        return response.json();
      }
    });
  };
  const likeThread = () => {
    fetch(
      `http://localhost:9000/api/like?activeUser=${activeUserID}&threadID=${thread_id}&postID=${0}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((response) => response.json());
  };
  const unlikeThread = () => {
    fetch(
      `http://localhost:9000/api/unlike?activeUser=${activeUserID}&threadID=${thread_id}&postID=${0}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((response) => response.json());
  };
  const toggleSaveThread = () => {
    fetch(
      `http://localhost:9000/api/togglesavedthread?threadID=${thread_id}&activeUser=${activeUserID}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Reload page when saving in account page
        if (
          window.location.pathname === "/my-account/saved-threads" ||
          window.location.pathname === "/my-account/saved-messages"
        ) {
          window.location.reload();
        }
      });
  };
  // Hide copied link popup after 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCopiedLink(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [showCopiedLink]);

  return (
    <div
      className="relative my-2 mx-auto w-11/12 cursor-pointer rounded-2xl border-2 border-gray-500 bg-gray-200 py-8 text-center text-lg font-normal text-gray-900 shadow-md hover:border-blue-600 dark:bg-gray-800 dark:text-white lg:w-4/5"
      id="container"
      onClick={(e) => {
        setShowDropdown(false);
        // Navigate to the thread
        let path = location.pathname;
        if (path.includes("my-account")) {
          path = `/s/${section_id}/${sectionName}`;
        }
        navigate(`${path}/t/${thread_id}/${thread_name}`, {
          state: { parent_section },
        });
      }}
    >
      {/* Profile Picture, Username, Date, and Dropdown */}
      <div className="absolute top-3 flex w-full items-center">
        {/* Profile Picture */}
        <div
          className="ml-3 h-8 w-8 overflow-hidden rounded-full bg-white dark:bg-gray-600 sm:h-10 sm:w-10"
          id="profile-picture"
          onClick={(e) => {
            e.stopPropagation();
            setShowUserProfilePopup(true);
          }}
        >
          <ProfilePicture
            image={profilePicture}
            className="h-10 w-10 text-gray-400 sm:h-12 sm:w-12"
            transform="translate(-2, 0)"
          />
        </div>
        {/* Username and Time  */}
        <div className="ml-4 break-words text-left text-base sm:text-lg">
          <span
            className="font-bold hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              setShowUserProfilePopup(true);
            }}
          >
            {username}
          </span>
          <span
            className="text-md text-black dark:text-gray-300"
            id="post-time"
          >
            {" posted "}
            {postTimeDifference}
            <span className="ml-2 break-words text-sm">
              {updatedOn !== threadDate ? "(edited)" : null}
            </span>
          </span>
        </div>
      </div>

      {/* Edit thread  */}
      {edit && (
        <div
          id="thread-edit"
          className="relative top-7 mx-8 mb-2 sm:my-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto w-11/12">
            <input
              type="text"
              id="title-edit"
              className="w-full break-normal rounded-lg border border-gray-600 bg-gray-50 p-2 text-gray-900 focus:border-gray-600 focus:outline-none focus:outline-0 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-200"
              value={title}
              maxLength={300}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <div
              className="mx-auto mt-2 w-full text-right text-base text-black dark:text-gray-400"
              id="title-length"
            >
              {title.length}/300 characters
            </div>
          </div>
          <div className="mx-auto w-11/12 text-left" id="text">
            <RichTextEditor setText={setContent} textContent={content} />
          </div>
          <div className="mx-auto mb-12 flex w-11/12 space-x-4">
            {title.length > 2 && content.length > 7 && (
              <button
                className="rounded-lg border border-black bg-blue-600 py-0 px-2 text-base text-white hover:bg-blue-700 dark:border-gray-200 dark:hover:bg-blue-800 md:py-1"
                onClick={(e) => {
                  e.stopPropagation();
                  editThread();
                }}
                id="edit-thread"
              >
                Edit thread
              </button>
            )}
            <button
              className="rounded-lg border border-black bg-red-600 px-2 py-0 text-base text-white hover:bg-red-800 dark:border-gray-200 dark:hover:bg-red-800 md:py-1"
              onClick={(e) => {
                e.stopPropagation();
                toggleEdit(false);
                setContent(tempContent);
                setTitle(tempTitle);
              }}
              id="cancel-edit"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Thread Content */}
      {!edit && (
        <>
          {/* Thread Title  */}
          <div
            id="thread-title"
            className="relative top-7 mx-8 mb-1 break-words text-left text-xl font-bold sm:my-2 sm:text-2xl"
          >
            {title}
          </div>
          {/* Thread Content  */}
          <div
            id="thread-preview-content"
            className="text-md relative top-7 mx-8 mb-12 overflow-hidden break-words text-left text-black dark:text-gray-300"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></div>
        </>
      )}

      {/* Bottom Bar */}
      <div className="absolute left-3 bottom-3 flex space-x-2 text-base sm:space-x-3 md:space-x-6 md:text-lg">
        {/* Likes */}
        <div
          className="flex items-center rounded-md px-1 hover:bg-gray-300 dark:hover:bg-slate-700"
          id="like-button"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(false);
            setPopupReason("like message");
            if (!activeUserID || activeUserID <= 0) {
              setShowSignInPopup(true);
              return;
            }
            setLiked(!liked);
            {
              liked === true
                ? toggleLike(numLikes - 1)
                : toggleLike(numLikes + 1);
            }
            if (liked) {
              unlikeThread();
            } else {
              likeThread();
            }
          }}
        >
          <svg
            id="like-image"
            className="h-6 w-6 cursor-pointer stroke-red-600 sm:h-8 sm:w-8"
            fill={liked ? "#dc2626" : "none"}
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            ></path>
          </svg>
          <div className="ml-1" id="num-likes">
            {numLikes}
            <span className="hidden sm:inline"> likes</span>
          </div>
        </div>
        {/* Messages Count */}
        <div
          className="flex items-center rounded-md px-1 hover:bg-gray-300 dark:hover:bg-slate-700"
          id="messages-count"
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-7 sm:w-7"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.84572 18.6204C6.74782 18.0072 6.4668 17.4522 6.05816 17.0088C4.18319 15.5427 3 13.3942 3 11C3 6.58173 7.02944 3 12 3C16.9706 3 21 6.58173 21 11C21 15.4183 16.9706 19 12 19C11.1546 19 10.3365 18.8964 9.56074 18.7027C9.45389 18.676 9.34187 18.72 9.28125 18.8119C9.15858 18.998 9.02331 19.1851 8.87719 19.3674C8.64734 19.6542 8.39065 19.9289 8.11392 20.1685C7.59543 20.6174 7.00662 20.943 6.39232 20.9932C6.37166 20.9949 6.35097 20.9963 6.33025 20.9974C6.28866 20.9995 6.26498 20.9519 6.28953 20.9182C6.30109 20.9024 6.3125 20.8865 6.32376 20.8704C6.67743 20.3664 6.88397 19.7586 6.88397 19.1044C6.88397 19.0915 6.88389 19.0786 6.88373 19.0658C6.88185 18.9146 6.86893 18.7659 6.84572 18.6204ZM4.66223 18.4535C2.45613 16.6579 1 14.0103 1 11C1 5.26221 6.15283 1 12 1C17.8472 1 23 5.26221 23 11C23 16.7378 17.8472 21 12 21C11.3978 21 10.8057 20.9559 10.2276 20.8709C9.93606 21.2084 9.60764 21.5363 9.24519 21.8294C8.55521 22.3873 7.59485 22.9353 6.43241 22.9948L6.43238 22.9948C4.55136 23.0909 3.75168 21.003 4.67402 19.7392C4.81033 19.5524 4.88397 19.3363 4.88397 19.1044C4.88397 18.8684 4.80711 18.6449 4.66223 18.4535Z"
                fill=""
                className="fill-black dark:fill-white"
              ></path>{" "}
            </g>
          </svg>
          <div className="ml-2">
            {messagesCount}
            <span className="hidden sm:inline"> messages</span>
          </div>
        </div>
        {/* Share  */}
        <div
          className="flex items-center rounded-md px-1 hover:bg-gray-300 dark:hover:bg-slate-700"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(false);
            navigator.clipboard.writeText(
              window.location.href + `/${thread_name}/${thread_id}`
            );
            setShowCopiedLink(true);
          }}
          title="Copy link"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
            className="h-5 w-5 sm:h-7 sm:w-7"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g clipPath="url(#clip0_429_11120)">
                {" "}
                <path
                  d="M15 5L12 2M12 2L9 5M12 2L12 14"
                  stroke="#292929"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-black dark:stroke-white"
                ></path>{" "}
                <path
                  d="M6 9H4V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V9H18"
                  stroke="#292929"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-black dark:stroke-white"
                ></path>{" "}
              </g>{" "}
              <defs>
                {" "}
                <clipPath id="clip0_429_11120">
                  {" "}
                  <rect width="24" height="24" fill="white"></rect>{" "}
                </clipPath>{" "}
              </defs>{" "}
            </g>
          </svg>
          <div className="ml-2 text-sm sm:text-lg">Share</div>
        </div>
        {showCopiedLink && (
          <div className="absolute right-0 top-8 z-10 flex w-3/5 items-center rounded-lg border-2 border-blue-600 bg-gray-50 p-2 text-center font-normal text-gray-900 shadow-xl transition-all sm:w-2/5">
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              className="mr-2 h-6 w-6 sm:mr-0"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill="#000000"
                  d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"
                ></path>
                <path
                  fill="#000000"
                  d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"
                ></path>
              </g>
            </svg>
            <div className="mx-auto text-sm sm:text-base">Copied link!</div>
          </div>
        )}
        {/* Thread Menu  */}
        <div ref={dropdownRef}>
          <svg
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
            fill="white"
            className="h-7 w-7 cursor-pointer rounded-md fill-gray-700 px-1 hover:bg-gray-300 dark:fill-white dark:hover:bg-slate-700 sm:h-8 sm:w-8"
            version="1.1"
            id="thread-menu"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32.055 32.055"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967 C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967 s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967 c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"></path>{" "}
              </g>{" "}
            </g>
          </svg>
          {/* Dropdown */}
          {showDropdown && (
            <div
              className={
                "absolute z-10 w-28 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-blue-200 focus:outline-none"
              }
              role="menu"
              id="Dropdown-content"
            >
              <div className="cursor-pointer" role="none">
                {/* Save */}
                <div
                  className="flex items-center py-2 text-sm text-gray-700 hover:rounded-t-md hover:bg-blue-200 hover:text-black "
                  role="menuitem"
                  id="save"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(false);
                    if (!activeUserID || activeUserID <= 0) {
                      setPopupReason("save thread");
                      setShowSignInPopup(true);
                      return;
                    }
                    setSavedThread(!savedThread);
                    toggleSaveThread();
                  }}
                >
                  <div className="flex-1">
                    {savedThread ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        className="ml-2 h-5 w-5"
                      >
                        <path
                          d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2Z"
                          fill="#000"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="ml-2 h-5 w-5"
                      >
                        <path
                          d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"
                          fill="#000"
                        ></path>
                      </svg>
                    )}
                  </div>
                  <div className="">{savedThread ? "Unsave" : "Save"}</div>
                  <div className="flex-1"></div>
                </div>
                {/* Report */}
                <div
                  className="flex items-center py-2 text-sm text-gray-700 hover:bg-blue-200 hover:text-black "
                  role="menuitem"
                  id="report"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowReportPopup(true);
                  }}
                >
                  <div className="flex-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-6 w-6 "
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M6 14.4623H16.1909C17.6066 14.4623 18.472 12.7739 17.7261 11.4671L17.2365 10.6092C16.7547 9.76504 16.7547 8.69728 17.2365 7.85309L17.7261 6.99524C18.472 5.68842 17.6066 4 16.1909 4L6 4L6 14.4623ZM6 14.4623L6 20"
                          stroke="#000000"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          transform="translate(-1.6, 0)"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div className="">Report</div>
                  <div className="flex-1"></div>
                </div>
              </div>

              {/* IF USER HAS ACCESS TO MODIFY THIS THREAD */}
              {user_id === activeUserID || userAdmin ? (
                <div className="cursor-pointer" role="none">
                  {/* Edit */}
                  <div
                    className="flex items-center py-2 text-sm text-gray-700 hover:bg-blue-200 hover:text-black "
                    role="menuitem"
                    id="edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEdit(!edit);
                      setTempContent(content);
                      setTempTitle(title);
                    }}
                  >
                    <div className="flex-1">
                      <svg
                        fill="#000000"
                        viewBox="0 0 1920 1920"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 h-5 w-5 "
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M277.974 49.076c65.267-65.379 171.733-65.49 237.448 0l232.186 232.187 1055.697 1055.809L1919.958 1920l-582.928-116.653-950.128-950.015 79.15-79.15 801.792 801.68 307.977-307.976-907.362-907.474L281.22 747.65 49.034 515.464c-65.379-65.603-65.379-172.069 0-237.448Zm1376.996 1297.96-307.977 307.976 45.117 45.116 384.999 77.023-77.023-385-45.116-45.116ZM675.355 596.258l692.304 692.304-79.149 79.15-692.304-692.305 79.149-79.15ZM396.642 111.88c-14.33 0-28.547 5.374-39.519 16.345l-228.94 228.94c-21.718 21.718-21.718 57.318 0 79.149l153.038 153.037 308.089-308.09-153.037-153.036c-10.972-10.971-25.301-16.345-39.63-16.345Z"
                            fillRule="evenodd"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                    <div className="">Edit</div>
                    <div className="flex-1"></div>
                  </div>
                  {/* Delete  */}
                  <div
                    className="flex items-center py-2 text-sm text-gray-700 hover:rounded-b-md hover:bg-blue-200 hover:text-black"
                    role="menuitem"
                    id="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeletePopup(true);
                    }}
                  >
                    <div className="flex-1">
                      <svg
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                        className="ml-2 h-5 w-5 "
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            fill="#000000"
                            d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="">Delete</div>
                    <div className="flex-1"></div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
          {/* Delete Popup  */}
          {showDeletePopup && (
            <DeletePopup
              id={thread_id}
              title={title}
              showDeletePopup={showDeletePopup}
              setShowDeletePopup={setShowDeletePopup}
            />
          )}
          {/* Report Popup  */}
          {showReportPopup && (
            <ReportPopup
              id={thread_id}
              title={title}
              showReportPopup={showReportPopup}
              setShowReportPopup={setShowReportPopup}
              activeUserID={activeUserID || 0}
            />
          )}
          {/* Sign In Popup  */}
          {showSignInPopup && (
            <SignInPopup
              popupReason={popupReason}
              showSignInPopup={showSignInPopup}
              setShowSignInPopup={setShowSignInPopup}
            />
          )}
          {/* User Profile Popup  */}
          {showUserProfilePopup && user_id !== undefined && user_id > 0 && (
            <UserProfilePopup
              userID={user_id}
              showUserProfilePopup={showUserProfilePopup}
              setShowUserProfilePopup={setShowUserProfilePopup}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Thread;
