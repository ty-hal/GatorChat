import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userIDAtom } from "../App";

import Select from "react-tailwindcss-select";
import ProfilePicture from "../components/ProfilePicture";
import DeleteAccountPopup from "../components/Popups/DeleteAccountPopup";

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

const Settings = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userID, setUserID] = useAtom(userIDAtom);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);
  const [majorsValue, setMajorsValue] = useState<majorObj[]>([]);
  const [majors, setMajors] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState(false);
  const [profilePicture, setProfilePicture] = useState<any>({
    file: "",
  });
  const navigate = useNavigate();

  const submitChanges = (e: any) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      return;
    }

    console.log("First Name:" + firstName);
    console.log("Last Name:" + lastName);
    console.log("Username:" + email);
    console.log("Password:" + password);
    console.log("Major(s):" + majors);
    console.log("Userid:" + userID);
    console.log("ProfilePicture:" + profilePicture.file);
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
  const fetchUserMajors = () => {
    fetch(`http://localhost:9000/api/user/${userID}/majors`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.map(
          (major: { major_id: number; major_name: string }) => ({
            disabled: false,
            label: major.major_name,
            value: major.major_name.toString(),
          })
        );
        setMajorsValue(transformedData);
        setMajors(
          data.map((major: { major_id: number; major_name: string }) =>
            major.major_name.toString()
          )
        );
      });
  };
  useEffect(() => {
    if (userID === 0) navigate(-1);
    // GET and SET the user who posted the thread's profile picture and email
    if (userID !== null && userID > 0) {
      fetch(`http://localhost:9000/api/user/${userID}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setEmail(data.email);
          if (data.profile_pic) {
            setProfilePicture(data.profile_pic);
          } else {
            setProfilePicture("");
          }
          setSelectedImage(true);
        });
      fetchUserMajors();
    } else if (userID !== null) {
      setProfilePicture("");
      setSelectedImage(true);
      fetchUserMajors();
    }
  }, [userID]);
  useEffect(() => {
    const elem_confirmPassword = document.getElementById("confirm-password");
    if (elem_confirmPassword !== null) {
      if (confirmPassword === "") {
        elem_confirmPassword.className =
          "block w-11/12 sm:w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm";
      } else if (password !== confirmPassword) {
        elem_confirmPassword.className =
          "block w-11/12 sm:w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-red-500  focus:outline-none focus:ring-1 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400  focus:border-red-600  dark:focus:border-red-600 dark:focus:ring-red-600 focus:ring-red-600 sm:text-sm";
      } else if (password === confirmPassword) {
        elem_confirmPassword.className =
          "block w-11/12 sm:w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm";
      }
    }
  }, [confirmPassword, password]);

  return (
    <div className="min-h-screen w-full bg-gray-50 py-8 dark:bg-gray-900">
      <form
        onSubmit={submitChanges}
        className="mx-auto w-full rounded-lg bg-white p-6 pb-0 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:w-3/4 sm:p-8 sm:pb-0 md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3"
      >
        {/* User Info */}
        <div className="mx-auto w-full sm:max-w-md">
          {/* Account Settings Header*/}
          <div
            className="mb-4 text-2xl font-bold  
               text-gray-900 dark:text-white"
          >
            Account settings
          </div>
          {/* Personal Info */}
          <div className="space-y-3 text-sm font-medium text-gray-900 dark:text-white sm:text-base">
            {/* First Name */}
            <div>
              <label className="mb-2 block"> First Name</label>
              <input
                type="text"
                className="
                block w-11/12 rounded-lg border 
                border-gray-300 bg-gray-50 p-2 
                text-gray-900 focus:border-blue-600 focus:outline-none 
                focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                dark:placeholder-gray-400 dark:focus:border-blue-500 
                dark:focus:ring-blue-500 sm:w-full  
                sm:text-sm"
                id="first-name"
                placeholder="John"
                pattern="[a-zA-Z .'*_`~-]+"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              ></input>
            </div>
            {/* Last Name*/}
            <div>
              <label className="mb-2 block">Last Name</label>
              <input
                type="text"
                className="
                block w-11/12 rounded-lg border 
                border-gray-300 bg-gray-50 p-2 
                text-gray-900 focus:border-blue-600 focus:outline-none 
                focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                dark:placeholder-gray-400 dark:focus:border-blue-500 
                dark:focus:ring-blue-500 sm:w-full 
                sm:text-sm"
                id="last-name"
                placeholder="Doe"
                pattern="[a-zA-Z .'*_`~-]+"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              ></input>
            </div>
            {/* Email */}
            <div>
              <label className="mb-2 block"> Email </label>
              <input
                type="email"
                className="
                block w-11/12 rounded-lg border 
                border-gray-300 bg-gray-50 p-2 
                text-sm text-gray-900 focus:border-blue-600 
                focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 
                dark:text-white dark:placeholder-gray-400 
                dark:focus:border-blue-500 dark:focus:ring-blue-500 
                sm:w-full"
                id="email"
                name="email"
                placeholder="email@ufl.edu"
                value={email}
                pattern="[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@ufl\.edu"
                title="Email cannot be changed"
                // onClick={() =>
                //   alert("Contact support if you need to change your email")
                // }
                // readOnly
                disabled
              ></input>
            </div>
            {/* New Password */}
            <div>
              <label className="mb-2 block"> New Password </label>
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
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              ></input>
            </div>
            {/* Confirm New Password */}
            <div>
              <label className="mb-2 block"> Confirm Password </label>
              <input
                type="password"
                name="confirm password"
                className="
                block w-11/12 rounded-lg border 
                border-gray-300 bg-gray-50 p-2 
                text-gray-900 focus:border-blue-600 focus:outline-none 
                focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                dark:placeholder-gray-400 dark:focus:border-blue-500 
                dark:focus:ring-blue-500 sm:w-full 
                sm:text-sm
                "
                id="confirm-password"
                placeholder="••••••••"
                title="Must be at least 8 characters long and contain a number and uppercase letter"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              ></input>
            </div>
            {/* Major(s) */}
            <div className="w-11/12 sm:w-full">
              <label htmlFor="major" className="mb-2 block">
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
            {/* Profile Picture */}
            <div className="w-11/12 text-sm sm:w-full sm:text-base">
              <label
                className="mb-2 block font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Profile Picture
              </label>
              <div className="flex-box flex">
                <input
                  className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
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
              {/* Show profile picture */}
              <ProfilePicture
                image={selectedImage ? profilePicture : ""}
                className="mt-4 h-40 w-40 rounded-full border border-gray-200 bg-white text-gray-400 dark:border-none dark:bg-gray-600"
                transform="translate(0, 2)"
                from="register"
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="my-10 flex w-11/12 justify-between sm:w-full">
            {/* Submit Changes */}
            <button
              type="submit"
              id="submit"
              disabled={
                password.length === 0 || password === confirmPassword
                  ? false
                  : true
              }
              className={
                password.length === 0 || password === confirmPassword
                  ? "rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  : "cursor-auto rounded-lg bg-gray-500 px-5 py-2.5 text-center text-sm font-medium text-white"
              }
            >
              Submit
            </button>
            {/* Delete User */}
            <button
              className=" 
                justify-center rounded-lg 
                bg-red-600 px-4 
                py-2.5 text-center 
                text-sm font-medium text-white hover:bg-red-700 focus:outline-none
                focus:ring-4 focus:ring-red-300 
                dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 sm:text-base"
              onClick={() => setShowDeleteAccountPopup(true)}
            >
              Delete account
            </button>
          </div>
        </div>

        {showDeleteAccountPopup && (
          <DeleteAccountPopup
            showDeleteAccountPopup={showDeleteAccountPopup}
            setShowDeleteAccountPopup={setShowDeleteAccountPopup}
          />
        )}
      </form>
    </div>
  );
};
export default Settings;
