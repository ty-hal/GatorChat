type Props = {
  id: number;
  title?: string;
  showDeletePopup: boolean;
  setShowDeletePopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeletePopup: React.FC<Props> = ({
  id,
  title,
  showDeletePopup,
  setShowDeletePopup,
}) => {
  const deletePost = () => {
    console.log(title, "ID:", id);
    setShowDeletePopup(false);

    if (title) {
      fetch(`http://localhost:9000/api/thread/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      }).then((response) => {
        if (response.status === 200) {
          window.location.reload();
          return response.json();
        }
      });
    }
    // If the popup is for a message
    else {
      fetch(`http://localhost:9000/api/post/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            window.location.reload();
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
        });
    }
  };

  return (
    <>
      {showDeletePopup && (
        <div
          className="fixed inset-0 z-10 cursor-auto overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative w-11/12 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
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
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:w-5/6 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      {title ? `Delete thread` : `Delete message`}
                    </h3>
                    <div className="mt-2">
                      <p className="break-words text-sm text-gray-500">
                        {title
                          ? `Are you sure you want to delete the thread 
                        "${title}"?
                        The thread will be permanently removed. This action
                        cannot be undone.`
                          : `Are you sure you want to delete this message?
                        The message will be permanently removed. This action
                        cannot be undone.`}
                      </p>
                    </div>
                  </div>
                  {/* X button  */}
                  <div
                    className="-mt-1 -mr-2 hidden cursor-pointer sm:block"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeletePopup(false);
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
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  id="delete-btn"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePost();
                    window.location.reload();
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeletePopup(false);
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

export default DeletePopup;
