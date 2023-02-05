import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfilePicture from "../components/ProfilePicture";

interface userRegistration {
  first_name: String;
  last_name: String;
  email: String;
  major: String;
  password: String;
  profile_picture?: String;
}

const Register = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(false);
  const [profilePicture, setProfilePicture] = useState({
    file: "",
  });
  let navigate = useNavigate();

  const convertImageToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const base64 = (await convertImageToBase64(file)) as string;
      setProfilePicture({ ...profilePicture, file: base64 });
    }
  };

  useEffect(() => {
    const elem_confirmPassword = document.getElementById("confirm-password");
    if (elem_confirmPassword !== null) {
      if (confirmPassword === "") {
        elem_confirmPassword.classList.add("dark:text-white");
        elem_confirmPassword.classList.add("focus:ring-blue-500");
        elem_confirmPassword.classList.add("focus:border-blue-500");
        elem_confirmPassword.classList.add("focus:ring-blue-600");
        elem_confirmPassword.classList.add("focus:border-blue-600");
        elem_confirmPassword.classList.remove("text-red-500");
        elem_confirmPassword.classList.remove("focus:border-red-600");
      } else if (password !== confirmPassword) {
        elem_confirmPassword.classList.remove("dark:text-white");
        elem_confirmPassword.classList.remove("focus:ring-blue-500");
        elem_confirmPassword.classList.remove("focus:border-blue-500");
        elem_confirmPassword.classList.remove("dark:focus:ring-blue-600");
        elem_confirmPassword.classList.remove("dark:focus:border-blue-600");

        elem_confirmPassword.classList.add("text-red-500");
        elem_confirmPassword.classList.add("focus:border-red-600");
        elem_confirmPassword.classList.add("focus:border-red-600");
      } else if (password === confirmPassword) {
        elem_confirmPassword.classList.add("dark:text-white");
        elem_confirmPassword.classList.add("focus:ring-blue-500");
        elem_confirmPassword.classList.add("focus:border-blue-500");
        elem_confirmPassword.classList.add("focus:ring-blue-600");
        elem_confirmPassword.classList.add("focus:border-blue-600");

        elem_confirmPassword.classList.remove("text-red-500");
        elem_confirmPassword.classList.remove("focus:border-red-600");
        elem_confirmPassword.classList.remove("focus:border-red-600");
      }
    }
  }, [confirmPassword]);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const registration: userRegistration = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      major: major,
      password: password,
      profile_picture: profilePicture.file,
    };

    console.log(registration);

    // Backend API call here to see if user a) has a valid email address, and b) has a valid login
    // fetch("http://localhost:9000/api/user/signin", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(login),
    // })
    //   .then((response) => {
    //     // User signed in
    //     if (response.status === 200) {
    //       setInvalidPassword(false);
    //       setInvalidEmail(false);
    //       console.log("User signed in");
    //       navigate("/"); // Navigate to home page
    //       return response.json();
    //     }

    //     // User not found (no account with this email address)
    //     else if (response.status === 404) {
    //       setInvalidEmail(true);
    //       setInvalidPassword(false);
    //       console.log("User not found");
    //     }

    //     // Invalid Password
    //     else if (response.status === 401) {
    //       setInvalidPassword(true);
    //       setInvalidEmail(false);
    //       console.log("Invalid password");
    //     }
    //   })
    //   .then((data) => console.log(data));
    // navigate("/"); // Navigate to home page
  };

  return (
    <section className="bg-gray-50 py-8 pb-32  dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-3" onSubmit={submitForm}>
              {/* Name  */}
              <div className="flex-box flex justify-between">
                {/* First Name  */}
                <div>
                  <label
                    htmlFor="text"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="first-name"
                    className="block w-11/12 rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:w-full sm:text-sm"
                    placeholder="John"
                    pattern="[a-zA-Z .'*_`~-]+"
                    required
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      setFirstName((e.target as HTMLInputElement).value);
                    }}
                  />
                </div>
                {/* Last Name  */}
                <div>
                  <label
                    htmlFor="text"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="last-name"
                    className="w block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="Doe"
                    pattern="[a-zA-Z .'*_`~-]+"
                    required
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      setLastName((e.target as HTMLInputElement).value);
                    }}
                  />
                </div>
              </div>
              {/* Email  */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  UFL Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="email@ufl.edu"
                  pattern="[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@ufl\.edu"
                  title="Must use a UF email address"
                  required
                  onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    setEmail((e.target as HTMLInputElement).value);
                  }}
                />
              </div>
              {/* Major  */}
              <div>
                <label
                  htmlFor="major"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Major
                </label>
                <select
                  id="major"
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
                  required
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setMajor(e.target.value);
                  }}
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
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
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
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
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
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Profile picture{" "}
                  <span className="text-gray-500">(Optional)</span>
                </label>
                <div className="flex-box flex">
                  <input
                    className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                    id="profile_picture"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      if (event.target.files !== null) {
                        handleImageUpload(event);
                        setSelectedImage(true);
                      }
                    }}
                  />
                  {selectedImage && (
                    <div
                      className="-ml-2 flex cursor-pointer  items-center justify-center rounded-lg rounded-l-sm border border-gray-300 bg-red-600  px-1 pt-0.5 text-center align-baseline text-sm text-gray-200 dark:border-gray-600 dark:placeholder-gray-400"
                      onClick={() => {
                        setSelectedImage(false);
                        setProfilePicture({ ...profilePicture, file: "" });
                      }}
                    >
                      Remove
                    </div>
                  )}
                </div>
                {/* Show profile picture if one is inputted */}
                {selectedImage && (
                  <ProfilePicture
                    image={profilePicture}
                    class="mt-4 h-40 w-40 rounded-full"
                  />
                )}
              </div>

              {/* Terms and Conditions  */}
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
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
                disabled={
                  first_name &&
                  last_name &&
                  email &&
                  major &&
                  password === confirmPassword
                    ? false
                    : true
                }
                className={
                  first_name &&
                  last_name &&
                  email &&
                  major &&
                  password === confirmPassword
                    ? "w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    : "w-full cursor-auto rounded-lg bg-gray-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600  dark:focus:ring-blue-800"
                }
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
