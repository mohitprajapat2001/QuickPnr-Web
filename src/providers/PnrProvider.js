// ThemeProvider.js
import React, { useState, useContext } from "react";
import Context from "../context/Contexts";
import { toast } from "react-toastify";
import { pnrFetchUrl } from "../utils/contants";
import { getBearerToken } from "../utils/utils";
import axios from "axios";
import {
  ExceptionHandling,
  LoadingToast,
  ErrorToast,
  SuccessToast,
} from "../utils/ToastPromiseHandling";
const PnrProvider = ({ children }) => {
  let id = null;
  const [pnrDetails, setPnrDetails] = useState(null);
  const [pnr, setPnr] = useState(null);
  const { logOut } = useContext(Context.UserContext);
  const axiosRequest = async (url, method, data, header, callBack) => {
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
        callBack(response.data);
      }
      return response.data;
    } catch (error) {
      console.error(error);
      if (error.status && error.response.status === 401) {
        logOut();
      } else if (error.status && error.response.status === 400) {
        ExceptionHandling(id, error);
      } else if (error.status && error.response.status === 404) {
        ExceptionHandling(id, error);
      } else if (error.status && error.response.status === 403) {
        ExceptionHandling(id, error);
      } else {
        ErrorToast(id, error.message);
      }
    }
  };
  /**Fetch PNR Details */
  const fetchPnrDetails = async (data) => {
    /**Fetch PNR Details */
    id = LoadingToast("Loading PNR Status...");
    setPnr(data);
    await axiosRequest(
      pnrFetchUrl,
      "POST",
      {
        pnr: data,
      },
      getBearerToken(),
      fetchPnrCallback
    );
  };
  const fetchPnrCallback = (response) => {
    /**Fetch PNR Details Callback */
    setPnrDetails(response);
    SuccessToast(id, "PNR Details Loaded...");
  };
  /**Update PNR Details */
  const handlePnrUpdate = async () => {
    /**Update PNR Details */
    id = toast.loading("Updating PNR Details...");
    await axiosRequest(
      pnrFetchUrl,
      "PATCH",
      {
        pnr: pnr,
      },
      getBearerToken(),
      updatePnrCallback
    );
  };
  const updatePnrCallback = (response) => {
    /**Fetch PNR Details Callback */
    setPnrDetails(response);
    SuccessToast(id, "PNR Details Updated...");
  };
  /**Get Request to Mail PNR Details */
  const handlePnrDetailsMail = async () => {
    /**Fetch PNR Details Callback */
    id = LoadingToast("Mailing PNR Status...");
    await axiosRequest(
      pnrFetchUrl + `?pnr=${pnr}&mail=true`,
      "GET",
      null,
      getBearerToken(),
      pnrDetailsMailCallback
    );
  };
  const pnrDetailsMailCallback = (response) => {
    SuccessToast(id, response.message);
  };
  const data = {
    pnrDetails,
    fetchPnrDetails,
    handlePnrUpdate,
    handlePnrDetailsMail,
  };
  return (
    <Context.PnrContext.Provider value={data}>
      {children}
    </Context.PnrContext.Provider>
  );
};

export default PnrProvider;
