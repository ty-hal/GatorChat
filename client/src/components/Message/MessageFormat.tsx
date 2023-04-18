import { useEffect, useRef, useState } from "react";

import ProfilePicture from "../ProfilePicture";
import DeletePopup from "../Popups/DeletePopup";
import ReportPopup from "../Popups/ReportPopup";
import SignInPopup from "../Popups/SignInPopup";
import UserProfilePopup from "../Popups/UserProfilePopup";

import { RichTextEditor } from "../RichTextEditor";
import { useAtomValue, useAtom } from "jotai";
import { userIDAtom } from "../../App";
import { messageBoxAtom } from "../../pages/Messaging/Thread";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  post_id: number;
  user_id: number;
  username: string;
  messageContent: string;
  messageDate: string;
  updatedOn: string;
  likesCount: number;
  userLiked: boolean;
  userAdmin: boolean;
  user_saved: boolean;
  replyFunc?: () => void;
  classname?: string;
  thread_id?: string;
  thread_name?: string;
  section_name?: string;
};

interface messageBody {
  content: string | undefined;
}

const Message: React.FC<Props> = ({
  post_id,
  user_id,
  username,
  messageContent,
  messageDate,
  updatedOn,
  likesCount,
  userLiked,
  userAdmin,
  user_saved,
  replyFunc,
  classname,
  thread_id,
  thread_name,
  section_name,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [listening, setListening] = useState(false);
  const [savedMessage, setSavedMessage] = useState<boolean>(false);

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

  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showReportPopup, setShowReportPopup] = useState<boolean>(false);
  const [showSignInPopup, setShowSignInPopup] = useState<boolean>(false);
  const [showUserProfilePopup, setShowUserProfilePopup] =
    useState<boolean>(false);
  const [showCopiedContent, setShowCopiedContent] = useState<boolean>(false);

  const [edit, toggleEdit] = useState<boolean>(false);
  const [tempContent, setTempContent] = useState<string>("");
  const activeUserID = useAtomValue(userIDAtom);
  const [liked, setLiked] = useState<boolean>(userLiked);
  const [profilePicture, setProfilePicture] = useState<string>("");

  const [numLikes, toggleLike] = useState<number>(likesCount);
  const [postTimeDifference, setPostTimeDifference] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [_, setUserMessageBox] = useAtom(messageBoxAtom);
  const [popupReason, setPopupReason] = useState<string>("");

  let navigate = useNavigate();
  const location = useLocation();

  // Get data
  useEffect(() => {
    setSavedMessage(user_saved);
    // GET and SET the user who posted the thread's profile picture
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
        }
      });

    setContent(messageContent);
    listenForOutsideClick(
      listening,
      setListening,
      dropdownRef,
      setShowDropdown
    );

    // Updates postTimeDifference with how long ago the message was created
    let postTime = new Date(messageDate);
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
  }, []);

  // Update the message
  const editMessage = () => {
    console.log(content);
    toggleEdit(false);

    const messageRequest: messageBody = {
      content: content,
    };

    // Backend call to update a message
    fetch(`http://localhost:9000/api/post/${post_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(messageRequest),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("About to reload");
          window.location.reload();
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      });
  };

  // Reply to the message
  const replyToMessage = () => {
    if (replyFunc) {
      replyFunc();
      setUserMessageBox(
        `<p></p><blockquote><p><strong>${username}</strong> posted ${postTimeDifference}:</p><p>${content}</p></blockquote><p></p>`
      );
    }
  };

  // Toggle save message
  const toggleSaveMessage = () => {
    console.log("Post ID: " + post_id);
    fetch(
      `http://localhost:9000/api/togglesavedpost?postID=${post_id}&activeUser=${activeUserID}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status == 200) {
          console.log("Successfully saved");
        }
        return response.json();
      })
      .then((data) => {
        // Reload page when saving in account page
        console.log(window.location.pathname === "/my-account/saved-threads")
        if (
          window.location.pathname === "/my-account/saved-threads" ||
          window.location.pathname === "/my-account/saved-messages"
        ) {
          console.log("here")
          window.location.reload();
        }
      });
  };

  const likeMessage = () => {
    fetch(
      `http://localhost:9000/api/like?activeUser=${activeUserID}&threadID=${0}&postID=${post_id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((response) => response.json());
  };

  const unlikeMessage = () => {
    fetch(
      `http://localhost:9000/api/unlike?activeUser=${activeUserID}&threadID=${0}&postID=${post_id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((response) => response.json());
  };

  // Hide copied link popup after 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCopiedContent(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [showCopiedContent]);

  const htmlToText = (html: string) => {
    html = html.replace(/<\/div>/gi, "\n");
    html = html.replace(/<\/li>/gi, "\n");
    html = html.replace(/<li>/gi, "  *  ");
    html = html.replace(/<\/ul>/gi, "\n");
    html = html.replace(/<\/p>/gi, "\n");
    html = html.replace(/<br\s*[\/]?>/gi, "\n");
    html = html.replace(/<[^>]+>/gi, "");
    return html;
  };

  return (
    <div
      className={
        classname
          ? classname
          : "relative mx-auto w-11/12 border-x-2 border-y border-gray-500 bg-gray-200 py-8 text-center text-lg font-normal text-gray-900 dark:border-gray-300 dark:bg-gray-800 dark:text-white lg:w-4/5"
      }
      onClick={(e) => {
        setShowDropdown(false);
        console.log(`Message ${post_id}`);

        let path = location.pathname;
        if (path.includes("my-account")) {
          navigate(`/t/${thread_id}/${thread_name}`, {
            state: { param_section_name: section_name },
          });
        }
      }}
    >
      {/* Profile Picture, Username, Date, and Dropdown */}
      <div className="absolute top-3 flex w-full items-center">
        {/* Profile Picture */}
        <div
          className="ml-3 h-10 w-10 cursor-pointer overflow-hidden rounded-full bg-white dark:bg-gray-600"
          id="profile-picture"
          onClick={(e) => {
            e.stopPropagation();
            setShowUserProfilePopup(true);
          }}
        >
          <ProfilePicture image={profilePicture} />
        </div>

        {/* Username and Time  */}
        <div className="ml-4 flex flex-col text-left text-sm sm:flex-row sm:items-center sm:space-x-2">
          <div
            className="cursor-pointer text-base font-bold hover:underline sm:text-lg"
            onClick={(e) => {
              e.stopPropagation();
              setShowUserProfilePopup(true);
            }}
          >
            {username}
          </div>
          <div
            className="text-black dark:text-gray-300 sm:text-base"
            id="post-time"
          >
            {" posted "}
            {postTimeDifference}
            <span className="ml-2 text-sm">
              {updatedOn !== messageDate ? "(edited)" : null}
            </span>
          </div>
        </div>
      </div>

      {/* Edit message  */}
      {edit && (
        <div id="message-edit" className="relative top-7 mx-8 mb-2 sm:my-2">
          <div className="mx-auto text-left" id="text">
            <RichTextEditor
              setText={setContent}
              textContent={content}
              charLimit={2000}
            />
          </div>
          <div className="mx-auto mb-12 flex space-x-4">
            <button
              className="rounded-lg border border-black bg-blue-600 py-0 px-2 text-base text-white hover:bg-blue-700 dark:border-gray-200 dark:hover:bg-blue-800 md:py-1"
              onClick={editMessage}
              id="edit-message"
            >
              Edit message
            </button>
            <button
              className="rounded-lg border border-black bg-red-600 py-0 px-2 text-base text-white hover:bg-red-800 dark:border-gray-200 dark:hover:bg-red-800 md:px-1"
              onClick={() => {
                toggleEdit(false);
                setContent(tempContent);
              }}
              id="cancel-edit"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Message Content  */}
      {!edit && (
        <>
          <div
            id="message-content"
            className="relative top-7 mx-6 mb-12 overflow-hidden break-words text-left text-base sm:mx-8 md:text-lg"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></div>
        </>
      )}

      {/* Bottom Bar */}
      <div className="absolute left-3 bottom-3 flex space-x-2 text-sm sm:space-x-3 sm:text-base md:space-x-6 ">
        {/* Likes */}
        <div
          className="flex cursor-pointer items-center rounded-md px-1 hover:bg-gray-300 dark:hover:bg-slate-700"
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
              unlikeMessage();
            } else {
              likeMessage();
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
          <div className="ml-2" id="num-likes">
            {numLikes} <span className="hidden sm:inline"> likes</span>
          </div>
        </div>
        {/* Reply  */}
        <div
          className="flex cursor-pointer items-center rounded-md px-1 hover:bg-gray-300 dark:hover:bg-slate-700"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(false);
            setPopupReason("reply");
            if (!activeUserID || activeUserID <= 0) {
              setShowSignInPopup(true);
              return;
            }
            console.log(`Reply to message ${post_id}`);
            if (replyFunc) replyToMessage();
          }}
        >
          <svg
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9"
            className="h-6 w-6 stroke-black dark:stroke-white sm:h-8 sm:w-8"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path d="m14.25 13.25c-.5-6-5.5-7.5-8-7v-3.5l-4.5 5.25 4.5 5.25v-3.5c2.50001-0.5 6.5 0.5 8 3.5z"></path>{" "}
            </g>
          </svg>
          <div className="ml-2">Reply</div>
        </div>
        {/* Message Menu  */}
        <div id="dropdown-button" ref={dropdownRef}>
          <svg
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
            fill="white"
            className="h-8 w-8 cursor-pointer rounded-md fill-gray-700 px-1 hover:bg-gray-300 dark:fill-white dark:hover:bg-slate-700"
            version="1.1"
            id="message-menu"
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
              id="dropdown-content"
            >
              <div className="cursor-pointer" role="none">
                {/* Copy */}
                <div
                  className="flex items-center py-2 text-sm text-gray-700 hover:rounded-t-md hover:bg-blue-200 hover:text-black"
                  role="menuitem"
                  id="copy"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(false);
                    navigator.clipboard.writeText(htmlToText(messageContent));
                    setShowCopiedContent(true);
                  }}
                >
                  <div className="flex-1">
                    <svg
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000000"
                      className="ml-2 h-6 w-6 "
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
                  </div>
                  <div className="">Copy</div>
                  <div className="flex-1"></div>
                </div>
                {/* Save */}
                <div
                  className="flex items-center py-2 text-sm text-gray-700 hover:rounded-t-md hover:bg-blue-200 hover:text-black "
                  role="menuitem"
                  id="save"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(false);
                    if (!activeUserID || activeUserID <= 0) {
                      setPopupReason("save message");
                      setShowSignInPopup(true);
                      return;
                    }
                    setSavedMessage(!savedMessage);
                    toggleSaveMessage();
                  }}
                >
                  <div className="flex-1">
                    {savedMessage ? (
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
                  <div className="">{savedMessage ? "Unsave" : "Save"}</div>
                  <div className="flex-1"></div>
                </div>
                {/* Report */}
                <div
                  className="flex items-center py-2 text-sm text-gray-700 hover:bg-blue-200 hover:text-black "
                  role="menuitem"
                  id="report"
                  onClick={() => setShowReportPopup(true)}
                >
                  <div className="flex-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-7 w-7"
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

              {/* IF USER HAS ACCESS TO MODIFY THIS MESSAGE */}
              {user_id === activeUserID || userAdmin ? (
                <div className="cursor-pointer" role="none">
                  {/* Edit */}
                  <div
                    className="flex items-center py-2 text-sm text-gray-700 hover:bg-blue-200 hover:text-black "
                    role="menuitem"
                    id="edit"
                    onClick={() => {
                      toggleEdit(!edit);
                      setTempContent(content);
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
                  {/* Delete */}
                  <div
                    className="flex items-center py-2 text-sm text-gray-700 hover:rounded-b-md hover:bg-blue-200 hover:text-black"
                    role="menuitem"
                    id="delete"
                    onClick={() => setShowDeletePopup(true)}
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
        </div>
        {showCopiedContent && (
          <div className="absolute -right-8 top-8 z-10 flex w-4/5 items-center rounded-lg border-2 border-blue-600 bg-gray-50 p-2 text-center font-normal text-gray-900 shadow-xl transition-all">
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              className="h-6 w-6"
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
            <div className="mx-auto">Copied message!</div>
          </div>
        )}
      </div>

      {/* Delete Popup  */}
      {showDeletePopup && (
        <DeletePopup
          id={post_id}
          showDeletePopup={showDeletePopup}
          setShowDeletePopup={setShowDeletePopup}
        />
      )}
      {/* Report Popup  */}
      {showReportPopup && (
        <ReportPopup
          id={post_id}
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
  );
};

export default Message;
