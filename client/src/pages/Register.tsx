import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState<File>();

  useEffect(() => {
    console.log(password, confirmPassword);
    const elem_confirmPassword = document.getElementById("confirm-password");
    if (elem_confirmPassword !== null) {
      if (confirmPassword === "") {
        elem_confirmPassword.classList.add("dark:text-white");
        elem_confirmPassword.classList.add("dark:focus:ring-blue-500");
        elem_confirmPassword.classList.add("dark:focus:border-blue-500");
        elem_confirmPassword.classList.add("focus:ring-blue-600");
        elem_confirmPassword.classList.add("focus:border-blue-600");

        elem_confirmPassword.classList.remove("dark:text-red-500");
        elem_confirmPassword.classList.remove("dark:focus:border-red-600");
        elem_confirmPassword.classList.remove("dark:focus:border-red-600");
      } else if (password !== confirmPassword) {
        elem_confirmPassword.classList.remove("dark:text-white");
        elem_confirmPassword.classList.remove("dark:focus:ring-blue-500");
        elem_confirmPassword.classList.remove("dark:focus:border-blue-500");
        elem_confirmPassword.classList.remove("focus:ring-blue-600");
        elem_confirmPassword.classList.remove("focus:border-blue-600");

        elem_confirmPassword.classList.add("dark:text-red-500");
        elem_confirmPassword.classList.add("dark:focus:border-red-600");
        elem_confirmPassword.classList.add("dark:focus:border-red-600");
      } else if (password === confirmPassword) {
        elem_confirmPassword.classList.add("dark:text-white");
        elem_confirmPassword.classList.add("dark:focus:ring-blue-500");
        elem_confirmPassword.classList.add("dark:focus:border-blue-500");
        elem_confirmPassword.classList.add("focus:ring-blue-600");
        elem_confirmPassword.classList.add("focus:border-blue-600");

        elem_confirmPassword.classList.remove("dark:text-red-500");
        elem_confirmPassword.classList.remove("dark:focus:border-red-600");
        elem_confirmPassword.classList.remove("dark:focus:border-red-600");
      }
    }
  }, [confirmPassword]);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit form");
  };

  return (
    <section className="h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="sm:max-w-md w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-3" onSubmit={submitForm}>
              {/* Name  */}
              <div className="flex flex-box justify-between">
                {/* First Name  */}
                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="first-name"
                    className="w-11/12 sm:w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 focus:ring-1 focus:outline-none block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    pattern="[a-zA-Z .'*_`~-]+"
                    required
                  />
                </div>
                {/* Last Name  */}
                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="last-name"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 focus:ring-1 focus:outline-none block w p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    pattern="[a-zA-Z .'*_`~-]+"
                    required
                  />
                </div>
              </div>
              {/* Email  */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  UFL Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 focus:ring-1 focus:outline-none block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="email@ufl.edu"
                  pattern="[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@ufl\.edu"
                  title="Must use a UF email address"
                  required
                />
              </div>
              {/* Major  */}
              <div>
                <label
                  htmlFor="major"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Major
                </label>
                <select
                  id="major"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-primary-500 focus:border-primary-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-primary-500 dark:focus:border-blue-500"
                  required
                >
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
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 focus:ring-1 focus:outline-none block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be at least 8 characters long and contain a number and uppercase letter"
                  required
                  onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    setPassword((e.target as HTMLInputElement).value);
                  }}
                />
              </div>
              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 focus:ring-1 focus:outline-none block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be at least 8 characters long and contain a number and uppercase letter"
                  required
                  onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    setConfirmPassword((e.target as HTMLInputElement).value);
                  }}
                />
              </div>
              {/* Profile Picture */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Profile picture{" "}
                  <span className="text-gray-500">(Optional)</span>
                </label>
                <div className="flex flex-box">
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    onChange={(event) => {
                      if (event.target.files !== null) {
                        setSelectedImage(event.target.files[0]);
                      }
                    }}
                  />
                  {selectedImage && (
                    <div
                      className="text-gray-200 pt-0.5 text-sm text-center border border-gray-300 rounded-lg rounded-l-sm px-1 cursor-pointer dark:border-gray-600 dark:placeholder-gray-400 bg-red-600 -ml-2"
                      onClick={() => {
                        console.log(selectedImage);
                        setSelectedImage(undefined);
                      }}
                    >
                      Remove
                    </div>
                  )}
                </div>
                {selectedImage && (
                  <div>
                    <img
                      alt="image"
                      className="w-40 h-40 rounded-full mt-4"
                      src={URL.createObjectURL(selectedImage)}
                    />
                  </div>
                )}
              </div>

              {/* Terms and Conditions  */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <Link
                      to="/terms-and-conditions"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      target="_blank"
                    >
                      {" "}
                      <span className="mr-4"> Terms and Conditions</span>
                    </Link>
                  </label>
                </div>
              </div>
              {/* Submit Button  */}
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create an account
              </button>
              {/* Sign in Here  */}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  {" "}
                  <span className="mr-4">Sign in here</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
