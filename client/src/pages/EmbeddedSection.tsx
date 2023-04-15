import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { darkModeAtom } from "../App";
import { useAtomValue } from "jotai";
import Footer from "../components/Footer";
import SkeletonSectionPreview from "../components/Section/SkeletonSectionPreview";
import SectionPreview from "../components/Section/SectionPreview";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import CreateSectionPopup from "../components/Popups/CreateSectionPopup";
import SignInPopup from "../components/Popups/SignInPopup";

type SearchBarItem = {
  id: number;
  name: string;
};

type ChildSectionType = {
  section_id: number;
  section_name: string;
  group_id: number;
  description: string;
  parent_section: boolean;
  thread_count: number;
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
  const [searchMessage, setSearchMessage] = useState<string>(
    "Search for a section..."
  );
  const [savedSection, setSavedSection] = useState<boolean>(false);
  const [loaded, setLoaded] = useState(false);
  const [searchBarItems, setSearchBarItems] = useState<SearchBarItem[]>([]);
  const darkMode = useAtomValue(darkModeAtom);
  const [showCreateSectionPopup, setShowCreateSectionPopup] =
    useState<boolean>(false);
  const [showSignInPopup, setShowSignInPopup] = useState<boolean>(false);

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
    fetch(
      `http://localhost:9000/api/section/${section_id}?activeUser=${activeUserID}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setSavedSection(data.user_saved);
        setSectionName(data.section_name);
        if (window.innerWidth < 640) {
          setSearchMessage("Search for a section...");
        } else {
          setSearchMessage(
            'Search for a section in "' + data.section_name + '"...'
          );
        }
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
  const toggleSaveSection = () => {
    fetch(
      `http://localhost:9000/api/togglesavedsection?sectionID=${section_id}&activeUser=${activeUserID}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((response) => response.json());
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
      <div className="flex w-full flex-col items-center rounded-xl px-10 pt-6">
        {/* Section Name */}
        {sectionName ? (
          <div className="relative">
            <div
              className="h-8 cursor-pointer text-2xl font-semibold hover:underline dark:text-white"
              onClick={() => navigate(-1)}
            >
              {sectionName ? sectionName : hyphenToTitleCase(section_name)}
            </div>
            <div
              className="absolute top-0 -right-12"
              title={
                savedSection
                  ? "Unbookmark this section"
                  : "Bookmark this section"
              }
              id="bookmark-section"
              onClick={() => {
                if (!activeUserID || activeUserID <= 0) {
                  return;
                }
                setSavedSection(!savedSection);
                toggleSaveSection();
              }}
            >
              {savedSection ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-8 w-8 cursor-pointer rounded-md p-1 hover:bg-gray-200 dark:stroke-blue-600 dark:hover:bg-gray-700"
                >
                  <path
                    d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2Z"
                    fill="rgb(28 100 242 / var(--tw-bg-opacity))"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-8 w-8 cursor-pointer rounded-md stroke-blue-600 p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <path
                    d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"
                    fill="rgb(28 100 242 / var(--tw-bg-opacity))"
                  ></path>
                </svg>
              )}
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="h-8 animate-pulse text-2xl font-semibold filter dark:text-white">
              {hyphenToTitleCase(section_name)}
            </div>
            <div
              className="absolute top-0 -right-12 animate-pulse"
              title="Bookmark this section"
              id="loading-bookmark-section"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-8 w-8  rounded-md stroke-blue-600 p-1"
              >
                <path
                  d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"
                  fill="rgb(28 100 242 / var(--tw-bg-opacity))"
                ></path>
              </svg>
            </div>
          </div>
        )}

        {/* Section Description */}
        {description ? (
          <div className="mb-2 text-center text-base font-normal dark:text-white sm:text-lg">
            {description}
          </div>
        ) : (
          <div className="mx-auto my-2 h-4 w-3/4 animate-pulse rounded bg-gray-500 dark:bg-gray-300 md:w-1/2 lg:w-1/3"></div>
        )}

        {/* Bar */}
        <div className="flex w-full items-center justify-center space-x-2 lg:w-2/3">
          {/* Search Bar */}
          <div className="z-50 mx-auto my-1 w-full outline-none">
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
                fontSize: `${window.innerWidth < 640 ? "13px" : "16px"}`,
              }}
            />
          </div>
          {/* Create Section */}
          <div
            className="m-auto flex h-12 cursor-pointer items-center justify-center rounded-full border border-black p-2 hover:bg-blue-400 dark:border-white dark:hover:bg-blue-600 md:w-1/4"
            onClick={(e) => {
              if (!activeUserID || activeUserID <= 0) {
                setShowSignInPopup(true);
                return;
              }
              setShowCreateSectionPopup(true);
            }}
          >
            <div className="w-full text-center text-sm dark:text-white lg:text-base">
              Create section
            </div>
          </div>
        </div>

        {/* Display the Sections */}
        <div className="w-full sm:grid sm:grid-cols-2 sm:gap-2  lg:grid-cols-3">
          {loaded ? (
            childSections.length > 0 ? (
              childSections.map((section, index) => {
                return (
                  <SectionPreview
                    key={index}
                    section_id={section.section_id}
                    section_name={section.section_name}
                    section_description={section.description}
                    parent_section={section.parent_section}
                    thread_count={
                      section.thread_count ? section.thread_count : 0
                    }
                  />
                );
              })
            ) : (
              <div className="mt-6 dark:text-white">
                Please try a different section.
              </div>
            )
          ) : (
            <>
              <SkeletonSectionPreview />
              <SkeletonSectionPreview />
              <SkeletonSectionPreview />
              <SkeletonSectionPreview />
              <SkeletonSectionPreview />
              <SkeletonSectionPreview />
              <SkeletonSectionPreview />
              <SkeletonSectionPreview />
            </>
          )}
        </div>

        {/* Delete Popup  */}
        {showCreateSectionPopup && (
          <CreateSectionPopup
            showCreateSectionPopup={showCreateSectionPopup}
            setShowCreateSectionPopup={setShowCreateSectionPopup}
            activeUserID={activeUserID}
            parentSectionName={sectionName}
          />
        )}
        {/* Sign In Popup  */}
        {showSignInPopup && (
          <SignInPopup
            popupReason="create section"
            showSignInPopup={showSignInPopup}
            setShowSignInPopup={setShowSignInPopup}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EmbeddedSection;
