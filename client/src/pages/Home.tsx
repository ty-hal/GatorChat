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
        let edited_section_name = section.section_name.replace(/[\W_]+/g, " ");
        edited_section_name = edited_section_name
          .replace(/\s+/g, "-")
          .toLowerCase();
        return (
          <Link
            to={`/${edited_section_name}/${section.section_id}`}
            key={section.section_id}
          >
            <div className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg">
              {section.section_name}
            </div>
          </Link>
        );
      })}

      <Footer />
    </div>
  );
};

export default Home;
