const SkeletonMessage = () => {
  return (
    <div
      className="relative mx-auto h-44 w-11/12 animate-pulse border-x-2 border-y border-gray-500 bg-gray-200  py-8 dark:bg-gray-800 lg:w-4/5"
      id="container"
    >
      {/* Profile Picture, Username, Date, and Dropdown */}
      <div className="absolute top-3 flex w-full items-center">
        {/* Profile Picture */}
        <div
          className="ml-3 h-8 w-8 overflow-hidden rounded-full bg-gray-400 dark:bg-gray-600 sm:h-10 sm:w-10"
          id="profile-picture"
        ></div>
        {/* Username and Time  */}
        <div className="ml-4 flex space-x-2">
          <div className="h-4 w-20 rounded bg-gray-400 dark:bg-gray-600"></div>
          <div className="h-4 w-36 rounded bg-gray-400 dark:bg-gray-600"></div>
          <div className="h-4 w-12 rounded bg-gray-400 dark:bg-gray-600"></div>
        </div>
      </div>
      {/* Thread Content  */}
      <div
        id="thread-preview-content"
        className="relative top-11 mx-8 mb-2 h-4 w-5/6 rounded bg-gray-400 dark:bg-gray-600"
      ></div>
      <div
        id="thread-preview-content"
        className="relative top-11 mx-8 mb-2 h-4 w-5/6 rounded bg-gray-400 dark:bg-gray-600"
      ></div>
      <div
        id="thread-preview-content"
        className="relative top-11 mx-8 mb-2 h-4 w-5/6 rounded bg-gray-400 dark:bg-gray-600"
      ></div>
    </div>
  );
};

export default SkeletonMessage;
