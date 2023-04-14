import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { darkModeAtom } from "../App";
import { useAtomValue } from "jotai";
import { userIDAtom } from "../App";
import SectionPreview from "../components/Section/SectionPreview";
import SkeletonSectionPreview from "../components/Section/SkeletonSectionPreview";

type Section = {
  section_id: number;
  section_name: string;
  description: string;
  parent_section: boolean;
  thread_count: number;
};

type SearchBarItem = {
  id: number;
  name: string;
  children: boolean;
};

const Home = () => {
  const [parentSections, setParentSections] = useState<Section[]>([]);
  const [userSavedSections, setUserSavedSections] = useState<Section[]>([]);
  const [searchBarItems, setSearchBarItems] = useState<SearchBarItem[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loadedSavedSections, setLoadedSavedSections] =
    useState<boolean>(false);
  const darkMode = useAtomValue(darkModeAtom);
  const activeUserID = useAtomValue(userIDAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user saved sections
    if (activeUserID != null && activeUserID > 0) {
      console.log(activeUserID);
      fetch(`http://localhost:9000/api/user/${activeUserID}/savedsections`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUserSavedSections(data);
          setLoadedSavedSections(true);
        });
    } else if (activeUserID != null && activeUserID === 0) {
      setLoadedSavedSections(true);
    }

    // Get base level sections
    fetch("http://localhost:9000/api/section/1/children", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setParentSections(data);
        setLoaded(true);
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
        // console.log(data);
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
  }, [activeUserID]);

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

      {/* User saved sections */}
      <div className="mx-auto mt-4 w-11/12 text-black dark:text-white">
        <div className="text-center text-2xl font-bold">My Saved Sections</div>
        {loadedSavedSections ? (
          userSavedSections && userSavedSections.length > 0 ? (
            <div className="mt-2 sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-2 lg:grid-cols-4">
              {userSavedSections.map((section, index) => {
                return (
                  <SectionPreview
                    key={index}
                    section_id={section.section_id}
                    section_name={section.section_name}
                    section_description={section.description}
                    parent_section={section.parent_section}
                    thread_count={ section.thread_count ? section.thread_count : 0}
                  />
                );
              })}
            </div>
          ) : (
            <div className="mt-2 text-center">
              {activeUserID === 0
                ? "Sign in to your account to save sections and access them here."
                : "You do not have any sections saved on your account."}
            </div>
          )
        ) : (
          <div className="mt-2 sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-2 lg:grid-cols-4">
            <SkeletonSectionPreview />
            <SkeletonSectionPreview />
            <SkeletonSectionPreview />
            <SkeletonSectionPreview />
          </div>
        )}
      </div>

      {/* Horizontal rule */}
      <hr className="mx-auto mt-12 h-1 w-11/12 rounded border-0 bg-gray-400 dark:bg-gray-700" />

      {/* Display the parent sections */}
      <div className="mx-auto mt-10 w-11/12 text-black dark:text-white">
        <div className="text-center text-2xl font-bold">All Sections</div>
        <div className="mt-2 w-full sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-2 lg:grid-cols-4">
          {loaded ? (
            parentSections.map((section, index) => {
              // console.log(section);
              return (
                <SectionPreview
                  key={index}
                  section_id={section.section_id}
                  section_name={section.section_name}
                  section_description={section.description}
                  parent_section={section.parent_section}
                  thread_count={ section.thread_count ? section.thread_count : 0}
                />
              );
            })
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
      </div>
      <Footer />
    </div>
  );
};

export default Home;
