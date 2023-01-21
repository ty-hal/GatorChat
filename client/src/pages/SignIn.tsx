import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="mt-14 mx-auto w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your UF email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-1 focus:outline-none focus:ring-blue-600 block w-full p-2.5"
              placeholder="email@ufl.edu"
              required
              pattern="[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@ufl\.edu"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-1 focus:outline-none focus:ring-blue-600 block w-full p-2.5"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-1 focus:ring-blue-600 "
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500">
                  Remember me
                </label>
              </div>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              {" "}
              <span> Forgot password?</span>
            </Link>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500">
            Don't have an account yet?{" "}
            <Link
              to="/sign-up"
              className="font-medium text-blue-600 hover:underline"
            >
              {" "}
              <span className="mr-4">Sign up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
