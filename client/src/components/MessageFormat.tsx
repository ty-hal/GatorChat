import { useEffect, useState } from "react";
import ProfilePicture from "./ProfilePicture";
type Props = {
  id: number;
  username: string;
  profilePicture?: string;
  messageContent: string;
  messageDate: string;
  likesCount: number;
};

const Message: React.FC<Props> = ({
  id,
  username,
  profilePicture,
  messageContent,
  messageDate,
  likesCount,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [numLikes, toggleLike] = useState<number>(likesCount);
  const [postTimeDifference, setPostTimeDifference] = useState<string>("");

  // Updates postTimeDifference with how long ago the thread was created
  useEffect(() => {
    let postTime = new Date(messageDate);
    let currentTime = new Date();
    const _MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;
    const _MS_PER_MONTH = 1000 * 60 * 60 * 24 * 30;
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const _MS_PER_HOUR = 1000 * 60 * 60;
    const _MS_PER_MINUTE = 1000 * 60;

    // Conver to UTC date format
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

  return (
    <div
      className="relative mx-auto w-11/12 border-t-2 border-gray-500 bg-gray-200 py-8 text-center text-lg font-normal text-gray-900 shadow-xl dark:border-gray-300 dark:bg-gray-800 dark:text-white lg:w-4/5"
      onClick={(e) => {
        e.stopPropagation();
        setShowDropdown(false);
        console.log(`Message ${id}`);
      }}
    >
      {/* Profile Picture, Username, Date, and Dropdown */}
      <div className="absolute top-3 flex w-full items-center">
        {/* Profile Picture */}
        <div className="ml-3 h-10 w-10 overflow-hidden rounded-full bg-white dark:bg-gray-600">
          <ProfilePicture image={profilePicture} />
        </div>
        {/* Username and Time  */}
        <div className="ml-4 text-base sm:text-lg">
          <span className="font-bold">{username}</span>
          <span className="text-black dark:text-gray-300">
            {" posted "}
            {postTimeDifference}
          </span>
        </div>
        {/* Message Menu  */}
        <div className="ml-auto mr-6">
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
              id="Dropdown-content"
            >
              <div className="cursor-pointer" role="none">
                <div
                  className="flex items-center py-2 text-sm text-gray-700 hover:rounded-t-md hover:bg-blue-200 hover:text-black"
                  role="menuitem"
                  id="menu-item-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(false);
                    navigator.clipboard.writeText(messageContent);
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

                <div
                  className="flex items-center py-2 text-sm text-gray-700 hover:bg-blue-200 hover:text-black "
                  role="menuitem"
                  id="menu-item-3"
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
              <div className="cursor-pointer" role="none">
                <div
                  className="flex items-center py-2 text-sm text-gray-700 hover:bg-blue-200 hover:text-black "
                  role="menuitem"
                  id="menu-item-3"
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
                          fill-rule="evenodd"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div className="">Edit</div>
                  <div className="flex-1"></div>
                </div>

                <div
                  className="flex items-center py-2 text-sm text-gray-700 hover:rounded-b-md hover:bg-blue-200 hover:text-black"
                  role="menuitem"
                  id="menu-item-3"
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
            </div>
          )}
        </div>
      </div>

      {/* Message Content  */}
      <div id="message-content" className="relative top-7 mx-8 mb-12 text-left">
        {messageContent}
      </div>

      {/* Bottom Bar */}
      <div className="absolute left-3 bottom-3 flex space-x-2 text-base sm:space-x-3 md:space-x-6 md:text-lg">
        {/* Likes */}
        <div
          className="flex cursor-pointer items-center rounded-md px-1 hover:bg-gray-300 dark:hover:bg-slate-700"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(false);
            e.currentTarget.children[0].classList.toggle("fill-red-600");
            if (
              e.currentTarget.children[0].classList.contains("fill-red-600")
            ) {
              toggleLike(numLikes + 1);
            } else {
              toggleLike(numLikes - 1);
            }
          }}
        >
          <svg
            id="like-image"
            className="h-8 w-8 cursor-pointer stroke-red-600"
            fill="none"
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
          <div className="ml-2">{numLikes} likes</div>
        </div>
        {/* Reply  */}
        <div
          className="flex cursor-pointer items-center rounded-md px-1 hover:bg-gray-300 dark:hover:bg-slate-700"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(false);
            console.log(`Reply to message ${id}`);
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
            className="h-8 w-8 stroke-black dark:stroke-white"
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
      </div>
    </div>
  );
};

export default Message;
