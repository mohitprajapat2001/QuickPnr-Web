/**NavBar Theme Options */
import { themes } from "../utils/contants";

function Options() {
  /**Daisy UI Themes */
  return (
    <>
      {themes.map((themeOption) => (
        <option key={themeOption} value={themeOption}>
          {themeOption}
        </option>
      ))}
    </>
  );
}

export default Options;
