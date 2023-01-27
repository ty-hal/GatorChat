import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";

const Layout = () => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div className="flex flex-wrap border-b-blue-600 border-b-4">
      <section className="relative mx-auto">
        <nav className="flex justify-between h-14 dark:bg-gray-900 text-gray-700 dark:text-white w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            {/* Logo  */}
            <a className="text-3xl font-bold font-heading" href="#">
              Logo
            </a>
            <ul className="flex px-4 items-center absolute right-0 font-heading space-x-8 ">
              {/* Navigation Bar */}
              <Link to="/">
                {" "}
                <span className="font-semibold hover:ring-2 rounded-lg p-1 text-lg ring-gray-300 hover:bg-blue-600 hover:text-white">
                  Home
                </span>
              </Link>
              <Link to="/sign-in">
                {" "}
                <span className="font-semibold hover:ring-2 rounded-lg p-1 text-lg ring-gray-300 hover:bg-blue-600 hover:text-white">
                  Sign in
                </span>
              </Link>
              <Link to="/register">
                {" "}
                <span className="font-semibold hover:ring-2 rounded-lg p-1 text-lg ring-gray-300 hover:bg-blue-600 hover:text-white mr-6">
                  Register
                </span>
              </Link>
              {/* Dropdown Menu */}
              <div className="flex items-center">
                <div className="relative inline-block text-left">
                  <div
                    className="mt-1 inline-flex w-full justify-center rounded-md cursor-pointer text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-200"
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
                  <div
                    className={
                      showDropDown
                        ? "-mt-2 absolute right-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        : "hidden -mt-2 absolute right-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    }
                    role="menu"
                    id="dropdown-content"
                    onMouseLeave={(): void => toggleDropDown()}
                  >
                    <div className="py-1" role="none">
                      <Link to ="/Settings">
                      <span
                        className="text-gray-700 block px-4 py-2 text-sm hover:font-semibold"
                        role="menuitem"
                        id="menu-item-0">
                        
                      
                        Settings
                        </span>
                      </Link>
                      <a
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm hover:font-semibold"
                        role="menuitem"
                        id="menu-item-1"
                      >
                        My Account
                      </a>
                    </div>
                    <div className="py-1" role="none">
                      <a
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm hover:font-semibold"
                        role="menuitem"
                        id="menu-item-6"
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
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
