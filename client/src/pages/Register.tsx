import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfilePicture from "../components/ProfilePicture";
import Select from "react-tailwindcss-select";

type userRegistration = {
  first_name: String;
  last_name: String;
  email: String;
  majors: String[];
  password: String;
  profile_pic?: String;
};
type storeageUserRegistration = {
  first_name: String;
  last_name: String;
  email: String;
  majors: majorObj[];
  password: String;
  confirm_password: String;
};
type majorObj = {
  disabled: boolean;
  label: string;
  value: string;
};

let majorOptions = [
  { value: "Accounting", label: "Accounting" },
  { value: "Advertising", label: "Advertising" },
  { value: "Aerospace Engineering", label: "Aerospace Engineering" },
  { value: "African Languages", label: "African Languages" },
  { value: "African-American Studies", label: "African-American Studies" },
  {
    value: "Agricultural Education and Communication",
    label: "Agricultural Education and Communication",
  },
  {
    value: "Agricultural Operations Management",
    label: "Agricultural Operations Management",
  },
  { value: "Animal Sciences", label: "Animal Sciences" },
  { value: "Anthropology", label: "Anthropology" },
  {
    value: "Applied Physiology and Kinesiology",
    label: "Applied Physiology and Kinesiology",
  },
  { value: "Arabic", label: "Arabic" },
  { value: "Architecture", label: "Architecture" },
  { value: "Art History", label: "Art History" },
  { value: "Art", label: "Art" },
  { value: "Astronomy and Astrophysics", label: "Astronomy and Astrophysics" },
  { value: "Biological Engineering", label: "Biological Engineering" },
  { value: "Biology", label: "Biology" },
  { value: "Biomedical Engineering", label: "Biomedical Engineering" },
  { value: "Botany", label: "Botany" },
  { value: "Business Administration", label: "Business Administration" },
  { value: "Chemical Engineering", label: "Chemical Engineering" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Chinese", label: "Chinese" },
  { value: "Civil Engineering", label: "Civil Engineering" },
  { value: "Classical Studies", label: "Classical Studies" },
  {
    value: "Communication Sciences and Disorders",
    label: "Communication Sciences and Disorders",
  },
  { value: "Computer Engineering", label: "Computer Engineering" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Construction Management", label: "Construction Management" },
  { value: "Criminology", label: "Criminology" },
  { value: "Dance", label: "Dance" },
  { value: "Data Science", label: "Data Science" },
  { value: "Dietetics", label: "Dietetics" },
  { value: "Digital Arts and Sciences", label: "Digital Arts and Sciences" },
  { value: "Dual Languages", label: "Dual Languages" },
  { value: "Economics", label: "Economics" },
  { value: "Education Sciences", label: "Education Sciences" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  { value: "Elementary Education", label: "Elementary Education" },
  { value: "Engineering Studies", label: "Engineering Studies" },
  { value: "English", label: "English" },
  { value: "Entomology and Nematology", label: "Entomology and Nematology" },
  { value: "Environmental Engineering", label: "Environmental Engineering" },
  {
    value: "Environmental Management in Agriculture and Natural Resources",
    label: "Environmental Management in Agriculture and Natural Resources",
  },
  { value: "Environmental Science", label: "Environmental Science" },
  {
    value: "Family, Youth and Community Sciences",
    label: "Family, Youth and Community Sciences",
  },
  { value: "Finance", label: "Finance" },
  {
    value: "Food and Resource Economics",
    label: "Food and Resource Economics",
  },
  { value: "Food Science", label: "Food Science" },
  {
    value: "Foreign Languages and Literatures",
    label: "Foreign Languages and Literatures",
  },
  {
    value: "Forest Resources and Conservation",
    label: "Forest Resources and Conservation",
  },
  {
    value: "French and Francophone Studies",
    label: "French and Francophone Studies",
  },
  { value: "Geography", label: "Geography" },
  { value: "Geology", label: "Geology" },
  { value: "Geomatics", label: "Geomatics" },
  { value: "German", label: "German" },
  { value: "Graphic Design", label: "Graphic Design" },
  {
    value: "Health Education and Behavior",
    label: "Health Education and Behavior",
  },
  { value: "Health Science", label: "Health Science" },
  {
    value:
      "HebrewHispanic and Latin American Languages, Literatures and Linguistics",
    label:
      "HebrewHispanic and Latin American Languages, Literatures and Linguistics",
  },
  { value: "History", label: "History" },
  { value: "Horticultural Science", label: "Horticultural Science" },
  {
    value: "Industrial and Systems Engineering",
    label: "Industrial and Systems Engineering",
  },
  { value: "Information Systems", label: "Information Systems" },
  { value: "Interdisciplinary Studies", label: "Interdisciplinary Studies" },
  { value: "Interior Design", label: "Interior Design" },
  { value: "International Studies", label: "International Studies" },
  { value: "Italian", label: "Italian" },
  { value: "Japanese", label: "Japanese" },
  { value: "Jewish Studies", label: "Jewish Studies" },
  { value: "Journalism", label: "Journalism" },
  { value: "Landscape Architecture", label: "Landscape Architecture" },
  { value: "Linguistics", label: "Linguistics" },
  { value: "Management", label: "Management" },
  { value: "Marine Sciences", label: "Marine Sciences" },
  { value: "Marketing", label: "Marketing" },
  {
    value: "Materials Science and Engineering",
    label: "Materials Science and Engineering",
  },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  {
    value: "Media Production, Management, and Technology",
    label: "Media Production, Management, and Technology",
  },
  {
    value: "Microbiology and Cell Science",
    label: "Microbiology and Cell Science",
  },
  { value: "Music", label: "Music" },
  {
    value: "Natural Resource Conservation",
    label: "Natural Resource Conservation",
  },
  { value: "Nuclear Engineering", label: "Nuclear Engineering" },
  { value: "Nursing", label: "Nursing" },
  { value: "Nutritional Sciences", label: "Nutritional Sciences" },
  { value: "Pharmacy", label: "Pharmacy" },
  { value: "Philosophy", label: "Philosophy" },
  { value: "Physics", label: "Physics" },
  { value: "Plant Science", label: "Plant Science" },
  { value: "Political Science", label: "Political Science" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Psychology", label: "Psychology" },
  { value: "Public Health", label: "Public Health" },
  { value: "Public Relations", label: "Public Relations" },
  { value: "Religion", label: "Religion" },
  { value: "Russian", label: "Russian" },
  { value: "Sociology", label: "Sociology" },
  { value: "Soil and Water Sciences", label: "Soil and Water Sciences" },
  { value: "Spanish", label: "Spanish" },
  { value: "Spanish and Portuguese", label: "Spanish and Portuguese" },
  { value: "Sport Managemen", label: "Sport Managemen" },
  { value: "Statistics", label: "Statistics" },
  {
    value: "Sustainability and the Built Environment",
    label: "Sustainability and the Built Environment",
  },
  { value: "Sustainability Studies", label: "Sustainability Studies" },
  { value: "Theatre", label: "Theatre" },
  { value: "Theatre Performance", label: "Theatre Performance" },
  { value: "Theatre Production", label: "Theatre Production" },
  {
    value: "Tourism, Hospitality and Event Management",
    label: "Tourism, Hospitality and Event Management",
  },
  {
    value: "Wildlife Ecology and Conservation",
    label: "Wildlife Ecology and Conservation",
  },
  { value: "Women's Studies", label: "Women's Studies" },
  { value: "Zoology", label: "Zoology" },
];

const Register = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [majorsValue, setMajorsValue] = useState<majorObj[]>([]);
  const [majors, setMajors] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(false);
  const [profilePicture, setProfilePicture] = useState({
    file: "",
  });

  const [registrationInfo, setRegistrationInfo] =
    useState<storeageUserRegistration>({
      first_name: "",
      last_name: "",
      email: "",
      majors: [],
      password: "",
      confirm_password: "",
    });

  const [userExists, setUserExists] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);
  const [errorOccurred, setErrorOccured] = useState(false);

  useEffect(() => {
    setRegistrationInfo({
      ...registrationInfo,
      majors: majorsValue,
    });
  }, [majors]);
  useEffect(() => {
    try {
      let registrationInformation = JSON.parse(
        sessionStorage.getItem("registration-information") || ""
      );
      console.log(registrationInformation);
      setRegistrationInfo(registrationInformation);
      document
        ?.getElementById("first-name")
        ?.setAttribute("value", registrationInformation.first_name);
      setFirstName(registrationInformation.first_name);
      document
        ?.getElementById("last-name")
        ?.setAttribute("value", registrationInformation.last_name);
      setLastName(registrationInformation.last_name);

      document
        ?.getElementById("email")
        ?.setAttribute("value", registrationInformation.email);
      setEmail(registrationInformation.email);
      if (registrationInformation.majors) {
        // if (registrationInformation.majors.length > 0) {
        //   setMajorsValue(registrationInformation.majors);
        // }
        handleMajorChange(registrationInformation.majors);
      } else {
        setMajorsValue([]);
      }
      document
        ?.getElementById("password")
        ?.setAttribute("value", registrationInformation.password);
      setPassword(registrationInformation.password);

      document
        ?.getElementById("confirm-password")
        ?.setAttribute("value", registrationInformation.confirm_password);
      setConfirmPassword(registrationInformation.confirm_password);
    } catch {
      return;
    }
  }, []);
  useEffect(() => {
    if (
      registrationInfo.first_name !== "" ||
      registrationInfo.last_name !== "" ||
      registrationInfo.email !== "" ||
      registrationInfo.majors ||
      registrationInfo.password !== "" ||
      registrationInfo.confirm_password !== ""
    ) {
      sessionStorage.setItem(
        "registration-information",
        JSON.stringify(registrationInfo)
      );
    }
  }, [registrationInfo]);
  useEffect(() => {
    const elem_confirmPassword = document.getElementById("confirm-password");
    if (elem_confirmPassword !== null) {
      if (confirmPassword === "") {
        elem_confirmPassword.className =
          "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm";
      } else if (password !== confirmPassword) {
        elem_confirmPassword.className =
          "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-red-500  focus:outline-none focus:ring-1 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400  focus:border-red-600  dark:focus:border-red-600 dark:focus:ring-red-600 focus:ring-red-600 sm:text-sm";
      } else if (password === confirmPassword) {
        elem_confirmPassword.className =
          "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm";
      }
    }
  }, [confirmPassword, password]);

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
  const handleMajorChange = (value: any) => {
    setMajorsValue(value);
    if (value) {
      let tempMajors = value.map((item: majorObj) => {
        return item["value"];
      });
      setMajors(tempMajors);
    } else {
      setMajors([]);
    }
  };
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const registration: userRegistration = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      majors: majors,
      password: password,
      profile_pic: profilePicture.file,
    };

    fetch("http://localhost:9000/api/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(registration),
    })
      .then((response) => {
        // User created
        if (response.status === 200) {
          setUserExists(false);
          setInvalidForm(false);
          setErrorOccured(false);
          navigate("/sign-in"); // Navigate to sign in page
          return response.json();
        }

        // Missing Form Requirements
        else if (response.status === 400) {
          setInvalidForm(true);
          console.log("Invalid Form");
        }

        // User already created (exisiting email)
        else if (response.status === 409) {
          setUserExists(true);
          console.log("User Email Already Exists. Please Sign In");
        }

        // Password hashing error
        else if (response.status === 404) {
          setErrorOccured(true);
          console.log("Error Occurred. Please try again");
        }
      })
      .then((data) => (data ? console.log("User Created") : console.log(data)));
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
                <div className="sm:w-2/5">
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
                      setRegistrationInfo({
                        ...registrationInfo,
                        first_name: (e.target as HTMLInputElement).value,
                      });
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
                      setRegistrationInfo({
                        ...registrationInfo,
                        last_name: (e.target as HTMLInputElement).value,
                      });
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
                    setRegistrationInfo({
                      ...registrationInfo,
                      email: (e.target as HTMLInputElement).value,
                    });
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
                <div id="majors-select">
                  <Select
                    primaryColor={"indigo"}
                    value={majorsValue}
                    isMultiple={true}
                    isSearchable={true}
                    noOptionsMessage={"No majors found"}
                    placeholder={"Select major(s)..."}
                    classNames={{
                      menuButton: ({ isDisabled }) =>
                        `rounded-lg flex text-sm text-gray-900 dark:text-gray-400 border border-gray-300 dark:border-gray-600  focus:outline-none bg-gray-50 dark:bg-gray-700 ${
                          isDisabled
                            ? ""
                            : "focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        }`,
                      menu: "absolute z-10 w-full bg-gray-50 dark:bg-gray-700 border rounded-lg py-1 mt-1.5 text-sm text-gray-900",
                      listItem: ({ isSelected }) =>
                        `block p-2 cursor-pointer select-none truncate rounded text-gray-900 dark:text-white ${
                          isSelected
                            ? ``
                            : `hover:bg-blue-200 dark:hover:bg-blue-500 hover:text-gray-900`
                        }`,
                    }}
                    onChange={handleMajorChange}
                    options={majorOptions}
                  />
                </div>
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
                    setRegistrationInfo({
                      ...registrationInfo,
                      password: (e.target as HTMLInputElement).value,
                    });
                  }}
                />
              </div>
              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
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
                    setRegistrationInfo({
                      ...registrationInfo,
                      confirm_password: (e.target as HTMLInputElement).value,
                    });
                  }}
                />
              </div>
              {/* Profile Picture */}
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Profile Picture{" "}
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
                    className="mt-4 h-40 w-40 rounded-full"
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
              {/* Error Handling */}
              {userExists && (
                <span className="mt-1 ml-1 flex items-center text-sm font-medium tracking-wide text-red-500">
                  User Already Exists. Please Sign In.
                </span>
              )}
              {invalidForm && (
                <span className="mt-1 ml-1 flex items-center text-sm font-medium tracking-wide text-red-500">
                  Please Fill Out Required Sections.
                </span>
              )}
              {errorOccurred && (
                <span className="mt-1 ml-1 flex items-center text-sm font-medium tracking-wide text-red-500">
                  Error Occurred. Please Try Again.
                </span>
              )}
              {/* Submit Button  */}
              <button
                type="submit"
                id="create-an-account"
                disabled={
                  password && password === confirmPassword ? false : true
                }
                className={
                  new RegExp(/[a-zA-Z .'*_`~-]+/).test(first_name) &&
                  new RegExp(/[a-zA-Z .'*_`~-]+/).test(last_name) &&
                  new RegExp(/[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@ufl\.edu/).test(
                    email
                  ) &&
                  majors.length > 0 &&
                  password &&
                  password === confirmPassword
                    ? "w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    : "w-full cursor-auto rounded-lg bg-gray-500 px-5 py-2.5 text-center text-sm font-medium text-white"
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
