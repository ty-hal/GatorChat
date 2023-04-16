import { Link } from "react-router-dom";

type Props = {
  popupReason?: string;
  showSignInPopup: boolean;
  setShowSignInPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignInPopup: React.FC<Props> = ({
  popupReason,
  showSignInPopup,
  setShowSignInPopup,
}) => {
  return (
    <>
      {showSignInPopup && (
        <div
          className="fixed inset-0 z-10 cursor-auto overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative w-11/12 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 fill-red-500"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:w-5/6 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Sign in to{" "}
                      {popupReason === "create thread"
                        ? "create a thread"
                        : popupReason === "reply"
                        ? "reply"
                        : popupReason === "like message"
                        ? "like a message"
                        : popupReason === "like thread"
                        ? "like a thread"
                        : popupReason === "save thread"
                        ? "save a thread"
                        : popupReason === "save section"
                        ? "save a section"
                        : popupReason === "save message"
                        ? "save a message"
                        : popupReason === "create section"
                        ? "create a section"
                        : ""}
                    </h3>
                    <div className="mt-2">
                      <p className="break-words text-sm text-gray-500">
                        In order to{" "}
                        {popupReason === "create thread"
                          ? "create a thread, "
                          : popupReason === "reply"
                          ? "reply, "
                          : popupReason === "like message"
                          ? "like a message, "
                          : popupReason === "like thread"
                          ? "like a thread, "
                          : popupReason === "save thread"
                          ? "save a thread, "
                          : popupReason === "save section"
                          ? "save a section, "
                          : popupReason === "save message"
                          ? "save a message, "
                          : popupReason === "create section"
                          ? "create a section, "
                          : ""}{" "}
                        you must first sign in to your account.
                      </p>
                    </div>
                  </div>
                  {/* X button  */}
                  <div
                    className="-mt-1 -mr-2 hidden cursor-pointer sm:block"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSignInPopup(false);
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
              {/* Buttons */}
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Link to="/sign-in" target="_blank" rel="noopener noreferrer">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSignInPopup(false);
                    }}
                  >
                    Sign in
                  </button>
                </Link>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSignInPopup(false);
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

export default SignInPopup;
