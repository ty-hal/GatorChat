import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/User/SignIn";
import Register from "./pages/User/Register";
import NoPage from "./pages/NoPage";
import ForgotPassword from "./pages/User/ForgotPassword";
import TermsAndConditions from "./pages/TermsAndConditions";
import Settings from "./pages/User/Settings";
import FAQ from "./pages/FAQ";
import ContactUs from "./pages/User/ContactUs";
import DefaultSection from "./pages/Messaging/DefaultSection";
import MyAccount from "./pages/User/MyAccount";
import MyThreads from "./components/Account/MyThreads";
import MyMessages from "./components/Account/MyMessages";
import SavedThreads from "./components/Account/SavedThreads";
import SavedMessages from "./components/Account/SavedMessages";
import Thread from "./pages/Messaging/Thread";

// Uses local storage to detect user dark mode preference
export const darkModeAtom = atomWithStorage("dark-mode", true);
// Save user_id in state
export const userIDAtom = atom<number | null>(null);

export default function App() {
  const [darkMode] = useAtom(darkModeAtom);
  const [userID, setUserID] = useAtom(userIDAtom);
  const [checkedCookie, setCheckedCookie] = useState<boolean>(false);

  // Authenticate user upon render
  useEffect(() => {
    fetch("http://localhost:9000/api/user/validate", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        // User is signed in
        if (response.status === 200) {
          return response.json();
        }

        // User is not signed in
        else if (response.status === 404) {
          console.log("No cookie found (not logged in)");
          setUserID(0);
        }

        // User is not authenticated
        else if (response.status === 401) {
          console.log("User is not authenticated");
          setUserID(0);
        }
        // Other errors
        else if (response.status === 409) {
          console.log("Error with database");
          setUserID(0);
        } else {
          console.log("Uncaught error -- debug!");
          setUserID(0);
        }
      })
      .then((data) => {
        if (data) {
          console.log("User signed in");
          setUserID(data.user_id);
        }
      })
      .then(() => {
        setCheckedCookie(true);
      });
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        {/* Section AND Threads*/}
        <Route
          path="/s/*"
          element={
            <DefaultSection
              activeUserID={userID || 0}
              checkedCookie={checkedCookie}
            />
          }
        />
        {/* Threads accessed from My Account */}
        <Route
          path="/t/:param_thread_id/:param_thread_name"
          element={
            <Thread activeUserID={userID || 0} checkedCookie={checkedCookie} />
          }
        />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="settings" element={<Settings />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="my-account" element={<MyAccount />} />
        <Route path="my-account/my-threads" element={<MyThreads />} />
        <Route path="my-account/my-messages" element={<MyMessages />} />
        <Route path="my-account/saved-threads" element={<SavedThreads />} />
        <Route path="my-account/saved-messages" element={<SavedMessages />} />

        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}
