import React, { useEffect, useState, useMemo, createContext } from "react";


// @ts-ignore
export const ThemeContext = createContext<any>();

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );
    setTheme(initialColorValue);
  }, []);

  useEffect(() => {
    if (theme !== undefined) {
      document.documentElement.setAttribute("data-theme", theme);
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const contextValue = useMemo(() => {
    return {
      theme,
      setTheme,
    };
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
