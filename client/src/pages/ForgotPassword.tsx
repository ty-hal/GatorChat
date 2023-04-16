import { event } from "cypress/types/jquery";
import { toInteger } from "cypress/types/lodash";
import { useState, useEffect } from "react";
import { userIDAtom } from "../App";
import { useAtom } from "jotai";
import { useAtomValue } from "jotai";
interface resetpassword {
  email: string;
  message: string;
}
const ForgotPassword = () => 
{
  //const [code, setname] = useState("");
  const [email, setemail] = useState("");
  const [link, setcomment] = useState("");
  const [code,setcode] = useState("");
  //const [gencode, generatecode] = useState("");
  const [usercode, setusercode] = useState("");
  const [password, setpassword] = useState("");
  const [userid, setuserid] = useAtom(userIDAtom);
 // const activeUserID = useAtomValue(userIDAtom);
  const submitForm = (e: React.FormEvent) => 
  {
    e.preventDefault();
    const reset:resetpassword = 
    {
      email: email,
      message: "your code is: "+ code
    }
    /*checks email */
    fetch(`http://localhost:9000/api/user/verify?email=${email}`,
      {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => {
      if (response.status == 200) 
      {
        fetch("http://localhost:9000/api/contact", 
        {
          method: "POST",
          headers: {
          "content-type": "application/json",
        },
          body: JSON.stringify(reset),
          })
        return response.json()
      }
      alert("User Not Found")
    }).then((data) => {
      if (data) {
        //console.log(data.user_id);
        setuserid(data.user_id);
        console.log("User Found")
      }
    })
  };
  /*checks code */
  const checkcode = ()=>
  {
    if(usercode != code)
    {
      alert("Incorrect code entered!");
    }
    else
    {
      fetch(`http://localhost:9000/api/user/${userid}/updatepassword`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      }, body: JSON.stringify({ Password: password })}
      )
      .then((response)=>
      {
        if(response.status == 200)
        {
          alert("password successfully changed!")
        }
        else
        {
          alert("password change was unsuccessful. Please contact support.")

        }
      }
      )
    };
      
    
  }
    
  

 

  return (
    <div className="h-screen bg-gray-50 py-16 dark:bg-gray-900 md:py-8">
      <div className="mx-auto w-full space-y-4 rounded-lg border-2 bg-white p-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md  sm:p-8 md:space-y-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          Forgot your password?
        </h1>
        <form className="space-y-4 md:space-y-3" onSubmit={submitForm}>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your UF email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            placeholder="email@ufl.edu"
            required
            pattern="[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@ufl\.edu"
            onChange={(event)=>{setemail(event.target.value)}}
          />
          <button
            type="submit"
            className=" w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            id = "send"
            onClick={ (event)=>{setcode(Math.floor((Math.random()*1000000)).toString())}}
            >
            Send email
          </button>
          </form>
          {/*code checker*/}
          <input
            name="code"
            id="codeinput"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            placeholder="enter code here"
            onChange={(event)=>{setusercode(event.target.value)}}
          />
            <input
                type="password"
                name="password"
                className="
                block w-11/12 rounded-lg border 
                border-gray-300 bg-gray-50 p-2 
                text-gray-900 focus:border-blue-600 focus:outline-none 
                focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                dark:placeholder-gray-400 dark:focus:border-blue-500 
                dark:focus:ring-blue-500 sm:w-full  
                sm:text-sm"
                id="password"
                placeholder="••••••••"
                title="Must be at least 8 characters long and contain a number and uppercase letter"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required
                onChange={(event) => {
                  setpassword(event.target.value);
                }}
              ></input>
           <button
          type = "button"
            className=" w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            id = "check"
            onClick={(event)=>checkcode()}
          >
            Reset Password
            </button>

      </div>
    </div>
  );
};

export default ForgotPassword;
