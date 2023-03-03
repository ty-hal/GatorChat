import { Link } from "react-router-dom";
import { useState } from "react";
import { useAtom } from "jotai";
import { darkModeAtom } from "../App";

const Header = () => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
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
    <div className="flex flex-wrap border-b-4 border-b-blue-600">
      <section className="relative mx-auto">
        <nav className="flex h-14 w-screen justify-between text-gray-700 dark:bg-gray-900 dark:text-white">
          <div className="flex w-full items-center px-5 py-6 xl:px-12">
            {/* Logo  */}
            <Link to="/">
              <span
                className="cursor-pointer rounded-lg p-1 text-3xl font-bold"
                id="logo"
              >
                Logo
              </span>
            </Link>
            <ul className="font-heading absolute right-0 flex items-center space-x-8 px-4 ">
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
              {/* Dropdown Menu */}
              <div className="flex items-center">
                <div className="relative inline-block text-left">
                  <div
                    className="mt-1 inline-flex w-full cursor-pointer justify-center rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-200"
                    id="menu-button"
                    onMouseEnter={(): void => toggleDropDown()}
                  >
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
                  </div>
                  {showDropDown && (
                    <div
                      className="absolute right-0 z-10 -mt-2 w-32 origin-top-right cursor-pointer divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      id="dropdown-content"
                      onMouseLeave={(): void => toggleDropDown()}
                    >
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
                      <div>
                        <span
                          className="block py-2 pl-4 text-sm text-gray-700 hover:bg-blue-300 hover:text-black"
                          role="menuitem"
                          id="theme"
                          onClick={() => setDarkMode(!darkMode)}
                        >
                          {darkMode ? lightModeText : darkModeText}
                        </span>

                        <Link to="/">
                          <span
                            className="block px-4 py-2 text-sm text-gray-700 hover:rounded-b-md hover:bg-blue-300 hover:text-black"
                            role="menuitem"
                            id="sign-out"
                          >
                            Sign out
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ul>
          </div>
        </nav>
      </section>
    </div>
  );
};

export default Header;
