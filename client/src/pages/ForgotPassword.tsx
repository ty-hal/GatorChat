const ForgotPassword = () => {
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit form");
  };

  return (
    <div className="h-screen py-16 md:py-8 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto w-full border-2 p-6 sm:p-8 space-y-4 md:space-y-6 rounded-lg shadow sm:max-w-md bg-white dark:border  dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          Forgot your password?
        </h1>
        <form className="space-y-4 md:space-y-3" onSubmit={submitForm}>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your UF email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-1 focus:outline-none focus:ring-blue-600 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="email@ufl.edu"
            required
            pattern="[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@ufl\.edu"
          />
          <button
            type="submit"
            className=" w-full text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Send email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
