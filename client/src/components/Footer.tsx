import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userIDAtom } from "../App";

const Footer = () => {
  const [userID, setUserID] = useAtom(userIDAtom);
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

  return (
    <div
      aria-label="Site Footer"
      className="absolute bottom-0 w-full bg-white dark:bg-gray-900"
    >
      <div className="mx-auto  px-4 pt-16 pb-4 sm:px-6 lg:px-8">
        <div className="hidden sm:flex lg:items-start lg:gap-8">
          <div className="mt-8 grid grid-cols-3 gap-4 lg:mt-0 lg:grid-cols-6 lg:gap-y-10">
            <div className="col-span-2 sm:col-span-1">
              <p className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg">
                About
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <Link to="/faq">
                <span
                  className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg"
                  role="menuitem"
                  id="faq"
                >
                  FAQs
                </span>
              </Link>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <Link to={userID === 0 ? "/sign-in" : "/settings"}>
                <span
                  className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg"
                  role="menuitem"
                  id="settings"
                >
                  Settings
                </span>
              </Link>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <Link to="/contact-us">
                <span
                  className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg"
                  role="menuitem"
                  id="contact-us"
                >
                  Contact Us
                </span>
              </Link>
            </div>

            <div className="col-span-2 sm:col-span-1">
              {userID === 0 ? (
                <Link
                  to="/sign-in"
                  className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg"
                >
                  {" "}
                  <span className="mr-4 font-medium" id="sign-in">
                    Sign in
                  </span>
                </Link>
              ) : (
                <Link to="/">
                  <span
                    className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg"
                    id="sign-out"
                    onClick={signOut}
                  >
                    Sign out
                  </span>
                </Link>
              )}
            </div>

            <div className="col-span-2 sm:col-span-1">
              <Link
                to="/register"
                className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg"
              >
                {" "}
                <span className="mr-4 font-medium" id="register">
                  Register
                </span>
              </Link>
            </div>

            {/* Newsletter */}
            <div className="col-span-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Get the latest news!
                </h2>

                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Subscribe to our newsletter to receive updates about our
                  website.
                </p>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
              <form className="w-full">
                <label htmlFor="UserEmail" className="sr-only">
                  Email
                </label>

                <div className="border border-gray-100 p-2 focus-within:ring dark:border-gray-800 sm:flex sm:items-center sm:gap-4">
                  <input
                    type="email"
                    id="UserEmail"
                    placeholder="email@email.com"
                    className="w-full border-none !outline-none focus:border-transparent focus:ring-transparent dark:bg-gray-900 dark:text-white sm:text-sm
                    "
                  />

                  <button className="mt-1 w-full rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium tracking-wide text-white transition-none hover:bg-blue-600 sm:mt-0 sm:w-auto sm:flex-shrink-0">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-800">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <p className="text-left text-xs text-gray-500 dark:text-gray-400">
              &copy; 2023. Company Name. All rights reserved.
            </p>

            <div aria-label="Footer Navigation - Support">
              <ul className="flex flex-wrap justify-start gap-4 text-xs lg:justify-end">
                <li>
                  <Link
                    to="/terms-and-conditions"
                    className="text-gray-500 transition hover:opacity-75 dark:text-gray-400"
                  >
                    {" "}
                    <span
                      className="mr-4 font-medium"
                      id="terms-and-conditions"
                    >
                      Terms & Conditions
                    </span>
                  </Link>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-500 transition hover:opacity-75 dark:text-gray-400"
                  >
                    Privacy Policy
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-500 transition hover:opacity-75 dark:text-gray-400"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
