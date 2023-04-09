const SkeletonThreadPost = () => {
  return (
    <div
      className="relative mx-auto w-11/12 animate-pulse rounded-t-2xl border-2 border-gray-500 bg-gray-200 pt-8 pb-16 shadow-md dark:bg-gray-800 lg:w-4/5"
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
          <div className="h-4 w-12 rounded bg-gray-400 dark:bg-gray-600 sm:w-36"></div>
          <div className="h-4 w-12 rounded bg-gray-400 dark:bg-gray-600"></div>
        </div>
      </div>

      {/* Thread Title  */}
      <div
        id="thread-title"
        className="relative top-7 mx-8 mb-4 h-4 w-5/6 rounded bg-gray-400 dark:bg-gray-600 sm:my-2"
      ></div>
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

export default SkeletonThreadPost;
