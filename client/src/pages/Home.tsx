import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { darkModeAtom } from "../App";
import { useAtomValue } from "jotai";

type Section = {
  section_id: number;
  section_name: string;
};

type SearchBarItem = {
  id: number;
  name: string;
};

const Home = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [searchBarItems, setSearchBarItems] = useState<SearchBarItem[]>([]);
  const darkMode = useAtomValue(darkModeAtom);

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
        const extractedData: SearchBarItem[] = data.map(
          ({
            section_id,
            section_name,
          }: {
            section_id: number;
            section_name: string;
          }) => ({ id: section_id, name: section_name })
        );
        setSearchBarItems(extractedData);
      });
  }, []);

  const searchBarHandleOnSelect = (item: SearchBarItem) => {
    // the item selected
    console.log(item);
  };

  const searchBarFormatResult = (item: SearchBarItem) => {
    return <span className="block cursor-pointer text-left">{item.name}</span>;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto w-3/4 pt-2 outline-none">
        <ReactSearchAutocomplete
          items={searchBarItems}
          fuseOptions={{ threshold: 0.3 }}
          onSelect={searchBarHandleOnSelect}
          formatResult={searchBarFormatResult}
          placeholder="Search sections..."
          styling={{
            backgroundColor: `${
              darkMode ? "rgb(17 24 39)" : "rgb(255,255,255)"
            }`,
            iconColor: `${darkMode ? "rgb(255,255,255)" : "rgb(0,0,0)"}`,
            color: `${darkMode ? "rgb(255,255,255)" : "rgb(0,0,0)"}`,
            hoverBackgroundColor: `${
              darkMode ? "rgb(28 100 242)" : "rgba(28, 99, 242, 0.7)"
            }`,
            border: `${darkMode ? "1px solid #dfe1e5" : "1px solid #000"}`,
            clearIconMargin: "3px 8px 0 0",
          }}
        />
      </div>
      <div className="mx-auto w-full">
        {/* Display the sections */}
        {sections.map((section) => {
          let edited_section_name = section.section_name.replace(
            /[\W_]+/g,
            " "
          );
          edited_section_name = edited_section_name
            .replace(/\s+/g, "-")
            .toLowerCase();
          return (
            <div className="ml-8 w-fit py-1">
              <Link
                to={`/${edited_section_name}/${section.section_id}`}
                key={section.section_id}
              >
                <div className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg">
                  {section.section_name}
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
