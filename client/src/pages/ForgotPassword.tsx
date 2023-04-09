import { useState, useEffect } from "react";
interface resetpassword {
  email: string;
  message: string;
}
const ForgotPassword = () => 
{
  //const [code, setname] = useState("");
  const [email, setemail] = useState("");
  const [link, setcomment] = useState("");
  const submitForm = (e: React.FormEvent) => 
  {
    e.preventDefault();
    fetch(`http://localhost:9000/api/user/verify?email=${email}`,
      {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => {
      if (response.status == 200) {
        return response.json()
      }

      alert("User Not Found")
    }).then((data) => {
      if (data) {
        console.log("User Found")
      }
    })
    
    };

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
            onClick={(event)=>setcomment("your code to reset your password is: xxxtyz")}
            //onSubmit={}
          >
            Send email
          </button>
          {/* get email
            get user id
            make sure user exists in database by checking email
            user exists and now we can create a one time link
            */}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
