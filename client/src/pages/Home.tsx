import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Link to="/sample-messages">
        <div className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg">
          Sample Messages
        </div>
      </Link>
      <Link to="/sample-threads">
        <div className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg">
          Sample Threads
        </div>
      </Link>
      <Link to="/sample-thread-1">
        <div className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg">
          Sample Thread (with messages)
        </div>
      </Link>
      <Footer />
    </div>
  );
};

export default Home;
