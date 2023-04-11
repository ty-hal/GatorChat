const SkeletonSectionPreview = () => {
  return (
    <div
      className="m-2 animate-pulse cursor-pointer rounded-2xl border-2 border-gray-500 bg-gray-200 p-2 shadow-md dark:bg-gray-800"
      id="section-preview"
    >
      {/* Section Title  */}
      <div
        id="section-title"
        className="mx-auto mt-2 h-4 w-1/3 rounded bg-gray-700 dark:bg-gray-400"
      ></div>
      {/* Section Content  */}
      <div
        id="section-description"
        className="mx-auto mt-4 mb-6 h-4 w-2/3 rounded bg-gray-500 dark:bg-gray-600"
      ></div>
    </div>
  );
};

export default SkeletonSectionPreview;
