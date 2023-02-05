import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

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
import { useLayoutEffect } from "react";

export const darkModeAtom = atomWithStorage("dark-mode", true);

type WrapperProps = {
  children: JSX.Element;
};
export default function App() {
  const Wrapper = ({ children }: WrapperProps) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  const [darkMode] = useAtom(darkModeAtom);

  return (
    <BrowserRouter>
      <Wrapper>
        <div className={darkMode ? "dark" : ""}>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route
              path="terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="settings" element={<Settings />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </Wrapper>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

reportWebVitals();
