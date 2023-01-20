import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="space-x-5 text-right mt-2">
        <Link to="/"> <span className="">Home</span></Link>
        <Link to="/sign-in"> <span className="">Sign in</span></Link>
        <Link to="/sign-up"> <span className="mr-4">Sign up</span></Link>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;