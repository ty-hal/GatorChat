import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { darkModeAtom } from "../App";
import { useAtomValue } from "jotai";
import Footer from "../components/Footer";
import SkeletonThreadPreview from "../components/Thread/SkeletonThreadPreview";
import SectionPreview from "../components/SectionPreview";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

type SearchBarItem = {
  id: number;
  name: string;
};

type ChildSectionType = {
  section_id: number;
  section_name: string;
  group_id: number;
  description: string;
};

interface Props {
  activeUserID: number;
  checkedCookie: boolean;
  section_name: string;
  section_id: string;
  description: string;
}

const EmbeddedSection: React.FC<Props> = ({
  activeUserID,
  checkedCookie,
  section_name,
  section_id,
  description,
}) => {
  const navigate = useNavigate();
  const [childSections, setChildSections] = useState<ChildSectionType[]>([]);
  const [sectionName, setSectionName] = useState<string>("");
  const [searchMessage, setSearchMessage] = useState<string>("");
  const [loaded, setLoaded] = useState(false);
  const [searchBarItems, setSearchBarItems] = useState<SearchBarItem[]>([]);
  const darkMode = useAtomValue(darkModeAtom);

  const getChildSections = () => {
    fetch(`http://localhost:9000/api/section/${section_id}/children`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setChildSections((childSections) => [
          ...childSections,
          ...data.filter(
            (section: ChildSectionType) =>
              !childSections.some((t) => t.section_id === section.section_id)
          ),
        ]);

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
      })
      .then(() => {
        setLoaded(true);
      });
  };
  const getSection = () => {
    fetch(`http://localhost:9000/api/section/${section_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSectionName(data.section_name);
        setSearchMessage('Search sections in "' + data.section_name + '"...');
      });
  };
  function hyphenToTitleCase(input: string): string {
    const excludedWords = ["and", "of", "a"];
    const words = input.split("-");

    const titleCaseWords = words.map((word, index) => {
      if (index === 0 || !excludedWords.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    });

    return titleCaseWords.join(" ");
  }

  const searchBarHandleOnSelect = (item: SearchBarItem) => {
    // the item selected
    console.log(item);
    let edited_section_name = item.name
      .replace(/[\W_]+/g, " ")
      .replace(/\s+/g, "-")
      .toLowerCase();
    // FIX THIS TO NAVIGATE TO EMBEDDED SECTIONS
    navigate(`${item.id}/${edited_section_name}`);
    window.location.reload();
  };

  const searchBarFormatResult = (item: SearchBarItem) => {
    return <span className="block cursor-pointer text-left">{item.name}</span>;
  };

  useEffect(() => {
    // If user authentication is checked
    if (checkedCookie) {
      getChildSections();
      getSection();
    }
  }, [section_id, navigate, checkedCookie]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center rounded-xl px-10 pt-6">
        {/* Section Name */}
        {loaded ? (
          <>
            <div
              className="h-8 cursor-pointer text-2xl font-semibold hover:underline dark:text-white"
              onClick={() => navigate(-1)}
            >
              {sectionName}
            </div>
            <div className="mb-2 text-lg font-normal dark:text-white">
              {description}
            </div>
          </>
        ) : (
          <div className="mb-4 h-8 animate-pulse cursor-pointer text-2xl font-semibold filter dark:text-white">
            {hyphenToTitleCase(section_name)}
          </div>
        )}

        {/* Search Bar */}
        {loaded && (
          <div className="mx-auto my-1 w-full outline-none lg:w-5/6">
            <ReactSearchAutocomplete
              items={searchBarItems}
              fuseOptions={{ threshold: 0.3 }}
              onSelect={searchBarHandleOnSelect}
              formatResult={searchBarFormatResult}
              placeholder={searchMessage}
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
        )}

        {/* Display the Sections */}
        {loaded ? (
          childSections.length > 0 ? (
            <div className="w-full sm:grid sm:grid-cols-2 sm:gap-2  lg:grid-cols-3">
              {childSections.map((section, index) => {
                return (
                  <SectionPreview
                    key={index}
                    section_id={section.section_id}
                    section_name={section.section_name}
                    section_description={section.description}
                    parent={false}
                  />
                );
              })}
            </div>
          ) : (
            <div className="mt-6 dark:text-white">
              Please try a different section.
            </div>
          )
        ) : (
          <>
            <SkeletonThreadPreview />
            <SkeletonThreadPreview />
            <SkeletonThreadPreview />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EmbeddedSection;
