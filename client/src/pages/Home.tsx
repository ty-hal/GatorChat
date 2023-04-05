import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const isSectionEmbedded = async (section_id: number) => {
    fetch(`http://localhost:9000/api/section/${section_id}/children`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.length === 0) return false;
        else return true;
      });
  };

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
        setSections(data);
        console.log(data);
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
          }) => ({ id: section_id, name: section_name })
        );
        setSearchBarItems(extractedData);
      });
  }, []);

  const searchBarHandleOnSelect = async (item: SearchBarItem) => {
    // the item selected
    console.log(item);
    let embedded = await isSectionEmbedded(item.id);
    console.log("Embedded: " + embedded);
    let edited_section_name = item.name
      .replace(/[\W_]+/g, " ")
      .replace(/\s+/g, "-")
      .toLowerCase();
    navigate(`/${edited_section_name}/${item.id}`);
  };

  const searchBarFormatResult = (item: SearchBarItem) => {
    console.log(item);

    let edited_section_name = item.name
      .replace(/[\W_]+/g, " ")
      .replace(/\s+/g, "-")
      .toLowerCase();
    return (
      <Link to={`/${edited_section_name}/${item.id}`} key={item.id}>
        <div className="cursor-pointer font-medium text-gray-900 dark:text-white md:text-lg">
          {item.name}
        </div>
      </Link>
    );

    {
      /* return <span className="block cursor-pointer text-left">{item.name}</span>; */
    }
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
      <div className="mx-auto w-full">
        {sections.map((section, index) => {
          let edited_section_name = section.section_name
            .replace(/[\W_]+/g, " ")
            .replace(/\s+/g, "-")
            .toLowerCase();
          return (
            <div className="ml-8 w-fit py-1" key={index}>
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
