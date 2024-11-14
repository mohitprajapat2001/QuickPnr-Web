/* eslint-disable jsx-a11y/no-redundant-roles */
/**Update Profile Modal */
import Context from "../../context/Contexts";
import { useContext } from "react";
import { useEffect, useState } from "react";
function UpdateProfile({ user }) {
  /**Update Profile Modal  */
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    let timerId;

    document.addEventListener("click", (event) => {
      if (event.target.id === "generate_otp") {
        event.preventDefault();
        event.stopPropagation();
        event.target.disabled = true;

        setCounter(60);
        timerId = setInterval(() => {
          setCounter((prevCounter) => {
            if (prevCounter <= 1) {
              clearInterval(timerId);
              event.target.disabled = false;
              return 60;
            } else {
              return prevCounter - 1;
            }
          });
        }, 1000);
      }
    });

    // Clean up the timer when the component unmounts
    return () => clearInterval(timerId);
  }, []);
  const { updateUserProfile, updateUserEmail, verifyUserEmail, generateOtp } =
    useContext(Context.UserContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    updateUserProfile(new FormData(event.target));
  };
  const handleEmailSubmit = (event) => {
    event.preventDefault();
    updateUserEmail(new FormData(event.target));
  };
  const handleVerifyEmailSubmit = (event) => {
    event.preventDefault();
    verifyUserEmail(new FormData(event.target));
  };

  return (
    <>
      <dialog id="update_profile" className="modal">
        <div className="modal-box" style={{ scrollbarWidth: "none" }}>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute scale-95 transition-all hover:scale-100 hover:rotate-90 right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Update Profile!</h3>
          <div className="py-4">
            <form
              onSubmit={handleSubmit}
              role="form"
              className="w-full mt-5 sm:mt-8"
            >
              <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Enter Your First Name"
                  name="first_name"
                  defaultValue={user.first_name}
                  className="input input-bordered input-primary w-full"
                />
                <input
                  type="text"
                  placeholder="Enter Your Last Name"
                  name="last_name"
                  defaultValue={user.last_name}
                  className="input input-bordered input-primary w-full"
                />
                <input
                  type="text"
                  placeholder="Enter Your Username"
                  name="username"
                  defaultValue={user.username}
                  className="input input-bordered input-primary w-full"
                />
                <input
                  type="number"
                  placeholder="Enter Your Age"
                  name="age"
                  min={18}
                  max={100}
                  defaultValue={user.age}
                  className="input input-bordered input-primary w-full"
                />
                <textarea
                  className="textarea textarea-primary"
                  placeholder="Enter Address"
                  name="address"
                  id="address"
                  defaultValue={user.address}
                  rows={4}
                >
                  {user.address}
                </textarea>
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                  <a
                    role="button"
                    href="/change-password/"
                    className="btn btn-outline btn-primary btn-block max-w-[200px]"
                  >
                    Change Password
                  </a>
                  <button
                    type="submit"
                    role="button"
                    className="btn btn-primary btn-block max-w-[200px]"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="update_email" className="modal">
        <div className="modal-box" style={{ scrollbarWidth: "none" }}>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute scale-95 transition-all hover:scale-100 hover:rotate-90 right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Update Email Address!</h3>
          <div className="py-4">
            <p className="text-sm">
              Note: Updating email address requires to verify account again,
              Update email at your own risk.
            </p>
            <form
              method="post"
              onSubmit={handleEmailSubmit}
              role="form"
              className="w-full mt-5 sm:mt-8"
            >
              <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Enter new email address"
                  name="email"
                  defaultValue={user.email}
                  className="input input-bordered input-primary w-full"
                />
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-end items-center">
                  <button
                    type="submit"
                    role="button"
                    className="btn btn-primary btn-block max-w-[200px]"
                  >
                    Update Email
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="verify_email" className="modal">
        <div className="modal-box" style={{ scrollbarWidth: "none" }}>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute scale-95 transition-all hover:scale-100 hover:rotate-90 right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Verify Email!</h3>
          <div className="py-4">
            <form
              method="post"
              onSubmit={handleVerifyEmailSubmit}
              role="form"
              className="w-full mt-5 sm:mt-8"
            >
              <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  name="otp"
                  className="input input-bordered input-primary w-full"
                />
                <span className="text-sm countdown">
                  Resend OTP After,{" "}
                  <span
                    className="px-2 text-primary font-bold"
                    style={{ "--value": counter }}
                  ></span>{" "}
                  Seconds
                </span>
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-end items-center">
                  <button
                    onClick={generateOtp}
                    role="button"
                    className="btn btn-primary btn-block max-w-[200px]"
                    id="generate_otp"
                  >
                    Generate OTP
                  </button>
                  <button
                    type="submit"
                    role="button"
                    className="btn btn-primary btn-block max-w-[200px]"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default UpdateProfile;
