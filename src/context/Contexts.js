// ThemeContext.js
import React from "react";
import { getLocalStorage } from "../utils/utils";

const ThemeContext = React.createContext(getLocalStorage("theme") || "light");
const UserContext = React.createContext(null);
const PnrContext = React.createContext(null);

const Context = {
  ThemeContext,
  UserContext,
  PnrContext,
};
export default Context;
