const SkeletonUserProfilePopup = () => {
  return (
    <div
      className="mx-auto flex min-h-full w-11/12 flex-col items-center justify-center sm:w-full sm:max-w-lg"
      id="container"
    >
      <div className="my-4 flex h-full w-full flex-col space-y-4 rounded-lg border-2  border-blue-600 bg-gray-200 p-4">
        {/* Username */}
        <div className="mx-auto h-4 w-32 animate-pulse rounded bg-gray-400 dark:bg-gray-600"></div>
        {/* Profile Picture */}
        <div
          className="mx-auto h-32 w-32 animate-pulse rounded-full bg-gray-400 dark:bg-gray-600"
          id="profile-picture"
        ></div>
        {/* Majors  */}
        <div className="flex animate-pulse space-x-2">
          <div className="h-4 w-12 rounded bg-gray-400 dark:bg-gray-600"></div>
          <div className="h-4 w-36 rounded bg-gray-400 dark:bg-gray-600"></div>
        </div>
        {/* Courses */}
        <div className="flex animate-pulse space-x-2">
          <div className="h-4 w-12 rounded bg-gray-400 dark:bg-gray-600"></div>
          <div className="h-4 w-36 rounded bg-gray-400 dark:bg-gray-600"></div>
        </div>{" "}
        {/* User Since */}
        <div className="flex animate-pulse space-x-2">
          <div className="h-4 w-12 rounded bg-gray-400 dark:bg-gray-600"></div>
          <div className="h-4 w-36 rounded bg-gray-400 dark:bg-gray-600"></div>
        </div>{" "}
      </div>
    </div>
  );
};

export default SkeletonUserProfilePopup;
