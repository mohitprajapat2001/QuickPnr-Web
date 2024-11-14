import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="289813396319-2bpdlvdug1pu2ldabbga0n76aieg86nt.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
