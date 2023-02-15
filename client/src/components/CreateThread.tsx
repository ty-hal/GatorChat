import { useState } from "react";

const CreateThread = () => {
  const [openEditor, toggleOpenEditor] = useState(false);

  return (
    <div
      className="mx-auto w-11/12 cursor-pointer rounded-2xl border-2 border-gray-600 bg-gray-200 py-2 text-center text-lg font-semibold text-gray-900 shadow-xl hover:border-blue-600 dark:bg-gray-800 dark:text-white lg:w-4/5"
      id="container"
      onClick={() => toggleOpenEditor(!openEditor)}
    >
      <div>Create a thread</div>
      {openEditor && <div>HI</div>}
    </div>
  );
};

export default CreateThread;
