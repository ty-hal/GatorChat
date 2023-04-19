import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { darkModeAtom, userIDAtom } from "../App";
import ProfilePicture from "../components/ProfilePicture";

const Header = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [listening, setListening] = useState(false);

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
    dropdownRef: React.RefObject<HTMLDivElement>,
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (listening) return;
    if (!dropdownRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        const cur = dropdownRef.current;
        const node = evt.target;
        if (cur && node && cur.contains(node as Node)) return;
        setShowDropdown(false);
      });
    });
  };

  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [userID, setUserID] = useAtom(userIDAtom);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    // GET and SET the user who posted the thread's profile picture
    if (userID !== null && userID > 0) {
      fetch(`http://localhost:9000/api/user/${userID}`, {
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
    } else if (userID !== null) setProfilePicture("");
  }, [userID]);

  const signOut = () => {
    fetch("http://localhost:9000/api/user/logout", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      // Successfully logged out
      if (response.status === 200) {
        setUserID(0);
        window.location.reload();
      } else {
        console.log("Uncaught error -- debug!");
        setUserID(0);
      }
    });
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  let darkModeText = (
    <div className="flex w-full items-center ">
      <span className="mr-2 w-2/3">Dark Mode</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    </div>
  );

  let lightModeText = (
    <div className="flex w-full items-center ">
      <span className="mr-2 w-2/3">Light Mode</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    </div>
  );

  return (
    <div className="sticky top-0 z-50 mx-auto flex w-full flex-wrap border-b-4 border-b-blue-600 bg-white dark:bg-gray-900">
      <div className="flex h-14 justify-between text-gray-700  dark:text-white">
        <div className="flex items-center px-5 py-6 xl:px-12">
          {/* Logo  */}
          <Link to="/">
            <span
              className="cursor-pointer rounded-lg p-1 text-3xl font-bold"
              id="logo"
            >
              GatorChat
            </span>
          </Link>
          {/* Nav */}
          {userID !== null && profilePicture !== null && (
            <div className="absolute right-0 flex items-center space-x-4 pr-4">
              {/* Navigation Bar */}
              <Link to="/">
                {" "}
                <span
                  className="invisible rounded-xl px-2 py-1.5 text-lg font-semibold  hover:bg-blue-500 hover:text-white sm:visible"
                  id="home"
                >
                  Home
                </span>
              </Link>
              {userID === 0 ? (
                <>
                  <Link to="/sign-in">
                    {" "}
                    <span
                      className="invisible rounded-xl  px-2 py-1.5 text-lg font-semibold  hover:bg-blue-500 hover:text-white sm:visible"
                      id="sign-in"
                    >
                      Sign in
                    </span>
                  </Link>
                  <Link to="/register">
                    {" "}
                    <span
                      className="invisible rounded-xl px-2 py-1.5 text-lg font-semibold  hover:bg-blue-500 hover:text-white  sm:visible"
                      id="register"
                    >
                      Register
                    </span>
                  </Link>
                </>
              ) : (
                <span
                  className="invisible cursor-pointer rounded-xl px-2 py-1 text-lg font-semibold  hover:bg-blue-500 hover:text-white sm:visible"
                  id="sign-out-header"
                  onClick={signOut}
                >
                  Sign Out
                </span>
              )}

              {/* Dropdown Menu */}
              <div className="flex items-center">
                <div
                  className="relative ml-4 inline-block text-left"
                  ref={dropdownRef}
                >
                  <div
                    className="mt-1 inline-flex w-full cursor-pointer justify-center rounded-md text-sm font-medium focus:outline-none focus:ring-blue-600 "
                    id="menu-button"
                    onClick={() => toggleDropdown()}
                  >
                    <div
                      className=" h-10 w-10 overflow-hidden rounded-full border-2 border-gray-400"
                      id="profile-picture"
                    >
                      <ProfilePicture
                        image={profilePicture || ""}
                        transform={"translate(-2.1, -0.5)"}
                      />
                    </div>
                  </div>
                  {showDropdown && (
                    <div
                      className="absolute right-0 z-10 -mt-1 w-36 origin-top-right cursor-pointer divide-y divide-gray-300 rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      id="dropdown-content"
                      onClick={() => toggleDropdown()}
                    >
                      {/* Settings and My Account*/}
                      {userID === 0 ? null : (
                        <div>
                          <Link to="/settings">
                            <div className="flex w-full items-center text-gray-700 hover:rounded-t-md hover:bg-blue-300 hover:text-black">
                              <span
                                className="mr-2 block w-2/3 py-2 pl-4 text-sm "
                                role="menuitem"
                                id="settings"
                              >
                                Settings
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="ml-2 h-5 w-5"
                                stroke="currentColor"
                                strokeWidth="0.2px"
                              >
                                <path
                                  d="M3.33946 17.0002C2.90721 16.2515 2.58277 15.4702 2.36133 14.6741C3.3338 14.1779 3.99972 13.1668 3.99972 12.0002C3.99972 10.8345 3.3348 9.824 2.36353 9.32741C2.81025 7.71651 3.65857 6.21627 4.86474 4.99001C5.7807 5.58416 6.98935 5.65534 7.99972 5.072C9.01009 4.48866 9.55277 3.40635 9.4962 2.31604C11.1613 1.8846 12.8847 1.90004 14.5031 2.31862C14.4475 3.40806 14.9901 4.48912 15.9997 5.072C17.0101 5.65532 18.2187 5.58416 19.1346 4.99007C19.7133 5.57986 20.2277 6.25151 20.66 7.00021C21.0922 7.7489 21.4167 8.53025 21.6381 9.32628C20.6656 9.82247 19.9997 10.8336 19.9997 12.0002C19.9997 13.166 20.6646 14.1764 21.6359 14.673C21.1892 16.2839 20.3409 17.7841 19.1347 19.0104C18.2187 18.4163 17.0101 18.3451 15.9997 18.9284C14.9893 19.5117 14.4467 20.5941 14.5032 21.6844C12.8382 22.1158 11.1148 22.1004 9.49633 21.6818C9.55191 20.5923 9.00929 19.5113 7.99972 18.9284C6.98938 18.3451 5.78079 18.4162 4.86484 19.0103C4.28617 18.4205 3.77172 17.7489 3.33946 17.0002ZM8.99972 17.1964C10.0911 17.8265 10.8749 18.8227 11.2503 19.9659C11.7486 20.0133 12.2502 20.014 12.7486 19.9675C13.1238 18.8237 13.9078 17.8268 14.9997 17.1964C16.0916 16.5659 17.347 16.3855 18.5252 16.6324C18.8146 16.224 19.0648 15.7892 19.2729 15.334C18.4706 14.4373 17.9997 13.2604 17.9997 12.0002C17.9997 10.74 18.4706 9.5632 19.2729 8.6665C19.1688 8.4405 19.0538 8.21822 18.9279 8.00021C18.802 7.78219 18.667 7.57148 18.5233 7.36842C17.3457 7.61476 16.0911 7.43414 14.9997 6.80405C13.9083 6.17395 13.1246 5.17768 12.7491 4.03455C12.2509 3.98714 11.7492 3.98646 11.2509 4.03292C10.8756 5.17671 10.0916 6.17364 8.99972 6.80405C7.9078 7.43447 6.65245 7.61494 5.47428 7.36803C5.18485 7.77641 4.93463 8.21117 4.72656 8.66637C5.52881 9.56311 5.99972 10.74 5.99972 12.0002C5.99972 13.2604 5.52883 14.4372 4.72656 15.3339C4.83067 15.5599 4.94564 15.7822 5.07152 16.0002C5.19739 16.2182 5.3324 16.4289 5.47612 16.632C6.65377 16.3857 7.90838 16.5663 8.99972 17.1964ZM11.9997 15.0002C10.3429 15.0002 8.99972 13.6571 8.99972 12.0002C8.99972 10.3434 10.3429 9.00021 11.9997 9.00021C13.6566 9.00021 14.9997 10.3434 14.9997 12.0002C14.9997 13.6571 13.6566 15.0002 11.9997 15.0002ZM11.9997 13.0002C12.552 13.0002 12.9997 12.5525 12.9997 12.0002C12.9997 11.4479 12.552 11.0002 11.9997 11.0002C11.4474 11.0002 10.9997 11.4479 10.9997 12.0002C10.9997 12.5525 11.4474 13.0002 11.9997 13.0002Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </div>
                          </Link>
                          <Link to="/my-account">
                            <div className="flex w-full items-center text-gray-700 hover:bg-blue-300 hover:text-black">
                              <span
                                className="mr-2 block w-2/3 py-2 pl-4 text-sm "
                                role="menuitem"
                                id="my-account"
                              >
                                My Account
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="ml-2 h-5 w-5"
                                stroke="currentColor"
                                strokeWidth="0.2px"
                              >
                                <path
                                  d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12.1597 16C10.1243 16 8.29182 16.8687 7.01276 18.2556C8.38039 19.3474 10.114 20 12 20C13.9695 20 15.7727 19.2883 17.1666 18.1081C15.8956 16.8074 14.1219 16 12.1597 16ZM12 4C7.58172 4 4 7.58172 4 12C4 13.8106 4.6015 15.4807 5.61557 16.8214C7.25639 15.0841 9.58144 14 12.1597 14C14.6441 14 16.8933 15.0066 18.5218 16.6342C19.4526 15.3267 20 13.7273 20 12C20 7.58172 16.4183 4 12 4ZM12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5ZM12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </div>
                          </Link>
                        </div>
                      )}
                      {/* Dark Mode and Sign Out */}
                      <div>
                        <span
                          className={
                            userID === 0
                              ? "block py-2 pl-4 text-sm text-gray-700 hover:rounded-t-md hover:bg-blue-300 hover:text-black"
                              : "block py-2 pl-4 text-sm text-gray-700 hover:bg-blue-300 hover:text-black"
                          }
                          role="menuitem"
                          id="theme"
                          onClick={() => setDarkMode(!darkMode)}
                        >
                          {darkMode ? lightModeText : darkModeText}
                        </span>

                        {userID === 0 ? (
                          <>
                            <Link to="/register">
                              <div className="flex w-full items-center text-gray-700  hover:bg-blue-300 hover:text-black">
                                <span
                                  className="mr-2 block w-2/3 py-2 pl-4 text-sm "
                                  role="menuitem"
                                  id="sign-in"
                                >
                                  Register
                                </span>

                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="ml-2 h-6 w-6"
                                  stroke="currentColor"
                                  strokeWidth="0.2px"
                                >
                                  <g
                                    id="SVGRepo_bgCarrier"
                                    stroke-width="0"
                                  ></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <g id="User / User_Add">
                                      {" "}
                                      <path
                                        id="Vector"
                                        d="M15 19C15 16.7909 12.3137 15 9 15C5.68629 15 3 16.7909 3 19M19 16V13M19 13V10M19 13H16M19 13H22M9 12C6.79086 12 5 10.2091 5 8C5 5.79086 6.79086 4 9 4C11.2091 4 13 5.79086 13 8C13 10.2091 11.2091 12 9 12Z"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      ></path>{" "}
                                    </g>{" "}
                                  </g>
                                </svg>
                              </div>
                            </Link>
                            <Link to="/sign-in">
                              <div className="flex w-full items-center text-gray-700 hover:rounded-b-md hover:bg-blue-300 hover:text-black">
                                <span
                                  className="mr-2 block w-2/3 py-2 pl-4 text-sm "
                                  role="menuitem"
                                  id="sign-in"
                                >
                                  Sign In
                                </span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="ml-2 h-5 w-5"
                                  stroke="currentColor"
                                  strokeWidth="0.2px"
                                >
                                  <path
                                    d="M4 15H6V20H18V4H6V9H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V15ZM10 11V8L15 12L10 16V13H2V11H10Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                              </div>
                            </Link>
                          </>
                        ) : (
                          <div
                            className="flex w-full items-center text-gray-700 hover:rounded-b-md hover:bg-blue-300 hover:text-black"
                            onClick={signOut}
                          >
                            <span
                              className="mr-2 block w-2/3 py-2 pl-4 text-sm "
                              role="menuitem"
                              id="sign-out"
                            >
                              Sign Out
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="ml-2 h-5 w-5"
                              stroke="currentColor"
                              strokeWidth="0.2px"
                            >
                              <path
                                d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
