import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import SkeletonThreadPreview from "../components/Thread/SkeletonThreadPreview";
import SectionPreview from "../components/SectionPreview";

type ChildSectionType = {
  section_id: number;
  section_name: string;
  group_id: number;
};

interface Props {
  activeUserID: number;
  checkedCookie: boolean;
  section_name: string;
  section_id: string;
}

const EmbeddedSection: React.FC<Props> = ({
  activeUserID,
  checkedCookie,
  section_name,
  section_id,
}) => {
  const navigate = useNavigate();
  const [childSections, setChildSections] = useState<ChildSectionType[]>([]);
  const [sectionName, setSectionName] = useState<string>("");
  const [loaded, setLoaded] = useState(false);

  const getChildSections = () => {
    fetch(`http://localhost:9000/api/section/${section_id}/children`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChildSections((childSections) => [
          ...childSections,
          ...data.filter(
            (section: ChildSectionType) =>
              !childSections.some((t) => t.section_id === section.section_id)
          ),
        ]);
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
      });
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
      <div className="flex flex-col items-center rounded-xl px-10 pt-3">
        <div
          className="mb-2 h-8 cursor-pointer text-2xl font-semibold hover:underline dark:text-white"
          onClick={() => navigate(-1)}
        >
          {loaded && sectionName}
        </div>

        {loaded ? (
          childSections.length > 0 ? (
            <div className="w-full sm:grid sm:grid-cols-2 sm:gap-2  lg:grid-cols-3">
              {childSections.map((section, index) => {
                return (
                  <SectionPreview
                    key={index}
                    section_id={section.section_id}
                    section_name={section.section_name}
                    section_description={undefined}
                    parent={false}
                  />
                );
              })}
            </div>
          ) : (
            <div className="mt-6 dark:text-white">
              There are no child sections in this section yet.
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
