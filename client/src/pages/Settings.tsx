import { Link } from "react-router-dom";

import React from "react";

const Settings = () => {
  return (
    //background
    <div className="h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="mx-auto w-full space-y-4 p-6 shadow sm:max-w-md sm:p-8 md:space-y-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          Account Settings
        </h1>
        <div>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Personal information
          </h1>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              First Name
              <input
                type="text "
                className="block w-full 
        rounded-lg border border-gray-300 
        bg-gray-50 p-2 text-gray-900 
        focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 
        dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
        dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm "
              ></input>
            </label>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Last Name
              <input
                type="text "
                className="block w-full 
        rounded-lg border border-gray-300 
        bg-gray-50 p-2 text-gray-900 
        focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 
        dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
        dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm "
              ></input>
            </label>
            <div className="flex items-center justify-center">
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Major
                <select
                  className=" focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 block 
        w-96 rounded-lg border border-gray-300 
        bg-gray-50 p-2 text-sm text-gray-900 
        dark:border-gray-600 dark:bg-gray-700 dark:text-white 
        dark:placeholder-gray-400 dark:focus:border-blue-500"
                ></select>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
