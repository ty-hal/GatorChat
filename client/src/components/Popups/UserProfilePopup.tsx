import { useEffect, useState } from "react";
import ProfilePicture from "../ProfilePicture";
import SkeletonUserProfilePopup from "./SkeletonUserProfilePopup";

type Props = {
  userID: number;
  showUserProfilePopup: boolean;
  setShowUserProfilePopup: React.Dispatch<React.SetStateAction<boolean>>;
};

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

const UserProfilePopup: React.FC<Props> = ({
  userID,
  showUserProfilePopup,
  setShowUserProfilePopup,
}) => {
  const [userInfo, setUserInfo] = useState<UserData>();
  const [loadedInfo, setLoadedInfo] = useState<boolean>(false);
  const [loadedStats, setLoadedStats] = useState<boolean>(false);
  // Get user data
  const getUserData = () => {
    Promise.all([
      fetch(`http://localhost:9000/api/user/${userID}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }),
      fetch(`http://localhost:9000/api/user/${userID}/stats`, {
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

  // Load user data
  useEffect(() => {
    if (userID !== undefined && userID > 0) {
      getUserData();
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

  if (!showUserProfilePopup) return <></>;
  return (
    <div
      className="fixed inset-0 z-10 cursor-auto overflow-y-auto"
      onClick={(e) => {
        e.stopPropagation();
        setShowUserProfilePopup(false);
      }}
    >
      {loadedInfo && loadedStats ? (
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div className="relative w-11/12 transform overflow-hidden rounded-xl border-2 border-blue-600 bg-gray-200 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-gray-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="flex w-full flex-col space-y-2 text-center sm:ml-4">
                  {/* Username */}
                  <div className="ml-3 flex w-full sm:ml-0">
                    <div
                      className="mx-auto text-2xl font-bold leading-6 text-gray-900"
                      id="username"
                    >
                      {userInfo && userInfo.username ? userInfo.username : ""}
                    </div>
                    <div
                      className="block cursor-pointer sm:hidden"
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
                  {/* Majors */}
                  <div
                    className="text-left text-base leading-6 text-gray-900"
                    id="majors"
                  >
                    {/* Test */}
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

                  {/* User Since */}
                  <div
                    className="text-left text-base leading-6 text-gray-900"
                    id="majors"
                  >
                    <span className="font-semibold">
                      {userInfo && userInfo.creation_date
                        ? "Account Created: "
                        : ""}
                    </span>
                    {userInfo && userInfo.creation_date
                      ? new Date(userInfo.creation_date)
                          .toLocaleString()
                          .split(",")[0]
                      : ""}
                  </div>
                  <hr className="mx-auto h-0.5 w-full rounded bg-gray-700" />
                  {/* Threads Posted */}
                  {userInfo && userInfo.threads_posted !== null && (
                    <div
                      className="text-left text-base text-gray-900"
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
                      className="text-left text-base text-gray-900"
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
                      className="text-left text-base text-gray-900"
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
                      className="text-left text-base text-gray-900"
                      id="likes_given"
                    >
                      <span className="font-semibold ">
                        {userInfo && userInfo.likes_given !== null
                          ? "Likes Given: "
                          : ""}
                      </span>
                      {userInfo.likes_given}
                    </div>
                  )}
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
      ) : (
        <SkeletonUserProfilePopup />
      )}
    </div>
  );
};

export default UserProfilePopup;
