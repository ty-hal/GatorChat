import Footer from "../../components/Footer";
import { useAtomValue } from "jotai";
import { userIDAtom } from "../../App";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfilePicture from "../../components/ProfilePicture";
import SkeletonUserProfile from "../../components/Account/SkeletonUserProfile";

type UserData = {
  username?: string;
  profilePicture?: string;
  majors?: string[];
  classes?: string[];
  creation_date?: string;
  threads_posted?: number;
  messages_posted?: number;
  likes_received?: number;
  likes_given?: number;
};

const MyAccount = () => {
  const activeUserID = useAtomValue(userIDAtom);
  const [userInfo, setUserInfo] = useState<UserData>();
  const [loadedInfo, setLoadedInfo] = useState<boolean>(false);
  const [loadedStats, setLoadedStats] = useState<boolean>(false);

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
    Promise.all([
      fetch(`http://localhost:9000/api/user/${activeUserID}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }),
      fetch(`http://localhost:9000/api/user/${activeUserID}/stats`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }),
    ])
      .then(([userDataResponse, userStatsResponse]) =>
        Promise.all([userDataResponse.json(), userStatsResponse.json()])
      )
      .then(([userData, userStats]) => {
        const { first_name, last_name, ...restUserData } = userData;
        const username = `${first_name} ${last_name}`;
        const userInfo = {
          ...restUserData,
          username,
          profilePicture: userData.profile_pic,
          creation_date: userData.creation_date,
          classes: userData.classes,
          majors: userData.majors,
          likes_given: userStats.likes_given,
          likes_received: userStats.likes_received,
          messages_posted: userStats.messages_posted,
          threads_posted: userStats.threads_posted,
        };
        setUserInfo(userInfo);
        setLoadedInfo(true);
        setLoadedStats(true);
      });
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
        {loadedInfo && loadedStats ? (
          <div className="mx-auto flex flex-col space-y-2 rounded-3xl  border border-gray-200 bg-gray-300 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
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
            )}
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
            {/* User Since */}
            {userInfo && userInfo.creation_date && (
              <div
                className="text-left text-base text-gray-900 dark:text-white"
                id="majors"
              >
                <span className="font-semibold">
                  {userInfo && userInfo.creation_date
                    ? "Account Created: "
                    : ""}
                </span>

                {
                  new Date(userInfo.creation_date)
                    .toLocaleString()
                    .split(",")[0]
                }
              </div>
            )}
            <div className="h-1"></div>
            <hr className="mx-auto h-0.5 w-full rounded bg-gray-700" />
            <div className="h-1"></div>
            {/* Threads Posted */}
            {userInfo && userInfo.threads_posted !== null && (
              <div
                className="text-left text-base text-gray-900 dark:text-white"
                id="threads_posted"
              >
                <span className="font-semibold">
                  {userInfo && userInfo.threads_posted !== null
                    ? "Threads Posted: "
                    : ""}
                </span>
                {userInfo.threads_posted}
              </div>
            )}
            {/* Messages Posted */}
            {userInfo && userInfo.messages_posted !== null && (
              <div
                className="text-left text-base text-gray-900 dark:text-white"
                id="messages_posted"
              >
                <span className="font-semibold">
                  {userInfo && userInfo.messages_posted !== null
                    ? "Messages Posted: "
                    : ""}
                </span>
                {userInfo.messages_posted}
              </div>
            )}
            {/* Likes Received */}
            {userInfo && userInfo.likes_received !== null && (
              <div
                className="text-left text-base text-gray-900 dark:text-white"
                id="likes_received"
              >
                <span className="font-semibold">
                  {userInfo && userInfo.likes_received !== null
                    ? "Likes Received: "
                    : ""}
                </span>
                {userInfo.likes_received}
              </div>
            )}
            {/* Likes Given */}
            {userInfo && userInfo.likes_given !== null && (
              <div
                className="text-left text-base text-gray-900 dark:text-white"
                id="likes_given"
              >
                <span className="font-semibold">
                  {userInfo && userInfo.likes_given !== null
                    ? "Likes Given: "
                    : ""}
                </span>
                {userInfo.likes_given}
              </div>
            )}
          </div>
        ) : (
          <SkeletonUserProfile />
        )}
        {/* Thread and Messages Links*/}
        <div className="mt-8 flex justify-between md:justify-center md:space-x-6">
          <Link to="/my-account/my-threads">
            <div className="rounded-xl border border-black bg-blue-600 p-2 font-medium text-white hover:bg-blue-500 dark:border-gray-600">
              {" "}
              My Threads
            </div>
          </Link>
          <Link to="/my-account/my-messages">
            <div className="rounded-xl border border-black bg-blue-600 p-2 font-medium text-white hover:bg-blue-500 dark:border-gray-600">
              {" "}
              My Messages
            </div>
          </Link>
          <Link to="/my-account/saved-threads">
            <div className="rounded-xl border border-black bg-blue-600 p-2 font-medium text-white hover:bg-blue-500 dark:border-gray-600">
              {" "}
              Saved Threads
            </div>
          </Link>
          <Link to="/my-account/saved-messages">
            <div className="rounded-xl border border-black bg-blue-600 p-2 font-medium text-white hover:bg-blue-500 dark:border-gray-600">
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
