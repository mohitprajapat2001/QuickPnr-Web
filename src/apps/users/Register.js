/* eslint-disable jsx-a11y/no-redundant-roles */
/**User Registration Page */
import signup from "../../static/img/signup.gif";
import { useContext } from "react";
import Context from "../../context/Contexts";
import { useGoogleLogin } from "@react-oauth/google";
import { get_user_google_credentials } from "../../utils/utils";

function Register() {
  /**User Registration Page */
  const { registerUser, toggle, toggleState, googleRegister } = useContext(
    Context.UserContext
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    registerUser(data);
  };
  const loginHandler = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      let response = await get_user_google_credentials(
        codeResponse.access_token
      );
      googleRegister({
        token: codeResponse.access_token,
        google_id: response.id,
        username: response.email,
        email: response.email,
        first_name: response.given_name,
      });
    },
    onError: (error) => console.error("Login Failed:", error),
  });
  return (
    <>
      <div
        id="g_id_onload"
        data-client_id="289813396319-2bpdlvdug1pu2ldabbga0n76aieg86nt.apps.googleusercontent.com"
        data-login_uri="{% url 'google_login_by_token' %}"
      ></div>
      <div className="hero min-h-screen bg-base-200 py-5">
        <div className="drop-shadow-xl w-full rounded-md flex justify-between items-stretch">
          <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex ">
            <img src={signup} alt="login" className="h-[500px]" />
          </div>
          <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
            <h1 className="text-center text-2xl sm:text-3xl font-semibold">
              Create Account
            </h1>
            <button
              className="mt-3 w-full btn btn-primary"
              onClick={loginHandler}
            >
              Register with Google
            </button>
            <p className="text-sm text-center mt-2 italic">
              Note: use email id as username, for next login step, you can
              change it later. forgot password & create a new password on first
              login when registering with Google.
            </p>
            <form
              method="POST"
              onSubmit={handleSubmit}
              role="form"
              className="w-full mt-5 sm:mt-8"
            >
              <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Enter Your First Name"
                  name="first_name"
                  className="input input-bordered input-primary w-full"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  className="input input-bordered input-primary w-full"
                />
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  name="email"
                  className="input input-bordered input-primary w-full"
                />
                <input
                  type="password"
                  placeholder="Choose Your Password"
                  name="password"
                  className="input input-bordered input-primary w-full"
                />
                <input
                  type={toggle ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirm_password"
                  className="input input-bordered input-primary w-full"
                />
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-x-4">
                    <input
                      type="checkbox"
                      onClick={toggleState}
                      className="toggle toggle-primary"
                    />
                    <span className="label-text">Show Password</span>
                  </label>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center w-60 mx-auto">
                  <button
                    role="button"
                    type="submit"
                    className="btn btn-active btn-primary btn-block"
                  >
                    Sign Up
                  </button>
                  <a
                    href="/login"
                    role="button"
                    className="btn btn-outline btn-primary btn-block"
                  >
                    Sign In
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
