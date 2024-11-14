/**React Utilities */
import axios from "axios";
import { userDetailsGoogle } from "../utils/contants";
export const updateLocalStorage = (key, value) => {
  /**Update Browser's LocalStorage Value */
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key) => {
  /**Get Browser's Local Storage Item */
  return localStorage.getItem(key);
};

export const removeLocalStorage = (key) => [
  /**Remove Browser's Local Storage Item */
  localStorage.removeItem(key),
];
export const getBearerToken = () => {
  return "Bearer " + getLocalStorage("access");
};

export const get_user_google_credentials = async (access_token) => {
  /**Get User Login Information Google */
  try {
    let response = await axios({
      method: "GET",
      url: userDetailsGoogle + access_token,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
