import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./components/NoPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./Home";
import ThemeProvider from "./providers/ThemeProvider";
import UsersProvider from "./providers/UsersProvider";
import PnrProvider from "./providers/PnrProvider";
import Register from "./apps/users/Register";
import Login from "./apps/users/Login";
import Profile from "./apps/users/Profile";
import { ToastContainer } from "react-toastify";
import ChangePassword from "./apps/users/ChangePassword";
import ForgotPassword from "./apps/users/ForgotPassword";

function App() {
  return (
    <ThemeProvider>
      <UsersProvider>
        <PnrProvider>
          <BrowserRouter>
            <NavBar />
            <ToastContainer
              draggablePercent={60}
              draggable
              className={"capitalize"}
              stacked
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register/" element={<Register />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/profile/" element={<Profile />} />
              <Route path="/change-password/" element={<ChangePassword />} />
              <Route path="/forgot-password/" element={<ForgotPassword />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </PnrProvider>
      </UsersProvider>
    </ThemeProvider>
  );
}

export default App;
