import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type Section = {
  section_id: number;
  section_name: string;
};

const Home = () => {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    fetch("http://localhost:9000/api/sections", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSections(data);
      });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900">
      {sections.map((section) => {
        return (
          <Link
            key={section.section_id}
            to="/sample-threads-preview"
            state={{ section_id: section.section_id }}
          >
            <div className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg">
              {section.section_name}
            </div>
          </Link>
        );
      })}
      {/*<Link to="/sample-threads">
        <div className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg">
          Sample Threads
        </div>
      </Link>*/}
      <Link to="/sample-thread">
        <div className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg">
          Sample Thread (with messages)
        </div>
      </Link>
      <Footer />
    </div>
  );
};

export default Home;
