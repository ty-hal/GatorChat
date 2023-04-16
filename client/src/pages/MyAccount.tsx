import Footer from "../components/Footer";
import { useAtomValue } from "jotai";
import { userIDAtom } from "../App";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfilePicture from "../components/ProfilePicture";
import SkeletonUserProfile from "../components/Account/SkeletonUserProfile";

type UserData = {
  username?: string;
  profilePicture?: string;
  majors?: string[];
  classes?: string[];
  creation_date?: string;
};

const MyAccount = () => {
  const activeUserID = useAtomValue(userIDAtom);
  const [userInfo, setUserInfo] = useState<UserData>();
  const [loaded, setLoaded] = useState<boolean>(false);

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

  // Get user data
  const getUserData = () => {
    fetch(`http://localhost:9000/api/user/${activeUserID}`, {
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
        let username = data.first_name + " " + data.last_name;
        console.log(data);
        setUserInfo({
          username: username,
          profilePicture: data.profile_pic,
          creation_date: data.creation_date,
          classes: data.classes,
          majors: data.majors,
        });
      })
      .then(() => setLoaded(true));
  };
  useEffect(() => {
    // Get user saved threads
    if (activeUserID != null && activeUserID > 0) {
      getUserData();
    }
  }, [activeUserID]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto w-full pt-4 text-black dark:text-white sm:w-5/6 lg:w-2/3">
        {/* User Profile */}
        {loaded ? (
          <div className="mx-auto flex flex-col space-y-3 rounded-3xl  border border-gray-200 bg-gray-300 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
            {/* Username */}
            <div
              className="mx-auto text-2xl font-bold text-gray-900 dark:text-white"
              id="username"
            >
              {userInfo && userInfo.username ? userInfo.username : ""}
            </div>
            {/* Profile Picture */}
            <div
              className="mx-auto h-32 w-32 overflow-hidden rounded-full border-2 bg-white dark:border-0 dark:bg-gray-600 "
              id="profile-picture"
            >
              <ProfilePicture
                image={
                  userInfo && userInfo.profilePicture
                    ? userInfo.profilePicture
                    : ""
                }
                className="h-32 w-32 text-gray-400 sm:h-32 sm:w-32"
                transform="translate(0, 2)"
              />
            </div>
            {/* Majors */}
            {userInfo && userInfo.majors && (
              <div
                className="text-left text-base text-gray-900 dark:text-white"
                id="majors"
              >
                <span className="font-semibold">
                  {userInfo && userInfo.majors
                    ? userInfo.majors.length > 1
                      ? "Majors: "
                      : "Major: "
                    : ""}
                </span>
                {arrayToString(userInfo.majors)}
              </div>
            )}
            {/* Classes */}
            {userInfo && userInfo.classes && (
              <div
                className="text-left text-base text-gray-900 dark:text-white"
                id="classes"
              >
                <span className="font-semibold">
                  {userInfo && userInfo.classes
                    ? userInfo.classes.length > 1
                      ? "Classes: "
                      : "Class: "
                    : ""}
                </span>

                {arrayToString(userInfo.classes)}
              </div>
            )}{" "}
            {/* User Since */}
            {userInfo && userInfo.creation_date && (
              <div
                className="text-left text-base text-gray-900 dark:text-white"
                id="majors"
              >
                <span className="font-semibold">
                  {userInfo && userInfo.creation_date
                    ? "Account created: "
                    : ""}
                </span>

                {
                  new Date(userInfo.creation_date)
                    .toLocaleString()
                    .split(",")[0]
                }
              </div>
            )}
            <hr></hr>
            {/* Likes Received */}
            {/* Likes Given */}
            {/* Threads Posted */}
            {/* Messages Posted */}
          </div>
        ) : (
          <SkeletonUserProfile />
        )}
        {/* Thread and Messages Links*/}
        <div className="mt-8 flex justify-between">
          <Link to="/my-account/my-threads">
            <div className="rounded-lg border border-black bg-blue-600 p-2 font-medium text-white hover:bg-blue-500 dark:border-gray-600">
              {" "}
              My Threads
            </div>
          </Link>
          <Link to="/my-account/my-messages">
            <div className="rounded-lg border border-black bg-blue-600 p-2 font-medium text-white hover:bg-blue-500 dark:border-gray-600">
              {" "}
              My Messages
            </div>
          </Link>
          <Link to="/my-account/saved-threads">
            <div className="rounded-lg border border-black bg-blue-600 p-2 font-medium text-white hover:bg-blue-500 dark:border-gray-600">
              {" "}
              Saved Threads
            </div>
          </Link>
          <Link to="/my-account/saved-messages">
            <div className="rounded-lg border border-black bg-blue-600 p-2 font-medium text-white hover:bg-blue-500 dark:border-gray-600">
              {" "}
              Saved Messages
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccount;
