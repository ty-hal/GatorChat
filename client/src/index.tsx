import App from "./App";
import { useLayoutEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";

import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

type ScrollWrapperProps = {
  children: JSX.Element;
};

const ScrollWrapper = ({ children }: ScrollWrapperProps) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <ScrollWrapper>
      <App />
    </ScrollWrapper>
  </BrowserRouter>
);

reportWebVitals();
