import React, { createContext, useEffect, useMemo, useState } from "react";
import * as cookie from "@utils/cookie";

// @ts-ignore
export const ThemeContext = createContext<any>();

export const ThemeProvider = ({
  children,
  themeCookie,
}: {
  children: JSX.Element;
  themeCookie: any;
}) => {
  const [theme, setTheme] = useState(themeCookie || undefined);

  useEffect(() => {
    if (theme !== undefined) {
      document.documentElement.setAttribute("data-theme", theme);
      cookie.setCookie("theme", theme);
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)");
      cookie.setCookie("theme", isDark ? "dark" : "light");
      setTheme(isDark ? "dark" : "light");
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
