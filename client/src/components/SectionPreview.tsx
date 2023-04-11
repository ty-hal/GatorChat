import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  section_name: string;
  section_id: number;
  section_description?: string;
  parent: boolean;
};

const SectionPreview: React.FC<Props> = ({
  section_name,
  section_id,
  section_description,
  parent,
}) => {
  let navigate = useNavigate();
  const location = useLocation();
  const [sectionName, setSectionName] = useState<string>("");

  useEffect(() => {
    let temp = section_name.replace(/[\W_]+/g, " ");
    setSectionName(temp.replace(/\s+/g, "-").toLowerCase());
  }, []);

  return (
    <div
      className="m-2 cursor-pointer rounded-2xl border-2 border-gray-500 bg-gray-200 p-2 text-center text-lg font-normal text-gray-900 shadow-md hover:border-blue-600  dark:bg-gray-800 dark:text-white"
      id="section-preview"
      onClick={(e) => {
        console.log(`Open section ${section_id}`);
        // Navigate to the section
        let path = location.pathname;
        if (path === "/") {
          path = "s";
        }
        navigate(`${path}/${section_id}/${sectionName}`);
        if (path !== "s") window.location.reload();
      }}
    >
      {/* Section Name */}
      <div className="text-2xl font-semibold hover:underline">
        {" "}
        {section_name}
      </div>
      {/* Section Description */}
      <div className="my-2 text-base">
        {section_description ? section_description : ""}
      </div>
    </div>
  );
};

export default SectionPreview;