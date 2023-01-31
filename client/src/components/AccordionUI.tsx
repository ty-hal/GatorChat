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
      className="h-6 w-6 shrink-0 rotate-180"
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
      className="h-6 w-6 shrink-0"
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
        className="group mx-auto mt-4 flex h-16 w-full cursor-pointer items-center  justify-between rounded-md bg-gray-900 p-2 shadow-xl first:mt-0 dark:bg-gray-50 md:w-2/3 md:text-lg "
      >
        <div className="group flex cursor-pointer ">
          <div
            id={`title-${id}`}
            className="pl-4 font-bold text-white group-hover:text-blue-600 dark:text-gray-900  md:pl-10"
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
        <div className="mb-2 mt-0.5  h-auto w-full rounded-md border-l-2 border-blue-300  bg-blue-200 p-4 font-semibold text-gray-700 md:w-2/3 md:pl-10">
          {children}
        </div>
      )}
    </>
  );
};

export default AccordionUI;
