import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";
import ForgotPassword from "./pages/ForgotPassword";
import TermsAndConditions from "./pages/TermsAndConditions";
import Settings from "./pages/Settings";
import FAQ from "./pages/FAQ";

export const darkModeAtom = atomWithStorage("dark-mode", true);

export default function App() {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  return (
    <BrowserRouter>
      <div className={darkMode ? "dark" : ""}>
        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle {darkMode ? "dark" : " light"} mode
        </button>

        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="settings" element={<Settings />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

reportWebVitals();
