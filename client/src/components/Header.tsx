import { Link } from "react-router-dom";
import { useState } from "react";
import { useAtom } from "jotai";
import { darkModeAtom } from "../index";

const Layout = () => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div className="flex flex-wrap border-b-4 border-b-blue-600">
      <section className="relative mx-auto">
        <nav className="flex h-14 w-screen justify-between text-gray-700 dark:bg-gray-900 dark:text-white">
          <div className="flex w-full items-center px-5 py-6 xl:px-12">
            {/* Logo  */}
            <span className="font-heading text-3xl font-bold">Logo</span>
            <ul className="font-heading absolute right-0 flex items-center space-x-8 px-4 ">
              {/* Navigation Bar */}
              <Link to="/">
                {" "}
                <span className="rounded-lg p-1 text-lg font-semibold ring-gray-300 hover:bg-blue-600 hover:text-white hover:ring-2">
                  Home
                </span>
              </Link>
              <Link to="/sign-in">
                {" "}
                <span className="rounded-lg p-1 text-lg font-semibold ring-gray-300 hover:bg-blue-600 hover:text-white hover:ring-2">
                  Sign in
                </span>
              </Link>
              <Link to="/register">
                {" "}
                <span className="mr-6 rounded-lg p-1 text-lg font-semibold ring-gray-300 hover:bg-blue-600 hover:text-white hover:ring-2">
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
                      className="absolute right-0 z-10 -mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      id="dropdown-content"
                      onMouseLeave={(): void => toggleDropDown()}
                    >
                      <div className="py-1" role="none">
                        <Link to="/settings">
                          <span
                            className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold"
                            role="menuitem"
                            id="menu-item-0"
                          >
                            Settings
                          </span>
                        </Link>
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold"
                          role="menuitem"
                          id="menu-item-1"
                        >
                          My Account
                        </span>
                      </div>
                      <div className="py-1" role="none">
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold"
                          role="menuitem"
                          id="menu-item-6"
                          onClick={() => setDarkMode(!darkMode)}
                        >
                          Dark Mode
                        </span>
                        {/* Here  */}
                        <div className=" bg-red-200">
                          <span className="ml-4 text-sm font-medium text-gray-700 hover:font-semibold">
                            Toggle me
                          </span>
                          <label className="relative inline-flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              value=""
                              className="peer sr-only"
                            />

                            <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                          </label>
                        </div>
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold"
                          role="menuitem"
                          id="menu-item-6"
                        >
                          Sign out
                        </span>
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

export default Layout;
