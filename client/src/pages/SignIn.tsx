import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface userLogin {
  email: string;
  password: string;
  remember_me?: boolean;
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false); // Toggles show password
  const [invalidPassword, setInvalidPassword] = useState(false); // If the user's password is invalid
  const [invalidEmail, setInvalidEmail] = useState(false); // If the user's password is invalid
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginInfo, setLoginInfo] = useState<userLogin>({
    email: "",
    password: "",
    remember_me: false,
  });

  // Set login info state
  useEffect(() => {
    try {
      let loginInformation = JSON.parse(
        localStorage.getItem("login-information") ||
          sessionStorage.getItem("login-information") ||
          ""
      );
      setLoginInfo(loginInformation);
      document
        ?.getElementById("email")
        ?.setAttribute("value", loginInformation.email);
      setEmail(loginInformation.email);
      document
        ?.getElementById("password")
        ?.setAttribute("value", loginInformation.password);
      setPassword(loginInformation.password);
      if (loginInformation.remember_me) {
        document?.getElementById("remember")?.setAttribute("checked", "true");
      }
      setRememberMe(loginInformation.remember_me);
    } catch {
      return;
    }
  }, []);
  useEffect(() => {
    if (loginInfo.email !== "" || loginInfo.password !== "") {
      if (!rememberMe) {
        sessionStorage.setItem("login-information", JSON.stringify(loginInfo));
        localStorage.removeItem("login-information");
      } else {
        localStorage.setItem("login-information", JSON.stringify(loginInfo));
        sessionStorage.removeItem("login-information");
      }
    }
  }, [loginInfo]);

  let navigate = useNavigate();

  const submit = (e: any) => {
    e.preventDefault();

    const login: userLogin = {
      email: email,
      password: password,
    };

    /*  
random@ufl.edu
Mypassword@123
*/
    // Backend API call here to see if user a) has a valid email address, and b) has a valid login
    fetch("http://localhost:9000/api/user/signin", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(login),
    })
      .then((response) => {
        // User signed in
        if (response.status === 200) {
          setInvalidPassword(false);
          setInvalidEmail(false);
          setLoginInfo({
            email: "",
            password: "",
          });
          navigate("/"); // Navigate to home page
          return response.json();
        }

        // User not found (no account with this email address)
        else if (response.status === 404) {
          setInvalidEmail(true);
          setInvalidPassword(false);
          console.log("User not found");
        }

        // Invalid Password
        else if (response.status === 401) {
          setInvalidPassword(true);
          setInvalidEmail(false);
          console.log("Invalid password");
        }
      })
      .then((data) =>
        data ? console.log("User Signed In") : console.log(data)
      );
  };

  return (
    <section className="h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="mx-auto w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 shadow sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Sign into your account
          </h1>
          <form className="space-y-4" onSubmit={submit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                UFL Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                placeholder="email@ufl.edu"
                required
                pattern="[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@ufl\.edu"
                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  setEmail((e.target as HTMLInputElement).value);
                  setLoginInfo({
                    ...loginInfo,
                    email: (e.target as HTMLInputElement).value,
                  });
                }}
              ></input>
              {invalidEmail && (
                <span className="mt-1 ml-1 flex items-center text-sm font-medium tracking-wide text-red-500">
                  No account with this email address exists.
                </span>
              )}
            </div>
            {/* Password  */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  id="password"
                  placeholder={`${showPassword ? "password" : "••••••••"}`}
                  type={`${showPassword ? "text" : "password"}`}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be at least 8 characters long and contain a number and uppercase letter"
                  required
                  onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    setPassword((e.target as HTMLInputElement).value);
                    setLoginInfo({
                      ...loginInfo,
                      password: (e.target as HTMLInputElement).value,
                    });
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
                  <svg
                    fill="none"
                    id="eye"
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
              {invalidPassword && (
                <span className="mt-1 ml-1 flex items-center text-sm font-medium tracking-wide text-red-500">
                  Incorrect password!
                </span>
              )}
            </div>
            {/* Remember Me  */}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    onClick={() => {
                      setLoginInfo({
                        ...loginInfo,
                        remember_me: !rememberMe,
                      });
                      setRememberMe(!rememberMe);
                    }}
                  />
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
              <div
                className="text-sm font-medium text-blue-600 hover:underline"
                id="forgot-password"
              >
                <Link to="/forgot-password">
                  {" "}
                  <span> Forgot password?</span>
                </Link>
              </div>
            </div>
            {/* Submit */}
            <button
              type="submit"
              id="submit"
              className="dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
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
