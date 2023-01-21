
import React from 'react'
import Inputform from '../components/Inputform'
import { useState } from 'react';
const SignIn = () => 
{
  const[username,setusername]=useState("")
  const[password,setpassword]=useState("")

  const submit=(e:any)=>
  {
    e.preventDefault();
    console.log("username:" + username);
    console.log("password:" + password);
  }
  const passwordhide=(e:any)=>
  {

  }

  return (
    <body className=" p-6 space-y-4 md:space-y-6 sm:p-10">
    <form onSubmit = {submit}>
    <h1 className="lg-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    <text className = "p"> Username</text>
    <h2>
    <input type = "text" className = "w-full border-none focus:border-transparent focus:ring-transparent dark:bg-gray-900 dark:text-white sm:text-sm !outline-none" placeholder = "Username"
    onChange = {(event)=>setusername(event.target.value)}></input>
    </h2>
    <text className = "p">Password</text>
    <h3>
    <input type = "text" className = "w-full border-none focus:border-transparent focus:ring-transparent dark:bg-gray-900 dark:text-white sm:text-sm !outline-none" placeholder="Password"
    onChange = {(event)=>{setpassword(event.target.value)}}></input>
    </h3>
    <h4>
    <button className = "w-full px-6 py-3 mt-1 font-medium rounded-lg text-sm tracking-wide text-white transition-none bg-blue-500 hover:bg-blue-600 sm:mt-0 sm:w-auto sm:flex-shrink-0" 
    type = "submit">submit</button>
    </h4>
    </h1>
   </form>
   </body>
  )
}
export default SignIn


