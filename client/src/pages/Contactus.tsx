import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dropdown } from "flowbite";

import React from "react";

const ContactUs = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [comment, setcomment] = useState("");
  const submit = (e: any) => {
    e.preventDefault();
    console.log("First Name:" + name);
    console.log("Email:" + email);
    console.log("comment:" + comment);
  };
  return (
    <div className="h-screen bg-gray-50 py-8 dark:bg-gray-900 ">
      <form onSubmit={submit}>
        {/*body*/}
        <div className="font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          <div className="flex justify-center">
            {/* account settings header*/}
            <div className="font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Contact us
            </div>
          </div>
          {/*input email*/}
          <div className="w-center">
            <div className="my-10">
              <label className="flex justify-center">Email</label>
              <div className="ml-20 flex justify-center ">
                <input
                  type="email"
                  id="email"
                  className="mr-20 block w-6 rounded-lg border border-gray-300 bg-gray-50 p-2  text-gray-900 focus:border-blue-600 focus:outline-none  focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white  dark:placeholder-gray-400 dark:focus:border-blue-500  dark:focus:ring-blue-500 sm:w-96 sm:text-sm"
                  placeholder="enter email here"
                  onChange={(event) => {
                    setemail(event.target.value);
                  }}
                ></input>
              </div>
            </div>
          </div>
          {/*input name*/}
          <div className="w-center">
            <div className="my-10">
              <label className="flex justify-center">name</label>
              <div className="ml-20 flex justify-center ">
                <input
                  type="text"
                  id="name"
                  className="mr-20 block w-6 rounded-lg border border-gray-300 bg-gray-50 p-2  text-gray-900 focus:border-blue-600 focus:outline-none  focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white  dark:placeholder-gray-400 dark:focus:border-blue-500  dark:focus:ring-blue-500 sm:w-96 sm:text-sm"
                  placeholder="enter full name here"
                  onChange={(event) => {
                    setname(event.target.value);
                  }}
                ></input>
              </div>
            </div>
          </div>

          {/*reason for contact*/}
          <div className="w-center">
            <div className="my-10">
              <label className="flex justify-center">message</label>
              <div className="ml-20 flex justify-center ">
                <textarea
                  id="comment"
                  className="mr-20 block h-72 rounded-lg border border-gray-300 bg-gray-50 p-2  text-gray-900 focus:border-blue-600 focus:outline-none  focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white  dark:placeholder-gray-400 dark:focus:border-blue-500  dark:focus:ring-blue-500 sm:w-96 sm:text-sm"
                  onChange={(event) => {
                    setcomment(event.target.value);
                  }}
                  placeholder="I love this website so much! Thanks for making it!"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5 flex justify-center">
          <button
            type="submit"
            id="submit-button"
            className="py-2.5text-center flex w-20 justify-center rounded-lg bg-blue-600 px-10 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
