import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { darkModeAtom } from "../App";
import { useAtomValue } from "jotai";
import SectionPreview from "../components/SectionPreview";

type Section = {
  section_id: number;
  section_name: string;
  description: string;
};

type SearchBarItem = {
  id: number;
  name: string;
  children: boolean;
};

const Home = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [searchBarItems, setSearchBarItems] = useState<SearchBarItem[]>([]);
  const darkMode = useAtomValue(darkModeAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // Get base level sections
    fetch("http://localhost:9000/api/section/1/children", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSections(data);
      });

    // Get all sections and add them to the search bar
    fetch("http://localhost:9000/api/sections", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const extractedData: SearchBarItem[] = data.map(
          ({
            section_id,
            section_name,
          }: {
            section_id: number;
            section_name: string;
          }) => ({
            id: section_id,
            name: section_name,
          })
        );
        setSearchBarItems(extractedData);
      });
  }, []);

  const searchBarHandleOnSelect = (item: SearchBarItem) => {
    // the item selected
    console.log(item);
    let edited_section_name = item.name
      .replace(/[\W_]+/g, " ")
      .replace(/\s+/g, "-")
      .toLowerCase();

    // FIX THIS TO NAVIGATE TO EMBEDDED SECTIONS
    navigate(`s/${item.id}/${edited_section_name}`);
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

      {/* Display the sections */}
      <div className="mx-auto mt-2 w-11/12 sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-2 lg:grid-cols-4">
        {sections.map((section, index) => {
          console.log(section);
          return (
            <SectionPreview
              key={index}
              section_id={section.section_id}
              section_name={section.section_name}
              section_description={section.description}
              parent={true}
            />
          );
        })}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
