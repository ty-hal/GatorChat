type Props = {
  title: string;
  children: string;
  id: number;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  onClick: () => void;
};

const AccordionUI: React.FC<Props> = ({
  title,
  children,
  id,
  index,
  setIndex,
}) => {
  const handleSetIndex = (id: number) => {
    if (index !== id) setIndex(id);
    else setIndex(0);
  };

  let expanded = (
    <svg
      data-accordion-icon
      className="w-6 h-6 rotate-180 shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );

  let collapsed = (
    <svg
      data-accordion-icon
      className="w-6 h-6 shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );

  return (
    <>
      <div
        id={`question-${id}`}
        onClick={() => handleSetIndex(id)}
        className="flex group cursor-pointer w-full md:w-2/3 mx-auto h-16 justify-between  items-center p-2 mt-4 first:mt-0 rounded-md bg-gray-900 dark:bg-gray-50 shadow-xl md:text-lg "
      >
        <div className="flex group cursor-pointer ">
          <div
            id={`title-${id}`}
            className="text-white dark:text-gray-900 font-bold pl-4 md:pl-10  group-hover:text-blue-600"
            onClick={() => {}}
          >
            {title}
          </div>
        </div>

        <div className="flex items-center justify-center md:pr-10">
          {index === id ? expanded : collapsed}
        </div>
      </div>

      {index === id && (
        <div className="bg-blue-200 md:pl-10  font-semibold text-gray-700 w-full md:w-2/3 h-auto  rounded-md p-4 border-l-2 border-blue-300 mb-2 mt-0.5">
          {children}
        </div>
      )}
    </>
  );
};

export default AccordionUI;
