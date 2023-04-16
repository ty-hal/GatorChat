import Footer from "../components/Footer";
import { useAtomValue } from "jotai";
import { userIDAtom } from "../App";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Thread = {
  thread_id: number;
  section_id: number;
  section_name: string;
  user_id: number;
  username: string;
  thread_title: string;
  content: string;
  creation_date: string;
  updated_at: string;
  likes: number;
  message_count: number;
  user_liked: boolean;
  user_admin: boolean;
  user_saved: boolean;
};

type Message = {
  thread_id: number;
  user_id: number;
  username: string;
  post_id: number;
  content: string;
  creation_date: string;
  updated_at: string;
  likes: number;
  user_liked: boolean;
};

const MyAccount = () => {
  const [userAdmin, setUserAdmin] = useState<boolean>(false);

  const activeUserID = useAtomValue(userIDAtom);

  // Get user permissions
  const getUserPermission = () => {
    fetch(`http://localhost:9000/api/user/${activeUserID}/roles`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserAdmin(
          data.some(
            (role: { role_id: number; role_name: string }) =>
              role.role_name === "Admin"
          )
        );
      });
  };

  useEffect(() => {
    // Get user saved threads
    if (activeUserID != null && activeUserID > 0) {
      getUserPermission();
    }
  }, [activeUserID]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto w-11/12 pt-4 text-black dark:text-white">
        {/* Thread and Messages Links*/}
        <div className="flex justify-evenly">
          <Link to="/my-account/my-threads">
            <div className="rounded-lg  bg-blue-600 p-2 font-medium hover:bg-blue-500">
              {" "}
              My Threads
            </div>
          </Link>
          <Link to="/my-account/my-messages">
            <div className="rounded-lg  bg-blue-600 p-2 font-medium hover:bg-blue-500">
              {" "}
              My Messages
            </div>
          </Link>
          <Link to="/my-account/saved-threads">
            <div className="rounded-lg  bg-blue-600 p-2 font-medium hover:bg-blue-500">
              {" "}
              Saved Threads
            </div>
          </Link>
          <Link to="/my-account/saved-messages">
            <div className="rounded-lg  bg-blue-600 p-2 font-medium hover:bg-blue-500">
              {" "}
              Saved Messages
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccount;
