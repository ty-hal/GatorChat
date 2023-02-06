import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Link to="/sample-messages">
        <span
          className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg"
          role="menuitem"
          id="menu-item-0"
        >
          Sample Messages
        </span>
      </Link>
      <Link to="/sample-threads">
        <span
          className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg"
          role="menuitem"
          id="menu-item-0"
        >
          Sample Threads
        </span>
      </Link>
      <Footer />
    </div>
  );
};

export default Home;
