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
  const [profilePicture, setProfilePicture] = useState<string>("");

  useEffect(() => {
    // GET and SET the user who posted the thread's profile picture
    if (userID !== undefined && userID > 0) {
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
    }
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
    <div className="relative mx-auto flex w-full flex-wrap border-b-4 border-b-blue-600 dark:bg-gray-900">
      <div className="flex h-14 justify-between text-gray-700  dark:text-white">
        {/* dark:bg-gray-900 */}
        <div className="flex items-center px-5 py-6 xl:px-12">
          {/* Logo  */}
          <div>
            <Link to="/">
              <span
                className="cursor-pointer rounded-lg p-1 text-3xl font-bold"
                id="logo"
              >
                Logo
              </span>
            </Link>
          </div>
          {/* Nav */}
          <div className="absolute right-0 flex items-center space-x-8 px-4 ">
            {/* Navigation Bar */}
            <Link to="/">
              {" "}
              <span
                className="rounded-lg p-1 text-lg font-semibold ring-gray-300 hover:bg-blue-600 hover:text-white hover:ring-2"
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
                    className="rounded-lg p-1 text-lg font-semibold ring-gray-300 hover:bg-blue-600 hover:text-white hover:ring-2"
                    id="sign-in"
                  >
                    Sign in
                  </span>
                </Link>
                <Link to="/register">
                  {" "}
                  <span
                    className="mr-6 rounded-lg p-1 text-lg font-semibold ring-gray-300 hover:bg-blue-600 hover:text-white hover:ring-2"
                    id="register"
                  >
                    Register
                  </span>
                </Link>
              </>
            ) : (
              // <Link to="">
              <span
                className="mr-6 rounded-lg p-1 text-lg font-semibold ring-gray-300 hover:bg-blue-600 hover:text-white hover:ring-2"
                id="sign-out-header"
                onClick={signOut}
              >
                Sign out
              </span>
              // </Link>
            )}

            {/* Dropdown Menu */}
            <div className="flex items-center">
              <div
                className="relative inline-block text-left"
                ref={dropdownRef}
              >
                <div
                  className="mt-1 inline-flex w-full cursor-pointer justify-center rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-200"
                  id="menu-button"
                  onClick={() => toggleDropdown()}
                >
                  {userID === 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 hover:text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <div
                      className="ml-3 h-10 w-10 overflow-hidden rounded-full border-2 border-gray-900 dark:border-gray-300"
                      id="profile-picture"
                    >
                      <ProfilePicture image={profilePicture} />
                    </div>
                  )}
                </div>
                {showDropdown && (
                  <div
                    className="absolute right-0 z-10 -mt-2 w-32 origin-top-right cursor-pointer divide-y divide-gray-300 rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    id="dropdown-content"
                    onClick={() => toggleDropdown()}
                  >
                    {/* Settings and My Account*/}
                    {userID === 0 ? null : (
                      <div>
                        <Link to="/settings">
                          <span
                            className="block px-4 py-2 text-sm text-gray-700 hover:rounded-t-md hover:bg-blue-300 hover:text-black"
                            role="menuitem"
                            id="settings"
                          >
                            Settings
                          </span>
                        </Link>
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-300 hover:text-black"
                          role="menuitem"
                          id="my-account"
                        >
                          My Account
                        </span>
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
                        <Link to="/sign-in">
                          <span
                            className="block px-4 py-2 text-sm text-gray-700 hover:rounded-b-md hover:bg-blue-300 hover:text-black"
                            role="menuitem"
                            id="sign-in-head"
                          >
                            Sign in
                          </span>
                        </Link>
                      ) : (
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:rounded-b-md hover:bg-blue-300 hover:text-black"
                          role="menuitem"
                          id="sign-out"
                          onClick={signOut}
                        >
                          Sign out
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
