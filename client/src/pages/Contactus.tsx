import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dropdown } from "flowbite";

import React from 'react'

const Contactus = () => 
{
  const[name,setname] = useState("");
  const[email,setemail]=useState("");
  const[comment,setcomment]=useState("");
  const submit = (e: any) =>
   {
    e.preventDefault();
    console.log("First Name:" + name);
    console.log("Email:" + email);
    console.log("comment:" + comment);
   }
  return (
    <div className="h-screen py-8 bg-gray-50 dark:bg-gray-900 ">
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
        <div className = "w-center">
        <div className = "my-10">
          <label className = "flex justify-center">Email</label>
          <div className= "flex justify-center ml-20 ">
          <input type = "email" className = "mr-20 w-6 sm:w-96 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  rounded-lg focus:ring-blue-600 focus:border-blue-600  focus:ring-1 focus:outline-none block p-2 dark:bg-gray-700  dark:border-gray-600 dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder = "enter email here" onChange={(event)=>{setemail(event.target.value)}}>

          </input>
        </div>
        </div>
        </div>
        {/*input name*/}
        <div className = "w-center">
        <div className = "my-10">
          <label className = "flex justify-center">name</label>
          <div className= "flex justify-center ml-20 ">
          <input type = "text" className = "mr-20 w-6 sm:w-96 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  rounded-lg focus:ring-blue-600 focus:border-blue-600  focus:ring-1 focus:outline-none block p-2 dark:bg-gray-700  dark:border-gray-600 dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder = "enter full name here" onChange={(event)=>{setname(event.target.value)}}>
            
          </input>
        </div>
        </div>
        </div>

        {/*reason for contact*/}
        <div className = "w-center">
        <div className = "my-10">
          <label className = "flex justify-center">message</label>
          <div className= "flex justify-center ml-20 ">
          <textarea id = "comment" className = "mr-20 h-72 sm:w-96 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  rounded-lg focus:ring-blue-600 focus:border-blue-600  focus:ring-1 focus:outline-none block p-2 dark:bg-gray-700  dark:border-gray-600 dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(event)=>{setcomment(event.target.value)}} placeholder= "I love this website so much! Thanks for making it!">
          </textarea>
        </div>
        </div>
        </div>
        
      </div>
      <div className="flex justify-center my-5">
          <button
                type="submit"
                className="w-20 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5text-center dark:bg-blue-600  dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center" >
                Submit
              </button>
       </div>
      </form>
    </div>
    
  )
}

export default Contactus

