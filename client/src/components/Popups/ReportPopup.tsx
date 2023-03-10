import { useState } from "react";

type Props = {
  id: number;
  title?: string;
  showReportPopup: boolean;
  setShowReportPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReportPopup: React.FC<Props> = ({
  id,
  title,
  showReportPopup,
  setShowReportPopup,
}) => {
  const [reportOption, setReportOption] = useState<string[]>([]);
  const [otherOption, toggleOtherOption] = useState<boolean>(false);

  const reportPost = () => {
    console.log(title, "ID:", id, "Report:", reportOption);
    setShowReportPopup(false);
    // Figure out what to do for reporting posts (send us an email?)
  };

  return (
    <>
      {showReportPopup && (
        <div
          className="fixed inset-0 z-10 cursor-auto overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative w-11/12 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-3/4 sm:max-w-3xl">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  {/* Left Text */}
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      {title ? `Report thread` : `Report message`}
                    </h3>
                    {/* Report options */}
                    <div
                      className="mt-4 flex flex-wrap gap-2 text-sm font-semibold text-black sm:mt-8 sm:-ml-12 sm:-mr-4 md:text-sm"
                      id="report-options"
                    >
                      <div
                        className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-black p-2 text-center text-black hover:bg-red-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.currentTarget.classList.toggle("bg-red-300");
                          reportOption.includes("Harassment")
                            ? setReportOption(
                                reportOption.filter(
                                  (item) => item !== "Harassment"
                                )
                              )
                            : setReportOption([...reportOption, "Harassment"]);
                        }}
                      >
                        Harassment
                      </div>
                      <div
                        className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-black p-2 text-center hover:bg-red-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.currentTarget.classList.toggle("bg-red-300");
                          reportOption.includes("Spam")
                            ? setReportOption(
                                reportOption.filter((item) => item !== "Spam")
                              )
                            : setReportOption([...reportOption, "Spam"]);
                        }}
                      >
                        Spam
                      </div>
                      <div
                        className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-black p-2 text-center hover:bg-red-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.currentTarget.classList.toggle("bg-red-300");
                          reportOption.includes("Inappropriate content")
                            ? setReportOption(
                                reportOption.filter(
                                  (item) => item !== "Inappropriate content"
                                )
                              )
                            : setReportOption([
                                ...reportOption,
                                "Inappropriate content",
                              ]);
                        }}
                      >
                        Inappropriate content
                      </div>
                      <div
                        className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-black p-2 text-center hover:bg-red-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.currentTarget.classList.toggle("bg-red-300");
                          reportOption.includes("Threatening violence")
                            ? setReportOption(
                                reportOption.filter(
                                  (item) => item !== "Threatening violence"
                                )
                              )
                            : setReportOption([
                                ...reportOption,
                                "Threatening violence",
                              ]);
                        }}
                      >
                        Threatening violence
                      </div>
                      <div
                        className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-black p-2 text-center hover:bg-red-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.currentTarget.classList.toggle("bg-red-300");
                          reportOption.includes("Hate")
                            ? setReportOption(
                                reportOption.filter((item) => item !== "Hate")
                              )
                            : setReportOption([...reportOption, "Hate"]);
                        }}
                      >
                        Hate
                      </div>
                      <div
                        className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-black p-2 text-center hover:bg-red-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.currentTarget.classList.toggle("bg-red-300");
                          reportOption.includes("Sharing personal information")
                            ? setReportOption(
                                reportOption.filter(
                                  (item) =>
                                    item !== "Sharing personal information"
                                )
                              )
                            : setReportOption([
                                ...reportOption,
                                "Sharing personal information",
                              ]);
                        }}
                      >
                        Sharing personal information
                      </div>
                      <div
                        className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-black p-2 text-center hover:bg-red-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.currentTarget.classList.toggle("bg-red-300");
                          reportOption.includes("Self-harm or suicide")
                            ? setReportOption(
                                reportOption.filter(
                                  (item) => item !== "Self-harm or suicide"
                                )
                              )
                            : setReportOption([
                                ...reportOption,
                                "Self-harm or suicide",
                              ]);
                        }}
                      >
                        Self-harm or suicide
                      </div>
                      <div
                        className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-black p-2 text-center hover:bg-red-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.currentTarget.classList.toggle("bg-red-300");
                          reportOption.includes("Copyright infringement")
                            ? setReportOption(
                                reportOption.filter(
                                  (item) => item !== "Copyright infringement"
                                )
                              )
                            : setReportOption([
                                ...reportOption,
                                "Copyright infringement",
                              ]);
                        }}
                      >
                        Copyright infringement
                      </div>
                      <div
                        className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-black p-2 text-center hover:bg-red-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.currentTarget.classList.toggle("bg-red-300");
                          reportOption.includes("Impersonation")
                            ? setReportOption(
                                reportOption.filter(
                                  (item) => item !== "Impersonation"
                                )
                              )
                            : setReportOption([
                                ...reportOption,
                                "Impersonation",
                              ]);
                        }}
                      >
                        Impersonation
                      </div>
                      <div
                        className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-black p-2 text-center hover:bg-red-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.currentTarget.classList.toggle("bg-red-300");
                          reportOption.includes("Scam")
                            ? setReportOption(
                                reportOption.filter((item) => item !== "Scam")
                              )
                            : setReportOption([...reportOption, "Scam"]);
                        }}
                      >
                        Scam
                      </div>
                      <div
                        className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-black p-2 text-center hover:bg-red-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.currentTarget.classList.toggle("bg-red-300");
                          toggleOtherOption(!otherOption);
                        }}
                      >
                        Other
                      </div>
                    </div>
                    {/* Other option text */}
                    {otherOption && (
                      <div className="mt-8 text-black sm:-ml-12 sm:-mr-4">
                        <label
                          htmlFor="other"
                          className="mb-2 block text-sm  text-gray-900"
                        >
                          {`Please provide a brief explanation for why you are reporting this ${
                            title ? "thread:" : "message:"
                          }`}
                        </label>
                        <div
                          contentEditable
                          id="other-input"
                          className="block w-full rounded-lg border border-gray-900 p-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                          placeholder="Text"
                          title="Enter a description"
                          onKeyUp={(
                            e: React.KeyboardEvent<HTMLInputElement>
                          ) => {
                            setReportOption([
                              (e.target as HTMLInputElement).innerHTML,
                            ]);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {/* X button  */}
                  <div
                    className="-mt-1 -mr-2 hidden cursor-pointer sm:block"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowReportPopup(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 28 28"
                      width="30"
                      height="30"
                      className="fill-gray-600"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Bottom buttons  */}
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    reportPost();
                  }}
                >
                  Report
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowReportPopup(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportPopup;
