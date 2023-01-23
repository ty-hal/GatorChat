
import React from 'react'
import Inputform from '../components/Inputform'
import { useState } from 'react';
import { Link } from "react-router-dom";
const SignIn = () => {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  let darkmode_button:string = "Lightmode";
  let darkmode_option:string = "h-screen py-16 md:py-8 bg-gray-100 dark:bg-gray-900";
  let dark_true:boolean = false;
  const submit = (e: any) => {
    e.preventDefault();
    console.log("username:" + username);
    console.log("password:" + password);
  }
  const darkfunc = (darktrue:boolean)=>
  {
    console.log(darkmode_option)
    if(!dark_true) //if were in light mode
    {
      darkmode_option = "h-screen py-16 md:py-8 bg-gray-900 dark:bg-gray-900";
      darkmode_button = "Darkmode"
      dark_true = true;
    }
    else
    {
      darkmode_option = "h-screen py-16 md:py-8 bg-gray-100 dark:bg-gray-900";
      darkmode_button = "Lightmode"
      dark_true = false;
    }

  }

  return (
    <div>
    <div className={darkmode_option}>
      <div className="sm:max-w-md w-full mx-auto bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className = "p-6 space-y-4 md:space-y-6 sm:p-8 shadow">
          <h1 className = "text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          Sign into your account
          </h1>
        <form className ="space-y-4 md:space-y-3" onSubmit={submit}>
          <div>
            <label htmlFor="email" 
            className = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"> 
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
                onChange={(event) => setusername(event.target.value)}>
            </input>
            <label 
            htmlFor= "password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
              <input 
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-1 focus:outline-none focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(event) => { setpassword(event.target.value) }}>
              </input>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
              <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800">
                </input>
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

    </div>
    <button type="button" className="w-full text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    onClick={(event)=>{darkfunc(dark_true)}}>
        {darkmode_button}
      </button>
    </div>
  )
}
export default SignIn


