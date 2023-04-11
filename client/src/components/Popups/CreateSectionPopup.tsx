import { useEffect, useState } from "react";

type Props = {
  showCreateSectionPopup: boolean;
  setShowCreateSectionPopup: React.Dispatch<React.SetStateAction<boolean>>;
  activeUserID: number;
  parentSectionName: string;
};

interface emailFormat {
  email: string;
  name: string;
  message: string;
}

const CreateSectionPopup: React.FC<Props> = ({
  showCreateSectionPopup,
  setShowCreateSectionPopup,
  activeUserID,
  parentSectionName,
}) => {
  const [contact, setContact] = useState<emailFormat>({
    email: "",
    name: "",
    message: "",
  });

  useEffect(() => {
    fetch(`http://localhost:9000/api/user/${activeUserID}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let name = data.first_name + " " + data.last_name;
        setContact({ name: name, email: data.email, message: "" });
      });
  }, []);

  const submitRequest = () => {
    if (
      contact.message.length === 0 ||
      contact.message ===
        `Request to create new child section "" in parent section "${parentSectionName}"`
    ) {
      return;
    }

    fetch("http://localhost:9000/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(contact),
    }).then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    });
  };

  return (
    <>
      {showCreateSectionPopup && (
        <div
          className="fixed inset-0 z-10 cursor-auto overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative w-11/12 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:w-5/6 sm:text-left">
                    <div className="mb-2 text-lg font-bold">
                      {" "}
                      Create a section
                    </div>
                    <div className="mb-4">
                      Don't see a section you're looking for? Submit a request
                      to create a new section.
                    </div>

                    <div className="mb-2 text-base">
                      Please enter the section name:
                    </div>
                    <div
                      contentEditable
                      id="other-input"
                      className="block w-full rounded-lg border border-gray-900 p-2 text-left text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      placeholder="Text"
                      title="Enter the section name"
                      onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        setContact({
                          ...contact,
                          message: `Request to create new child section "${
                            (e.target as HTMLInputElement).innerHTML
                          }" in parent section "${parentSectionName}"`,
                        });
                      }}
                    />
                  </div>
                  {/* X button  */}
                  <div
                    className="-mt-1 ml-12 hidden cursor-pointer sm:block"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCreateSectionPopup(false);
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
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCreateSectionPopup(false);
                    submitRequest();
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCreateSectionPopup(false);
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

export default CreateSectionPopup;
