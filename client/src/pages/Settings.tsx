import { Link } from "react-router-dom";

import React from 'react'

const Settings = () => {
  return (
    //background
    <div className="h-screen py-8 bg-gray-50 dark:bg-gray-900" >
      <div className="sm:max-w-md w-full mx-auto p-6 space-y-4 md:space-y-6 sm:p-8 shadow">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          Account Settings
        </h1>
        <div>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
        Personal information
        </h1>
        <div>
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        First Name
        <input type= "text " className="bg-gray-50 border 
        border-gray-300 text-gray-900 sm:text-sm 
        rounded-lg focus:ring-blue-600 focus:border-blue-600 
        focus:ring-1 focus:outline-none block w-full p-2 
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
        </input>
        </label>
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Last Name
        <input type= "text " className="bg-gray-50 border 
        border-gray-300 text-gray-900 sm:text-sm 
        rounded-lg focus:ring-blue-600 focus:border-blue-600 
        focus:ring-1 focus:outline-none block w-full p-2 
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
        </input>
        </label>
        <div className= "flex justify-center items-center">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Major
        <select 
        className=" w-96 bg-gray-50 border border-gray-300 
        text-gray-900 text-sm rounded-lg focus:ring-primary-500 
        focus:border-primary-500 block p-2 dark:bg-gray-700 
        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
        dark:focus:ring-primary-500 dark:focus:border-blue-500">

        </select>
        </label>
        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Settings
