// ThemeProvider.js
import React, { useState } from "react";
import Context from "../context/Contexts";
import { getLocalStorage, updateLocalStorage } from "../utils/utils";

const ThemeProvider = ({ children }) => {
  let [theme, setTheme] = useState(getLocalStorage("theme") || "light");

  const updateTheme = (event) => {
    setTheme((theme = event.target.value));
    updateLocalStorage("theme", theme);
  };

  return (
    <Context.ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </Context.ThemeContext.Provider>
  );
};

export default ThemeProvider;
