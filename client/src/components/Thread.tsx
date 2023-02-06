import { useState } from "react";
import ProfilePicture from "./ProfilePicture";
interface IThread {
  id: number;
  username: string;
  profilePicture?: string;
  threadTitle: string;
  threadContent: string;
  threadDate: string;
  likesCount: number;
  messagesCount: number;
}

const Thread = (props: IThread) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [numLikes, toggleLike] = useState<number>(props.likesCount);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div className="my-2 mx-auto w-11/12  lg:w-4/5">
      <div className="relative cursor-pointer rounded-2xl border-2 border-transparent bg-gray-200 py-8 text-center text-lg font-normal text-gray-900 shadow-xl hover:border-blue-600 dark:bg-gray-800 dark:text-white">
        {/* Profile Picture, Username, Date, and Dropdown */}
        <div className="absolute top-3 flex w-full items-center">
          {/* Profile Picture */}
          <div className="ml-3 h-10 w-10 overflow-hidden rounded-full bg-white dark:bg-gray-600">
            <ProfilePicture />
          </div>
          {/* Username and Time  */}
          <div className="ml-4">
            <span className="font-bold">{props.username}</span>
            <span className="text-black dark:text-gray-300">
              <span className="hidden sm:inline"> posted at</span>{" "}
              {props.threadDate}
            </span>
          </div>
          {/* Thread Menu  */}
          <div className="ml-auto mr-6">
            <svg
              onClick={toggleDropDown}
              fill="white"
              className="h-8 w-8 cursor-pointer fill-gray-700 hover:fill-gray-400 dark:fill-white"
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
            {showDropDown && (
              <div
                className={
                  "absolute z-10 -ml-14 w-28 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                }
                role="menu"
                id="dropdown-content"
              >
                <div className="cursor-pointer py-1" role="none">
                  <span
                    className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold"
                    role="menuitem"
                    id="menu-item-0"
                  >
                    Share
                  </span>
                  <span
                    className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold "
                    role="menuitem"
                    id="menu-item-1"
                  >
                    Save
                  </span>
                  <span
                    className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold"
                    role="menuitem"
                    id="menu-item-2"
                  >
                    Report
                  </span>
                </div>

                {/* IF USER HAS ACCESS TO MODIFY THIS THREAD */}
                <div className="cursor-pointer py-1" role="none">
                  <span
                    className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold "
                    role="menuitem"
                    id="menu-item-3"
                  >
                    Edit
                  </span>
                  <span
                    className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold"
                    role="menuitem"
                    id="menu-item-4"
                  >
                    Delete
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Thread Title  */}
        <div
          id="thread-title"
          className="relative top-7 my-2 mx-8 text-left text-2xl font-bold"
        >
          {props.threadTitle}
        </div>
        {/* Thread Content  */}
        <div
          id="thread-content"
          className="relative top-7 mx-8 mb-12 text-left text-black dark:text-gray-300"
        >
          {props.threadContent}
        </div>
        {/* Likes and Messages */}
        <div className="absolute left-3 bottom-3 flex">
          <div className="flex items-center">
            <svg
              onClick={(e) => {
                e.currentTarget.classList.toggle("fill-red-600");
                if (e.currentTarget.classList.contains("fill-red-600")) {
                  toggleLike(numLikes + 1);
                } else {
                  toggleLike(numLikes - 1);
                }
              }}
              id="like-image"
              className="h-8 w-8 cursor-pointer stroke-red-600 hover:stroke-red-800"
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
          {/* Messages Count */}
          <div className="ml-8 flex items-center" id="messages-count">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.84572 18.6204C6.74782 18.0072 6.4668 17.4522 6.05816 17.0088C4.18319 15.5427 3 13.3942 3 11C3 6.58173 7.02944 3 12 3C16.9706 3 21 6.58173 21 11C21 15.4183 16.9706 19 12 19C11.1546 19 10.3365 18.8964 9.56074 18.7027C9.45389 18.676 9.34187 18.72 9.28125 18.8119C9.15858 18.998 9.02331 19.1851 8.87719 19.3674C8.64734 19.6542 8.39065 19.9289 8.11392 20.1685C7.59543 20.6174 7.00662 20.943 6.39232 20.9932C6.37166 20.9949 6.35097 20.9963 6.33025 20.9974C6.28866 20.9995 6.26498 20.9519 6.28953 20.9182C6.30109 20.9024 6.3125 20.8865 6.32376 20.8704C6.67743 20.3664 6.88397 19.7586 6.88397 19.1044C6.88397 19.0915 6.88389 19.0786 6.88373 19.0658C6.88185 18.9146 6.86893 18.7659 6.84572 18.6204ZM4.66223 18.4535C2.45613 16.6579 1 14.0103 1 11C1 5.26221 6.15283 1 12 1C17.8472 1 23 5.26221 23 11C23 16.7378 17.8472 21 12 21C11.3978 21 10.8057 20.9559 10.2276 20.8709C9.93606 21.2084 9.60764 21.5363 9.24519 21.8294C8.55521 22.3873 7.59485 22.9353 6.43241 22.9948L6.43238 22.9948C4.55136 23.0909 3.75168 21.003 4.67402 19.7392C4.81033 19.5524 4.88397 19.3363 4.88397 19.1044C4.88397 18.8684 4.80711 18.6449 4.66223 18.4535Z"
                  fill=""
                  className="fill-black dark:fill-white"
                ></path>{" "}
              </g>
            </svg>
            <div className="ml-2">{props.messagesCount} messages</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thread;
