/* eslint-disable jsx-a11y/no-redundant-roles */
/**Nav Bar Links */
import { getLocalStorage } from "../utils/utils";
import Context from "../context/Contexts";
import { useContext } from "react";
function NavBarLinks() {
  /**Nav Bar Links Based on User Authentication */
  const { logOut } = useContext(Context.UserContext);
  const accessToekn = getLocalStorage("access");
  if (accessToekn) {
    return (
      <>
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <button role="button" onClick={logOut}>
            Logout
          </button>
        </li>
      </>
    );
  } else {
    return (
      <>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/register">Register</a>
        </li>
      </>
    );
  }
}

export default NavBarLinks;
