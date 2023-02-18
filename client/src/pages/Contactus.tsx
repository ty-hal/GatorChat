import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dropdown } from "flowbite";

import React from 'react'

const Contactus = () => {
  return (
    <div className="h-screen py-8 bg-gray-50 dark:bg-gray-900 ">
      {/*body*/}
      <div className="font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
        <div className="flex justify-center">
          {/* account settings header*/}
          <div className="font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Contact us
          </div>
        </div>
        {/*input email*/}
        <div className = "my-10">
          <label className = "flex justify-center">Email</label>
          <div className= "flex justify-center ml-20 ">
          <input type = "email" className = "mr-20 w-11/12 sm:w-full bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm  rounded-lg focus:ring-blue-600 focus:border-blue-600  focus:ring-1 focus:outline-none block p-2 dark:bg-gray-700  dark:border-gray-600 dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder = "enter email here"></input>
        </div>
        </div>
        {/* insert first name here*/}
        
      </div>
    </div>
     
  )
}

export default Contactus

