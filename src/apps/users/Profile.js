/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/**Profile Page*/
import React, { useContext, useEffect } from "react";
import Context from "../../context/Contexts";
import { BsMailbox, BsMapFill, BsPerson } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import UpdateProfile from "./UpdateProfile";
import profile from "../../static/img/profile.jpg";

function Profile() {
  const { user, fetchUserProfile } = useContext(Context.UserContext);
  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="hero py-9 bg-base-200 min-h-screen">
        <div className="max-w-4xl flex items-center flex-wrap mx-auto my-32 lg:my-0">
          <div
            id="profile"
            className="w-full lg:w-3/5 rounded-lg lg:rounded-lg shadow-2xl border bg-base-100  mx-6 lg:mx-0"
          >
            <div className="p-4 md:p-12 text-center lg:text-left">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold pt-8 lg:pt-0 capitalize">
                  {user.first_name
                    ? user.first_name + " " + user.last_name
                    : user.username}
                </h1>

                {(user.is_verified && (
                  <div className="badge badge-primary badge-lg rounded-full">
                    <MdVerified />
                  </div>
                )) ||
                  null}
              </div>
              <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
              <p className="pt-4 flex items-center justify-center lg:justify-start items-center">
                <span className="h-4 fill-current text-green-700 pr-4">
                  <BsMailbox />
                </span>
                {user.email}
              </p>
              <p className="pt-2 lg:text-sm flex items-center justify-center lg:justify-start items-center">
                <span className="h-4 fill-current text-green-700 pr-4">
                  <BsMapFill />
                </span>
                {user.address || (
                  <span className="text-warning">Update Address</span>
                )}
              </p>
              <p className="pt-2 lg:text-sm flex items-center justify-center lg:justify-start items-center">
                <span className="h-4 fill-current text-green-700 pr-4">
                  <BsPerson />
                </span>
                {user.age || <span className="text-warning">Update Age</span>}
              </p>
              <div className="pt-5 flex md:flex-row sm:flex-col gap-5 justify-center items-center">
                <button className="btn btn-sm">
                  Date Joined
                  <div className="badge badge-secondary">
                    {new Date(user.date_joined).toString().slice(4, 15)}
                  </div>
                </button>
                <button className="btn btn-sm">
                  Last Login
                  <div className="badge badge-secondary">
                    {new Date(user.last_login).toString().slice(4, 15)}
                  </div>
                </button>
              </div>

              <div className="pt-12 pb-8 flex sm:flex-col md:flex-row gap-5 justify-center items-center">
                <button
                  className="btn-primary btn"
                  onClick={() =>
                    document.getElementById("update_profile").showModal()
                  }
                >
                  Update Profile
                </button>
                <button
                  className="btn-secondary btn"
                  onClick={() =>
                    document.getElementById("update_email").showModal()
                  }
                >
                  Update Email Address
                </button>
                <button
                  className="btn-warning btn"
                  onClick={() =>
                    document.getElementById("verify_email").showModal()
                  }
                >
                  Verify Email
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5">
            <img
              src={profile}
              alt="profile"
              className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
            />
          </div>
        </div>
      </div>
      <UpdateProfile user={user} />
    </>
  );
}

export default Profile;
