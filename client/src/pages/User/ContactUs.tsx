import { useState } from "react";
import Footer from "../../components/Footer";
interface emailInfo {
  email: string;
  name: string;
  message: string;
}

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e: any) => {
    e.preventDefault();
    const mail: emailInfo = {
      email: email,
      name: name,
      message: `Contact Us form: ${message}`,
    };

    fetch("http://localhost:9000/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(mail),
    }).then((response) => window.location.reload());
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 py-8 dark:bg-gray-900 ">
      <form
        onSubmit={sendEmail}
        className="mx-auto w-full rounded-lg bg-white p-6 pb-0 text-gray-900 shadow dark:border dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-3/4 sm:p-8 sm:pb-0 md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3"
      >
        {/* Form Information */}
        <div className="mx-auto w-full space-y-3 pb-10 text-sm font-medium sm:max-w-md sm:text-base">
          {/* Contact Us*/}
          <div className="text-left text-2xl font-bold">Contact Us</div>
          {/* Name*/}
          <div>
            <label className="mb-2 block text-sm">Name</label>
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
              id="name"
              name="name"
              placeholder="John Doe"
              required
              onChange={(event) => {
                setName(event.target.value);
              }}
              //pattern="[a-zA-Z.'`~-]+"
              title="Enter your full name."
            ></input>
          </div>
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm">Email</label>
            <input
              type="email"
              className="
                block w-11/12 rounded-lg border 
                border-gray-300 bg-gray-50 p-2 
                text-sm text-gray-900 focus:border-blue-600 
                focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 
                dark:text-white dark:placeholder-gray-400 
                dark:focus:border-blue-500 dark:focus:ring-blue-500 
                sm:w-full"
              id="email"
              name="email"
              placeholder="email@ufl.edu"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              required
              title="Enter your email."
            ></input>
          </div>
          {/* Message*/}
          <div>
            <label className="mb-2 block text-sm">Message</label>
            <textarea
              className="
                block h-48 w-11/12 rounded-lg border border-gray-300 
                bg-gray-50 p-2 text-sm 
                text-gray-900 focus:border-blue-600 focus:outline-none 
                focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                dark:placeholder-gray-400 dark:focus:border-blue-500 
                dark:focus:ring-blue-500 sm:h-64 
                sm:w-full"
              id="message"
              name="message"
              placeholder="Enter your message"
              maxLength={1500}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              required
            ></textarea>
            <div
              className="mx-auto mt-2 w-full text-right text-sm text-black dark:text-gray-400 sm:text-base"
              id="title-length"
            >
              {message.length}/1500 characters
            </div>
          </div>
          {/* Submit */}
          <button
            type="submit"
            id="submit"
            disabled={
              email.length === 0 || name.length === 0 || message.length === 0
                ? true
                : false
            }
            className={
              email.length === 0 || name.length === 0 || message.length === 0
                ? "cursor-auto rounded-lg bg-gray-500 px-3 py-2.5 text-center text-sm font-medium text-white sm:px-5"
                : "rounded-lg bg-blue-600 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:px-5"
            }
          >
            Submit
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default ContactUs;
