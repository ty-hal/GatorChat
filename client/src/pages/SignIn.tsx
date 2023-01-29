import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false); // Toggles show password
  const [invalidCredentials, setInvalidCredentials] = useState(false); // After user tried to login, is the login valid
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const submit = (e: any) => {
    e.preventDefault();
    console.log("username:" + username);
    console.log("password:" + password);

    // Backend API call here to see if user a) has a valid email address, and b) has a valid login

    // If login is unsuccessful:
    setInvalidCredentials(true);

    // If login is successful:
    // setInvalidCredentials(false);
  };

  return (
    <section className="h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="sm:max-w-md w-full mx-auto bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 shadow">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Sign into your account
          </h1>
          <form className="space-y-4" onSubmit={submit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-1 focus:outline-none focus:ring-blue-600 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="email@ufl.edu"
                required
                pattern="[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@ufl\.edu"
                onChange={(event) => setusername(event.target.value)}
              ></input>
              {invalidCredentials && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-sm mt-1 ml-1">
                  Incorrect username!
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  type={`${showPassword ? "text" : "password"}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-1 focus:outline-none focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be at least 8 characters long and contain a number and uppercase letter"
                  required
                  onChange={(event) => {
                    setpassword(event.target.value);
                  }}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <svg
                    fill="none"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    viewBox="0 0 576 512"
                    className={`h-6 text-gray-900 dark:text-gray-50 ${
                      showPassword ? "hidden" : "block"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                    ></path>
                  </svg>

                  <svg
                    fill="none"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    viewBox="0 0 576 512"
                    className={`h-6 text-gray-900 dark:text-gray-50 ${
                      showPassword ? "block" : "hidden"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                    ></path>
                  </svg>
                </div>
              </div>
              {invalidCredentials && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-sm mt-1 ml-1">
                  Incorrect password!
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  ></input>
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                {" "}
                <span> Forgot password?</span>
              </Link>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                {" "}
                <span className="mr-4">Create an account</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
export default SignIn;
