import { Outlet, Link } from "react-router-dom";

let dropdownMenu = document.getElementById("menu-button");
let dropdownContent = document.getElementById("dropdown-content");

if (dropdownMenu && dropdownContent) {
  dropdownMenu.addEventListener("mouseover", () => {
    dropdownContent?.classList.remove("hidden");
  });

  dropdownMenu.addEventListener("mouseout", () => {
    dropdownContent?.classList.add("hidden");
  });

  dropdownContent.addEventListener("mouseout", () => {
    dropdownContent?.classList.add("hidden");
  });
}

const Layout = () => {
  return (
    <div className="flex flex-wrap">
      <section className="relative mx-auto">
        <nav className="flex justify-between bg-gray-900 text-white w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            <a className="text-3xl font-bold font-heading" href="#">
              Logo
            </a>
            <ul className="flex px-4 mx-auto font-semibold font-heading space-x-12">
              <Link to="/">
                {" "}
                <span className="hover:ring-2 rounded-lg p-1 text-lg ring-gray-300 hover:bg-blue-600">
                  Home
                </span>
              </Link>
              <Link to="/sign-in">
                {" "}
                <span className="hover:ring-2 rounded-lg p-1 text-lg ring-gray-300 hover:bg-blue-600">
                  Sign in
                </span>
              </Link>
              <Link to="/sign-up">
                {" "}
                <span className="hover:ring-2 rounded-lg p-1 text-lg ring-gray-300 hover:bg-blue-600 mr-6">
                  Sign up
                </span>
              </Link>
            </ul>

            {/* DROPDOWN MENU */}
            <div className="flex items-center space-x-5">
              <div className="relative inline-block text-left">
                <div
                  className="inline-flex w-full justify-center rounded-md cursor-pointer text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  id="menu-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 hover:text-gray-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <div
                  className=" -mt-2 absolute right-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  id="dropdown-content"
                >
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      id="menu-item-0"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      id="menu-item-1"
                    >
                      My Account
                    </a>
                  </div>
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      id="menu-item-6"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </section>
    </div>
  );
};

export default Layout;

// <div className="container">
// {/* align-items-center justify-content-center justify-content-md-between */}
// <header className="flex py-3 mb-4 w-screen border-bottom bg-slate-100 border-b-2 border-b-slate-500">
//   <a href="/" className="w-1/4 text-left pl-4">
//     LOGO
//   </a>

//   <nav className="w-3/4 space-x-6 text-right">
//     <Link to="/">
//       {" "}
//       <span className="hover:text-red-600 px-1.5 py-1 rounded-lg border-2 border-blue-600 text-blue-700 text-lg">
//         Home
//       </span>
//     </Link>
//     <Link to="/sign-in">
//       {" "}
//       <span className="">Sign in</span>
//     </Link>
//     <Link to="/sign-up">
//       {" "}
//       <span className="mr-6">Sign up</span>
//     </Link>
//   </nav>
// </header>
// </div>
