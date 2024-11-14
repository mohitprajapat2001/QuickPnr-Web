/**Change User Password */
import { useContext } from "react";
import Context from "../../context/Contexts";
import updatePasswordGif from "../../static/img/password_change.webp";
function ChangePassword() {
  const { updatePassword, toggle, toggleState } = useContext(
    Context.UserContext
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    updatePassword(new FormData(event.target));
  };
  return (
    <>
      <div className="hero min-h-screen bg-base-200 pt-5">
        <div className="drop-shadow-xl w-full rounded-md flex justify-between items-stretch">
          <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0 my-auto">
            <h1 className="text-center text-2xl sm:text-3xl font-semibold">
              Update Your Account Password
            </h1>
            <form
              method="post"
              onSubmit={handleSubmit}
              className="w-full mt-5 sm:mt-8"
            >
              <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                <input
                  type={toggle ? "password" : "text"}
                  placeholder="Enter Your Old Password"
                  name="old_password"
                  className="input input-bordered input-primary w-full"
                />
                <input
                  type="text"
                  placeholder="Enter Your New Password"
                  name="new_password"
                  className="input input-bordered input-primary w-full"
                />
                <input
                  type={toggle ? "password" : "text"}
                  placeholder="Confirm Your New Password"
                  name="confirm_password"
                  className="input input-bordered input-primary w-full"
                />
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-x-4">
                    <input
                      type="checkbox"
                      onClick={toggleState}
                      defaultValue={toggle}
                      className="toggle toggle-primary"
                    />
                    <span className="label-text">Hide Password</span>
                  </label>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                  <button type="submit" className="btn btn-block btn-primary">
                    Update Password
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex ">
            <img src={updatePasswordGif} alt="login" className="h-[500px]" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
