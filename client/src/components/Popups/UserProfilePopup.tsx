import { useEffect, useState } from "react";
import ProfilePicture from "../ProfilePicture";

type Props = {
  userID: number;
  showUserProfilePopup: boolean;
  setShowUserProfilePopup: React.Dispatch<React.SetStateAction<boolean>>;
};

type UserData = {
  username: string;
  profilePicture: string;
  majors?: string[];
  classes?: string[];
  CreationDate: string;
};

const UserProfilePopup: React.FC<Props> = ({
  userID,
  showUserProfilePopup,
  setShowUserProfilePopup,
}) => {
  const [userInfo, setUserInfo] = useState<UserData>();

  useEffect(() => {
    console.log("ID:", userID);
    if (userID !== undefined && userID > 0) {
      fetch(`http://localhost:9000/api/user/${userID}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          const tempUserData: UserData = {
            username: data.first_name + " " + data.last_name,
            profilePicture: data.profile_pic,
            // majors: data.majors,
            // classes: data.classes,
            majors: ["Computer Science", "Mathematics"],
            classes: ["CEN3031", "COP4020", "MAS4105", "MAS4301"],
            CreationDate: data.CreationDate,
          };
          setUserInfo(tempUserData);
        });
    }
  }, []);

  const arrayToString = (array: string[]) => {
    if (array.length === 1) {
      return array[0];
    } else if (array.length === 2) {
      return array[0] + " and " + array[1];
    } else {
      let final = "";
      array
        .filter((i, index) => index < array.length - 1)
        .map((i) => {
          final += i + ", ";
        });
      return final + "and " + array[array.length - 1];
    }
  };
  return (
    <>
      {showUserProfilePopup && (
        <div
          className="fixed inset-0 z-10 cursor-auto overflow-y-auto"
          onClick={(e) => {
            e.stopPropagation();
            setShowUserProfilePopup(false);
          }}
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative w-11/12 transform overflow-hidden rounded-lg border-2 border-blue-600 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="flex flex-col space-y-3 text-center sm:ml-4 sm:w-11/12">
                    {/* Username */}
                    <div
                      className="text-2xl font-bold leading-6 text-gray-900"
                      id="username"
                    >
                      {userInfo && userInfo.username ? userInfo.username : ""}
                    </div>
                    {/* Profile Picture */}
                    <div
                      className="mx-auto h-32 w-32 overflow-hidden rounded-full bg-white dark:bg-gray-600"
                      id="profile-picture"
                    >
                      <ProfilePicture
                        image={
                          userInfo && userInfo.profilePicture
                            ? userInfo.profilePicture
                            : ""
                        }
                        className="h-32 w-32 text-gray-400 sm:h-32 sm:w-32"
                      />
                    </div>
                    {/* Majors */}
                    <div
                      className="text-left text-base leading-6 text-gray-900"
                      id="majors"
                    >
                      <span className="font-semibold">
                        {userInfo && userInfo.majors
                          ? userInfo.majors.length > 1
                            ? "Majors: "
                            : "Major: "
                          : ""}
                      </span>
                      {userInfo && userInfo.majors
                        ? arrayToString(userInfo.majors)
                        : ""}
                    </div>
                    {/* Classes */}
                    <div
                      className="text-left text-base leading-6 text-gray-900"
                      id="classes"
                    >
                      <span className="font-semibold">
                        {userInfo && userInfo.classes
                          ? userInfo.classes.length > 1
                            ? "Classes: "
                            : "Class: "
                          : ""}
                      </span>
                      {userInfo && userInfo.classes
                        ? arrayToString(userInfo.classes)
                        : ""}
                    </div>
                    {/* User Since */}
                    <div
                      className="text-left text-base leading-6 text-gray-900"
                      id="majors"
                    >
                      <span className="font-semibold">
                        {userInfo && userInfo.CreationDate
                          ? "Created account on "
                          : ""}
                      </span>
                      {userInfo && userInfo.CreationDate
                        ? new Date(userInfo.CreationDate)
                            .toLocaleString()
                            .split(",")[0]
                        : ""}
                    </div>
                  </div>
                  {/* X button  */}
                  <div
                    className="-mt-1 -mr-2 hidden cursor-pointer sm:block"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserProfilePopup(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 28 28"
                      width="30"
                      height="30"
                      className="fill-gray-600"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfilePopup;
