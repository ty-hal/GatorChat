import { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";
import ForgotPassword from "./pages/ForgotPassword";
import TermsAndConditions from "./pages/TermsAndConditions";
import  Settings from "./pages/Settings";

export default function App() {
  const [dark, toggleDark] = useState(true);
  return (
    <BrowserRouter>
      <div className={dark ? "dark" : ""}>
        <button onClick={() => toggleDark(!dark)}>
          Toggle {dark ? "dark" : " light"} mode
        </button>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path = "Settings" element = {<Settings/>}/>
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
