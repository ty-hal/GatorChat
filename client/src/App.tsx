import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";
import ForgotPassword from "./pages/ForgotPassword";
import TermsAndConditions from "./pages/TermsAndConditions";
import Settings from "./pages/Settings";
import FAQ from "./pages/FAQ";
import Contactus from "./pages/Contactus";
//Delete eventually
import SampleMessages from "./pages/DeleteLater/SampleMessages";
import SampleThreadsPreview from "./pages/DeleteLater/SampleThreadsPreview";
import SampleThread from "./pages/DeleteLater/SampleThread";

// Uses local storage to detect user dark mode preference
export const darkModeAtom = atomWithStorage("dark-mode", true);

export default function App() {
  const [darkMode] = useAtom(darkModeAtom);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        {/* Eventually delete these samples/turn them into actual pages */}
        <Route path="sample-messages" element={<SampleMessages />} />
        <Route
          path="sample-threads-preview"
          element={<SampleThreadsPreview />}
        />
        <Route path="sample-thread" element={<SampleThread />} />

        <Route path="sign-in" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="settings" element={<Settings />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact-us" element={<Contactus />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}
