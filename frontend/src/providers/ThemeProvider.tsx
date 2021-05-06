import React, { useEffect, useState, useMemo, createContext } from "react";
import * as cookie from "@utils/cookie";

// @ts-ignore
export const ThemeContext = createContext<any>();

export const ThemeProvider = ({ children, themeCookie }: { children: JSX.Element, themeCookie: any }) => {
  const [theme, setTheme] = useState(themeCookie || undefined);


  useEffect(() => {
    if (theme !== undefined) {
      document.documentElement.setAttribute("data-theme", theme);
      cookie.setCookie("theme", theme);
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

