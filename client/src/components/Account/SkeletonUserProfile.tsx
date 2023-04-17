const SkeletonUserProfile = () => {
  return (
    <div
      className="mx-auto flex min-h-full w-full flex-col justify-center rounded-3xl border border-gray-200 bg-gray-300 p-8 dark:border-gray-700 dark:bg-gray-800"
      id="container"
    >
      {/* Username */}
      <div className="mx-auto mt-2 h-5 w-32 animate-pulse rounded bg-black dark:bg-white"></div>
      {/* Profile Picture */}
      <div
        className="mx-auto mt-5 h-32 w-32 animate-pulse rounded-full bg-black dark:bg-white"
        id="profile-picture"
      ></div>
      <div className="mt-4 flex flex-col space-y-3">
        {/* Majors  */}
        <div className="flex animate-pulse space-x-2">
          <div className="h-4 w-12 items-start rounded bg-black dark:bg-white"></div>
          <div className="h-4 w-64 rounded bg-black dark:bg-white"></div>
        </div>
        {/* Courses */}
        <div className="flex animate-pulse space-x-2">
          <div className="h-4 w-12 rounded bg-black dark:bg-white"></div>
          <div className="h-4 w-64 rounded bg-black dark:bg-white"></div>
        </div>
        {/* User Since */}
        <div className="flex animate-pulse space-x-2">
          <div className="h-4 w-12 rounded bg-black dark:bg-white"></div>
          <div className="h-4 w-64 rounded bg-black dark:bg-white"></div>
        </div>
        {/* Likes Received */}
        <div className="flex animate-pulse space-x-2">
          <div className="h-4 w-12 rounded bg-black dark:bg-white"></div>
          <div className="h-4 w-64 rounded bg-black dark:bg-white"></div>
        </div>
        {/* Likes Given */}
        <div className="flex animate-pulse space-x-2">
          <div className="h-4 w-12 rounded bg-black dark:bg-white"></div>
          <div className="h-4 w-64 rounded bg-black dark:bg-white"></div>
        </div>
        {/* Threads Posted */}
        <div className="flex animate-pulse space-x-2">
          <div className="h-4 w-12 rounded bg-black dark:bg-white"></div>
          <div className="h-4 w-64 rounded bg-black dark:bg-white"></div>
        </div>
        {/* Messages Posted */}
        <div className="flex animate-pulse space-x-2">
          <div className="flex animate-pulse space-x-2">
            <div className="h-4 w-12 rounded bg-black dark:bg-white"></div>
            <div className="h-4 w-64 rounded bg-black dark:bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonUserProfile;
