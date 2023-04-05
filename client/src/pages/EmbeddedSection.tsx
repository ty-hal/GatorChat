import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
// import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonThreadPreview from "../components/Thread/SkeletonThreadPreview";

type ChildSectionType = {
  section_id: number;
  section_name: string;
  group_id: number;
};

interface Props {
  activeUserID: number;
  checkedCookie: boolean;
}

const Section: React.FC<Props> = ({ activeUserID, checkedCookie }) => {
  const { section_name, section_id } = useParams();
  const navigate = useNavigate();

  const [childSections, setChildSections] = useState<ChildSectionType[]>([]);
  const [sectionName, setSectionName] = useState<string>("");
  //   const [page, setPage] = useState(1);
  //   const [more, setMore] = useState(true);
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
        // if (data && more) {
        setChildSections((childSections) => [
          ...childSections,
          ...data.filter(
            (section: ChildSectionType) =>
              !childSections.some((t) => t.section_id === section.section_id)
          ),
        ]);
        //   setPage((page) => page + 1);
        // } else {
        //   setMore(false);
        // }
      })
      .then(() => {
        setLoaded(true);
      });
  };

  useEffect(() => {
    // If section_id (URL param) is not a number, go back to the previous page
    if (!/^\d+$/.test(section_id || "a")) {
      navigate(-1);
    }
    // If user authentication is checked
    if (checkedCookie) {
      getChildSections();
    }
  }, [section_id, navigate, checkedCookie]);

  return (
    // <InfiniteScroll
    //   dataLength={threads.length}
    //   next={
    //     checkedCookie
    //       ? getThreads
    //       : () =>
    //           console.log(
    //             "InfiniteScroll next not loaded yet -- user auth first"
    //           )
    //   }
    //   hasMore={more}
    //   loader={null}
    // >
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center rounded-xl px-10 pt-6">
        <div
          className="mb-4 h-8 cursor-pointer text-2xl font-semibold hover:underline dark:text-white"
          onClick={() => navigate(-1)}
        >
          {loaded && sectionName}
        </div>

        {loaded ? (
          childSections.length > 0 ? (
            childSections.map((section, index) => {
              return (
                <div className="bg-blue-300 text-red-500">
                  {section.section_name}
                </div>
                //   <ChildSectionPreview
                //     key={index} // For TS map purposes
                //     section_id={section.section_id}
                //     section_name={section_name ? section_name : ""}
                //     updatedOn={section.updated_at}
                //   />
              );
            })
          ) : (
            <div className="mt-6 dark:text-white">
              There are no sections in this section yet.
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
    // </InfiniteScroll>
  );
};

export default Section;
