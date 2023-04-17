import { useState } from "react";
import { userIDAtom } from "../App";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
interface mailFormat {
  email: string;
  message: string;
}
const ForgotPassword = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useAtom(userIDAtom);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [invalidCode, setInvalidCode] = useState<boolean>(false);

  // Send email with code
  const sendEmail = () => {
    const mail: mailFormat = {
      email: email,
      message: "Your code is: " + code,
    };

    fetch("http://localhost:9000/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(mail),
    });
  };

  // When user submits form to send email
  const sendUserCode = (e: React.FormEvent) => {
    e.preventDefault();

    /* Verify email is a valid account*/
    fetch(`http://localhost:9000/api/user/verify?email=${email}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        // If email is valid
        setInvalidCode(false);
        if (response.status == 200) {
          setValidEmail(true);
          setInvalidEmail(false);
          sendEmail();
          return response.json();
        }
        setValidEmail(false);
        setInvalidEmail(true);
      })
      .then((data) => {
        if (data) {
          setUserID(data.user_id);
        }
      });
  };

  // When user tried to reset password
  const resetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (userCode !== code) {
      setInvalidCode(true);
    } else {
      setInvalidCode(false);
      fetch(`http://localhost:9000/api/user/${userID}/updatepassword`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ Password: password }),
      }).then((response) => {
        if (response.status == 200) {
          navigate("/sign-in");
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="mx-auto w-full space-y-2 rounded-lg border-2 bg-white p-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md  sm:p-8 md:space-y-4">
        {/* Forgot your password? */}
        <div className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Forgot your password?
        </div>
        {/* Email Form */}
        <form
          className="space-y-3 text-sm font-medium text-gray-900 dark:text-white sm:text-base"
          onSubmit={sendUserCode}
        >
          {/* Email */}
          <div>
            <label className="mb-2 block">UF Email</label>
            <input
              type="text"
              className="
                block w-11/12 rounded-lg border 
                border-gray-300 bg-gray-50 p-2 
                text-sm text-gray-900 focus:border-blue-600 
                focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 
                dark:text-white dark:placeholder-gray-400 
                dark:focus:border-blue-500 dark:focus:ring-blue-500 
                sm:w-full"
              id="email"
              placeholder="email@ufl.edu"
              required
              pattern="[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@ufl\.edu"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></input>
          </div>
          {invalidEmail && (
            <span className="ml-1 text-sm font-medium text-red-500">
              There is no account registered with this email address.
            </span>
          )}
          {validEmail && (
            <span className="ml-1 text-sm font-medium text-green-400">
              Your code has been sent to your email address!
            </span>
          )}
          {/* Send Email */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            id="send-email"
            onClick={(event) => {
              setCode(
                (Math.floor(Math.random() * 900000) + 100000)
                  .toString()
                  .padStart(6, "0")
              );
            }}
          >
            Send Email
          </button>
        </form>

        <form onSubmit={resetPassword} className="space-y-3">
          {/* Check Code */}
          <div>
            <label className="mb-2 block  text-sm font-medium text-gray-900 dark:text-white sm:text-base">
              Code
            </label>
            <input
              type="text"
              className="
                block w-11/12 rounded-lg border 
                border-gray-300 bg-gray-50 p-2 
                text-sm text-gray-900 focus:border-blue-600 
                focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 
                dark:text-white dark:placeholder-gray-400 
                dark:focus:border-blue-500 dark:focus:ring-blue-500 
                sm:w-full"
              placeholder="123456"
              id="code"
              name="code"
              pattern="[0-9]{6}"
              title="Enter the six-digit code from the email you received."
              required
              autoComplete="new-password"
              onChange={(event) => {
                setUserCode(event.target.value);
              }}
            ></input>
          </div>
          {invalidCode && (
            <span className="ml-1 text-sm font-medium text-red-500">
              Incorrect code! Try again or send a new email.
            </span>
          )}
          {/* New Password */}
          <div>
            <label className="mb-2 block  text-sm font-medium text-gray-900 dark:text-white sm:text-base">
              New Passsword
            </label>
            <input
              type="password"
              name="password"
              className="mb-3
                block w-11/12 rounded-lg border 
                border-gray-300 bg-gray-50 p-2 
                text-gray-900 focus:border-blue-600 focus:outline-none 
                focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                dark:placeholder-gray-400 dark:focus:border-blue-500 
                dark:focus:ring-blue-500 sm:w-full  
                sm:text-sm"
              id="password"
              placeholder="••••••••"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be at least 8 characters long and contain a number and uppercase letter"
              required
              autoComplete="new-password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></input>
          </div>
          {/* Reset Password Button */}
          <button
            className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            id="check"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
