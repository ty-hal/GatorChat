const SkeletonMessageBox = () => {
  return (
    <div
      className="relative mx-auto flex h-14 w-11/12 animate-pulse rounded-b-lg border-2 border-t border-gray-500 bg-gray-200 px-1 py-4 shadow-xl dark:bg-gray-800 md:px-3 lg:w-4/5"
      id="container"
    >
      {/* Message Box */}
      <div className="flex w-full space-x-2">
        <div
          id="message-box"
          className="ml-8 mb-2 h-6 w-full rounded bg-gray-400 dark:bg-gray-600"
        ></div>
        <div className="mr-2 h-6 w-6 rounded-full bg-gray-400 dark:bg-gray-600"></div>
      </div>
    </div>
  );
};

export default SkeletonMessageBox;
