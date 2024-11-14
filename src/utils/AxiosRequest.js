/**Handle Common Axios Request */
import axios from "axios";
import { ExceptionHandling } from "./ToastPromiseHandling";
import Context from "../context/Contexts";
import { useContext } from "react";

export const AxiosRequest = async (
  url,
  method,
  data,
  header,
  callBack,
  toast_id
) => {
  const { logOut } = useContext(Context.UserContext);
  let headers = {
    "Content-Type": "multipart/form-data",
  };
  if (header) {
    headers["Authorization"] = header;
  }
  headers["Accept"] = "application/json";
  try {
    let response = await axios({
      method: method,
      url: url,
      data: data,
      headers: headers,
    });
    if (callBack) {
      callBack(toast_id, response.data);
    }
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 401) {
      logOut();
    } else {
      ExceptionHandling(toast_id, error);
    }
  }
};
