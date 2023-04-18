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
        window.location.reload();
      } else {
        console.log("Uncaught error -- debug!");
        setUserID(0);
      }
    });
  };

  return (
    <div
      aria-label="Site Footer"
      className="min-w-full bg-white dark:bg-gray-900"
    >
      <div className="mx-auto w-full px-4 pt-16 pb-4 sm:px-6 lg:px-8 ">
        <div className="hidden w-full justify-between sm:flex lg:items-start lg:gap-8">
          <div className="mt-8 grid w-full grid-cols-3 justify-between lg:mt-0 lg:grid-cols-6 lg:gap-y-10">
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
                  <span className="font-medium" id="sign-in">
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
              {userID === 0 ? (
                <Link
                  to="/register"
                  className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg"
                >
                  {" "}
                  <span className="font-medium" id="register">
                    Register
                  </span>
                </Link>
              ) : (
                <Link
                  to="/my-account"
                  className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg"
                >
                  {" "}
                  <span className="font-medium" id="my-account">
                    My Account
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-800">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <p className="text-left text-xs text-gray-500 dark:text-gray-400">
              &copy; 2023. GatorChat. All rights reserved.
            </p>

            <div aria-label="Footer Navigation - Support">
              <ul className="flex flex-wrap justify-evenly text-xs lg:justify-end lg:space-x-4">
                <li>
                  <Link
                    to="/terms-and-conditions"
                    className="text-gray-500 transition hover:opacity-75 dark:text-gray-400"
                  >
                    {" "}
                    <span className="font-medium" id="terms-and-conditions">
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
                  <Link
                    to="/contact-us"
                    className="text-gray-500 transition hover:opacity-75 dark:text-gray-400"
                  >
                    {" "}
                    <span className="mr-4 font-medium" id="contact-us">
                      Contact Us
                    </span>
                  </Link>
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
