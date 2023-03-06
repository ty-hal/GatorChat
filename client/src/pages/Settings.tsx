import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from 'react'
import { Dropdown } from "flowbite";

const Settings = () => 
{
  const [selectedImage, setSelectedImage] = useState<File>();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [conpassword, confirmpassword] = useState("");
  const[firstname,setfirstname] = useState("");
  const[lastname,setlastname] = useState("");
  const[major,setmajor] = useState("");

  const submit = (e: any) =>
   {
    e.preventDefault();
    if(conpassword!= password)
    {
      alert("passwords do not match!")
    }
    else
    {    
      console.log("First Name:" + firstname);
    console.log("Last Name:" + lastname);
    console.log("Username:" + username);
    console.log("Password:" + password);
    console.log("Major:" + major);
    }
    
    const login = {
      email: username,
      password: password
    }
  }

  return (
    <div className="Parent">
      <form onSubmit={submit}>

      {/* background */}
      <div className="h-screen py-8 bg-gray-50 dark:bg-gray-900">
        {/* main page (hopefully)*/}
        <div className="flex justify-center">
          {/* account settings header*/}
          <div className="font-bold leading-tight 
                tracking-tight text-gray-900 
               dark:text-white md:text-2xl">
            Account Settings
          </div>
        </div>
        {/* profile pic*/}
        <div className="Parent">
          <div>
            {/* label under "account settings" header */}
          <label className="my-0 font-bold leading-tight 
                tracking-tight text-gray-900 
               dark:text-white md:text-2xl flex justify-center "></label>
        {/* personal info*/}
            <div className="font-bold leading-tight 
                tracking-tight text-gray-900 
               dark:text-white md:text-2xl flex justify-center ">
              
              <div className="my-0">
              <label></label>
                {/*Firstname*/}
                <div className="my-5">
                <label className=""> First Name</label>
                <input type = "text" className="mr-20
                w-11/12 sm:w-full bg-gray-50 border 
                border-gray-300 text-gray-900 sm:text-sm 
                rounded-lg focus:ring-blue-600 focus:border-blue-600 
                focus:ring-1 focus:outline-none block p-2 dark:bg-gray-700 
                dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500" id="first-name" 
                placeholder="First Name"
                onChange={(event)=>{setfirstname(event.target.value)}}>
                </input>
              
                {/*Lastname*/}
                <div className="my-5">
                <label className="">Last Name</label>
                <input type = "text" className="mr-20
                w-11/12 sm:w-full bg-gray-50 border 
                border-gray-300 text-gray-900 sm:text-sm 
                rounded-lg focus:ring-blue-600 focus:border-blue-600 
                focus:ring-1 focus:outline-none block p-2 dark:bg-gray-700 
                dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500" id="last-name" 
                placeholder="Last Name"
                onChange={(event)=>{setlastname(event.target.value)}}>
                </input>
                </div>
                
                <div className="my-10">
                  <label></label>
                <div className="my-5">
                  {/*email*/}
                <label className=""> Email </label>
                <input type = "email" className="mr-20
                w-11/12 sm:w-full bg-gray-50 border 
                border-gray-300 text-gray-900 sm:text-sm 
                rounded-lg focus:ring-blue-600 focus:border-blue-600 
                focus:ring-1 focus:outline-none block p-2 dark:bg-gray-700 
                dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500" 
                id="email" 
                name ="email"
                placeholder="email@ufl.edu"
                pattern="[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@ufl\.edu"
                title="Must use a UF email address"
                onChange={(event) => setusername(event.target.value)}
                >
                </input>
                {/*new password*/}
                <label className=""> New Password </label>
                <input type = "password" 
                name="password"
                className="mr-20
                w-11/12 sm:w-full bg-gray-50 border 
                border-gray-300 text-gray-900 sm:text-sm 
                rounded-lg focus:ring-blue-600 focus:border-blue-600 
                focus:ring-1 focus:outline-none block p-2 dark:bg-gray-700 
                dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500" 
                id="password" 
                placeholder="••••••••"
                title="Must be at least 8 characters long and contain a number and uppercase letter"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                onChange={(event) => {
                  setpassword(event.target.value)}}>
                </input>
                {/*confirm new password*/}
                <label className=""> Confirm Password </label>
                <input type = "password" 
                name="confirm password"
                className="mr-20
                w-11/12 sm:w-full bg-gray-50 border 
                border-gray-300 text-gray-900 sm:text-sm 
                rounded-lg focus:ring-blue-600 focus:border-blue-600 
                focus:ring-1 focus:outline-none block p-2 dark:bg-gray-700 
                dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500" 
                id="confirm password" 
                placeholder="••••••••"
                title="Must be at least 8 characters long and contain a number and uppercase letter"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                onChange={(event) => {
                  confirmpassword(event.target.value)}}>
                </input>

                {/*major*/}
                <div>
                <label
                  htmlFor="major"
                  className="font-bold leading-tight 
                  tracking-tight text-gray-900 
                 dark:text-white md:text-2xl">
                  Major
                </label>
                <select
                  id="major"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-primary-500 focus:border-primary-500 block  p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focusring-primary-500 dark:focus:border-blue-500"
                  onChange={(event)=>{setmajor(event.target.value)}}>
                  <option value="" selected disabled>
                    Select a major
                  </option>
                  <option value="Accounting">Accounting</option>
                  <option value="Advertising">Advertising</option>
                  <option value="Advertising">Advertising</option>
                  <option value="Aerospace Engineering">
                    Aerospace Engineering
                  </option>
                  <option value="African Languages">African Languages</option>
                  <option value="African-American Studies">
                    African-American Studies
                  </option>
                  <option value="Agricultural Education and Communication">
                    Agricultural Education and Communication
                  </option>
                  <option value="Agricultural Operations Management">
                    Agricultural Operations Management
                  </option>
                  <option value="Animal Sciences">Animal Sciences</option>
                  <option value="Anthropology">Anthropology</option>
                  <option value="Applied Physiology and Kinesiology">
                    Applied Physiology and Kinesiology
                  </option>
                  <option value="Arabic">Arabic</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Art History">Art History</option>
                  <option value="Art">Art</option>
                  <option value="Astronomy and Astrophysics">
                    Astronomy and Astrophysics
                  </option>
                  <option value="Biological Engineering">
                    Biological Engineering
                  </option>
                  <option value="Biology">Biology</option>
                  <option value="Biomedical Engineering">
                    Biomedical Engineering
                  </option>
                  <option value="Botany">Botany</option>
                  <option value="Business Administration">
                    Business Administration
                  </option>
                  <option value="Chemical Engineering">
                    Chemical Engineering
                  </option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Classical Studies">Classical Studies</option>
                  <option value="Communication Sciences and Disorders">
                    Communication Sciences and Disorders
                  </option>
                  <option value="Computer Engineering">
                    Computer Engineering
                  </option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Construction Management">
                    Construction Management
                  </option>
                  <option value="Criminology">Criminology</option>
                  <option value="Dance">Dance</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Dietetics">Dietetics</option>
                  <option value="Digital Arts and Sciences">
                    Digital Arts and Sciences
                  </option>
                  <option value="Dual Languages">Dual Languages</option>
                  <option value="Economics">Economics</option>
                  <option value="Education Sciences">Education Sciences</option>
                  <option value="Electrical Engineering">
                    Electrical Engineering
                  </option>
                  <option value="Elementary Education">
                    Elementary Education
                  </option>
                  <option value="Engineering Studies">
                    Engineering Studies
                  </option>
                  <option value="English">English</option>
                  <option value="Entomology and Nematology">
                    Entomology and Nematology
                  </option>
                  <option value="Environmental Engineering">
                    Environmental Engineering
                  </option>
                  <option value="Environmental Management in Agriculture and Natural Resources">
                    Environmental Management in Agriculture and Natural
                    Resources
                  </option>
                  <option value="Environmental Science">
                    Environmental Science
                  </option>
                  <option value="Family, Youth and Community Sciences">
                    Family, Youth and Community Sciences
                  </option>
                  <option value="Finance">Finance</option>
                  <option value="Food and Resource Economics">
                    Food and Resource Economics
                  </option>
                  <option value="Food Science">Food Science</option>
                  <option value="Foreign Languages and Literatures">
                    Foreign Languages and Literatures
                  </option>
                  <option value="Forest Resources and Conservation">
                    Forest Resources and Conservation
                  </option>
                  <option value="French and Francophone Studies">
                    French and Francophone Studies
                  </option>
                  <option value="Geography">Geography</option>
                  <option value="Geology">Geology</option>
                  <option value="Geomatics">Geomatics</option>
                  <option value="German">German</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Health Education and Behavior">
                    Health Education and Behavior
                  </option>
                  <option value="Health Science">Health Science</option>
                  <option value="HebrewHispanic and Latin American Languages, Literatures and Linguistics">
                    HebrewHispanic and Latin American Languages, Literatures and
                    Linguistics
                  </option>
                  <option value="History">History</option>
                  <option value="Horticultural Science">
                    Horticultural Science
                  </option>
                  <option value="Industrial and Systems Engineering">
                    Industrial and Systems Engineering
                  </option>
                  <option value="Information Systems">
                    Information Systems
                  </option>
                  <option value="Interdisciplinary Studies">
                    Interdisciplinary Studies
                  </option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="International Studies">
                    International Studies
                  </option>
                  <option value="Italian">Italian</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Jewish Studies">Jewish Studies</option>
                  <option value="Journalism">Journalism</option>
                  <option value="Landscape Architecture">
                    Landscape Architecture
                  </option>
                  <option value="Linguistics">Linguistics</option>
                  <option value="Management">Management</option>
                  <option value="Marine Sciences">Marine Sciences</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Materials Science and Engineering">
                    Materials Science and Engineering
                  </option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Mechanical Engineering">
                    Mechanical Engineering
                  </option>
                  <option value="Media Production, Management, and Technology">
                    Media Production, Management, and Technology
                  </option>
                  <option value="Microbiology and Cell Science">
                    Microbiology and Cell Science
                  </option>
                  <option value="Music">Music</option>
                  <option value="Natural Resource Conservation">
                    Natural Resource Conservation
                  </option>
                  <option value="Nuclear Engineering">
                    Nuclear Engineering
                  </option>
                  <option value="Nursing">Nursing</option>
                  <option value="Nutritional Sciences">
                    Nutritional Sciences
                  </option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Philosophy">Philosophy</option>
                  <option value="Physics">Physics</option>
                  <option value="Plant Science">Plant Science</option>
                  <option value="Political Science">Political Science</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Public Health">Public Health</option>
                  <option value="Public Relations">Public Relations</option>
                  <option value="Religion">Religion</option>
                  <option value="Russian">Russian</option>
                  <option value="Sociology">Sociology</option>
                  <option value="Soil and Water Sciences">
                    Soil and Water Sciences
                  </option>
                  <option value="Spanish">Spanish</option>
                  <option value="Spanish and Portuguese">
                    Spanish and Portuguese
                  </option>
                  <option value="Sport Managemen">Sport Managemen</option>
                  <option value="Statistics">Statistics</option>
                  <option value="Sustainability and the Built Environment">
                    Sustainability and the Built Environment
                  </option>
                  <option value="Sustainability Studies">
                    Sustainability Studies
                  </option>
                  <option value="Theatre">Theatre</option>
                  <option value="Theatre Performance">
                    Theatre Performance
                  </option>
                  <option value="Theatre Production">Theatre Production</option>
                  <option value="Tourism, Hospitality and Event Management">
                    Tourism, Hospitality and Event Management
                  </option>
                  <option value="Wildlife Ecology and Conservation">
                    Wildlife Ecology and Conservation
                  </option>
                  <option value="Women's Studies">Women's Studies</option>
                  <option value="Zoology">Zoology</option>
                </select>
              </div>
                </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          {/*profile picture*/}
          <label className="font-bold leading-tight 
                tracking-tight text-gray-900 
               dark:text-white md:text-2xl  flex justify-center">
                Profile Picture
                <label
                  className="block mb-2 text-sm font-medium
                   text-gray-900 dark:text-white"
                  htmlFor="file_input">
                  {" "}
                  <span className="text-gray-500">(Optional)</span>
                </label>
                </label>
          <div className="font-bold leading-tight 
                tracking-tight text-gray-900 
               dark:text-white md:text-2xl  flex justify-center">
            <div>
                
                <div className="flex flex-box">
                  <input
                    className="block w-full text-sm text-gray-900 border
                     border-gray-300 rounded-lg cursor-pointer 
                     bg-gray-50 dark:text-gray-400 focus:outline-none 
                     dark:bg-gray-700 dark:border-gray-600 
                     dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    onChange={(event) => {
                      if (event.target.files !== null) {
                        setSelectedImage(event.target.files[0]);
                      }
                    }}/>
                  {selectedImage && (
                    <div
                      className="text-gray-200 pt-0.5 text-sm text-center
                       border border-gray-300 rounded-lg rounded-l-sm px-1
                        cursor-pointer dark:border-gray-600 dark:placeholder-gray-400 bg-red-600 -ml-2"
                      onClick={() => {
                        console.log(selectedImage);
                        setSelectedImage(undefined);
                      }}>
                      Remove
                    </div>
                  )}
                </div>
                {selectedImage && (
                  <div>
                    <img
                      alt="image"
                      className="w-40 h-40 rounded-full mt-4 flex justify-center ml-20"
                      src={URL.createObjectURL(selectedImage)}/>
                  </div>
                )}
              </div>
          </div>
          <div className="flex justify-center my-5">
          <button
                type="submit"
                className="w-20 text-white 
                bg-blue-600 hover:bg-blue-700 
                focus:ring-4 focus:outline-none 
                focus:ring-blue-300 font-medium 
                rounded-lg text-sm px-10 py-2.5
                text-center dark:bg-blue-600 
                dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center" 
                id = "submit"
              >
                Submit
              </button>
          </div>
          </div>
        </div>
        </form>
      </div>

 
  )
}
export default Settings


