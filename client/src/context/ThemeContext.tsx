import React, { useState, createContext, useEffect } from "react";

interface IThemeContext {
  dark: boolean;
  toggleDark?: () => void;
  setDark?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  children: React.ReactNode;
}

const defaultState = {
  dark: false,
};

export const ThemeContext = createContext<IThemeContext>(defaultState);

export const ThemeProvider = ({ children }: Props) => {
  const [dark, setDark] = useState(defaultState.dark);

  const toggleDark = () => {
    setDark(!dark);
  };

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggleDark,
        setDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// import React, { useState, useEffect, createContext } from "react";

// interface IThemeContext {
//   dark: boolean;
//   toggleDark?: () => void;
// }

// const defaultState = {
//   dark: false,
// };

// const ThemeContext = createContext<IThemeContext>(defaultState);

// export { ThemeContext, defaultState };
