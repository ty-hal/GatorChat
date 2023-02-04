import { useState } from "react";
import ProfilePicture from "./ProfilePicture";
interface IMessage {
  username: string;
  profilePicture?: string;
  messageContent: string;
  messageDate: string;
  likesCount?: number;
}

const Message = (props: IMessage) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div className="my-2 mx-auto w-11/12 lg:w-4/5">
      <div className="relative rounded-2xl bg-gray-200 py-8 text-center text-lg font-normal text-gray-900 shadow-xl dark:bg-gray-900 dark:text-white">
        {/* Profile picture */}
        <div className="absolute top-3 left-3 h-10 w-10 overflow-hidden rounded-full bg-white dark:bg-gray-600">
          <ProfilePicture />
        </div>
        {/* Username and Time  */}
        <div className="absolute top-4 left-16">
          <span className=" font-bold">{props.username}</span> posted at{" "}
          {props.messageDate}
        </div>
        {/* Message Menu  */}
        <div className="absolute top-4 right-6">
          <svg
            onClick={toggleDropDown}
            fill="white"
            className="h-8 w-8 fill-gray-800 dark:fill-white"
            version="1.1"
            id="message-menu"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32.055 32.055"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
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
                "absolute -right-4 z-10 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              }
              role="menu"
              id="dropdown-content"
            >
              <div className="py-1" role="none">
                <span
                  className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold"
                  role="menuitem"
                  id="menu-item-0"
                >
                  Reply
                </span>
                <span
                  className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold"
                  role="menuitem"
                  id="menu-item-1"
                >
                  Copy
                </span>
                <span
                  className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold"
                  role="menuitem"
                  id="menu-item-2"
                >
                  Report
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Message Content  */}
        <div className="relative top-7 mb-12 px-8 text-left">
          {props.messageContent}
        </div>
        {/* Likes  */}
        <div className="absolute left-3 bottom-3">
          <div className="flex">
            <svg
              onClick={() => {
                let svg = document.getElementById("like-image");
                svg?.classList.toggle("fill-red-600");
              }}
              id="like-image"
              className="h-8 w-8 stroke-red-600"
              fill="none"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              ></path>
            </svg>
            <div className="ml-2 flex">{props.likesCount} likes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
