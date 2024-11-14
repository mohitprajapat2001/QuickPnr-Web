// UsersProvider.js
// import React, { useState } from "react";
import Context from "../context/Contexts";
import { accountsUrl } from "../utils/contants";
import axios from "axios";
import { getBearerToken, removeLocalStorage } from "../utils/utils";
import { useState } from "react";
import {
  ExceptionHandling,
  LoadingToast,
  ErrorToast,
} from "../utils/ToastPromiseHandling";
import {
  userRegister,
  userLogin,
  FetchUserProfile,
  UpdateUserEmail,
  VerifyEmail,
  OtpGenerated,
  UpdatePasswordSuccess,
  userLogout,
  forgotPasswordOtpSentSuccess,
  forgotPasswordOtpValidateSuccess,
} from "../utils/SuccessToasts";

const UsersProvider = ({ children }) => {
  /**Toggle Password Visibility State */
  let id = null;
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState({});
  const toggleState = () => {
    setToggle(!toggle);
  };

  const axiosRequest = async (
    url,
    method,
    data,
    header,
    callBack,
    toast_id,
    successUrl
  ) => {
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
        callBack(toast_id, response.data, successUrl);
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
  const googleRegister = async (data) => {
    id = LoadingToast("Registering User...");
    await axiosRequest(
      accountsUrl + "auth-google-signup/",
      "POST",
      data,
      null,
      userRegister,
      id,
      "/login/"
    );
  };
  const googleLogin = async (data) => {
    id = LoadingToast("Logging In...");
    await axiosRequest(
      accountsUrl + "auth-google-login/",
      "POST",
      data,
      null,
      userLogin,
      id,
      "/"
    );
  };
  const registerUser = async (data) => {
    id = LoadingToast("Registering User...");
    await axiosRequest(
      accountsUrl + "register/",
      "POST",
      data,
      null,
      userRegister,
      id,
      "/login/"
    );
  };
  const loginUser = async (data) => {
    id = LoadingToast("Logging In...");
    await axiosRequest(
      accountsUrl + "login/",
      "POST",
      data,
      null,
      userLogin,
      id,
      "/"
    );
  };

  const logOut = () => {
    id = LoadingToast("Logging Out...", {
      onClose: () => {
        window.location.href = "/login/";
      },
    });
    removeLocalStorage("access");
    removeLocalStorage("refresh");
    userLogout(id, "Logged Out Successfully");
  };

  const fetchUserProfile = async () => {
    let response = await axiosRequest(
      accountsUrl + "profile/",
      "GET",
      null,
      getBearerToken(),
      setUser
    );
    setUser(response);
  };

  const updateUserProfile = async (data) => {
    id = LoadingToast("Updating Profile...");
    let response = await axiosRequest(
      accountsUrl + "profile/",
      "PATCH",
      data,
      getBearerToken(),
      FetchUserProfile,
      id
    );
    setUser(response);
  };

  const updateUserEmail = async (data) => {
    id = LoadingToast("Updating Email...");
    await axiosRequest(
      accountsUrl + "update-email/",
      "PATCH",
      data,
      getBearerToken(),
      UpdateUserEmail,
      id
    );
  };
  const verifyUserEmail = async (data) => {
    id = LoadingToast("Verifying Email...");
    await axiosRequest(
      accountsUrl + "verify-email/",
      "PATCH",
      data,
      getBearerToken(),
      VerifyEmail,
      id
    );
  };
  const generateOtp = async () => {
    id = LoadingToast("Generating OTP...");
    await axiosRequest(
      accountsUrl + "verify-email/",
      "GET",
      null,
      getBearerToken(),
      OtpGenerated,
      id
    );
  };
  const updatePassword = async (data) => {
    id = LoadingToast("Updating Password...");
    await axiosRequest(
      accountsUrl + "change-password/",
      "PATCH",
      data,
      getBearerToken(),
      UpdatePasswordSuccess,
      id
    );
  };
  const forgotPasswordOtpSent = async (data) => {
    id = LoadingToast("Sending Password Reset OTP...");
    await axiosRequest(
      accountsUrl + "forgot-password/",
      "POST",
      data,
      null,
      forgotPasswordOtpSentSuccess,
      id
    );
  };
  const forgotPasswordOtpValidate = async (data) => {
    id = LoadingToast("Resetting Passwords...");
    await axiosRequest(
      accountsUrl + "forgot-password/",
      "PATCH",
      data,
      null,
      forgotPasswordOtpValidateSuccess,
      id,
      "/login/"
    );
  };

  const data = {
    registerUser,
    loginUser,
    logOut,
    toggleState,
    toggle,
    user,
    setUser,
    fetchUserProfile,
    updateUserProfile,
    updateUserEmail,
    verifyUserEmail,
    generateOtp,
    updatePassword,
    forgotPasswordOtpSent,
    forgotPasswordOtpValidate,
    googleRegister,
    googleLogin,
  };

  return (
    <Context.UserContext.Provider value={data}>
      {children}
    </Context.UserContext.Provider>
  );
};

export default UsersProvider;
