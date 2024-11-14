/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
/**User Login Page */
import login from "../../static/img/login.gif";
import { useContext } from "react";
import Context from "../../context/Contexts";
import { useGoogleLogin } from "@react-oauth/google";
import { get_user_google_credentials } from "../../utils/utils";

function Login() {
  /**User Login Page */

  const { loginUser, toggleState, toggle, googleLogin } = useContext(
    Context.UserContext
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    loginUser(data);
  };
  const loginHandler = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      let response = await get_user_google_credentials(
        codeResponse.access_token
      );
      googleLogin({
        google_id: response.id,
        username: response.email,
        email: response.email,
      });
    },
    onError: (error) => console.error("Login Failed:", error),
  });
  return (
    <>
      <div className="hero min-h-screen bg-base-200 pt-5">
        <div className="drop-shadow-xl w-full rounded-md flex justify-between items-stretch">
          <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0 my-auto">
            <h1 className="text-center text-2xl sm:text-3xl font-semibold">
              Login into Your Account
            </h1>
            <button
              className="mt-3 w-full btn btn-primary"
              onClick={loginHandler}
            >
              Login with Google
            </button>
            <form
              method="post"
              onSubmit={handleSubmit}
              role="form"
              className="w-full mt-5 sm:mt-8"
            >
              <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Enter Your Username"
                  name="username"
                  className="input input-bordered input-primary w-full"
                />
                <label className="form-control w-full">
                  <input
                    type={toggle ? "text" : "password"}
                    placeholder="Choose Your Password"
                    name="password"
                    className="input input-bordered input-primary w-full"
                  />
                  <div className="label">
                    <span className="label-text-alt">
                      Forgot passoword?
                      <a
                        href="/forgot-password/"
                        className="ml-1 text-primary underline"
                      >
                        reset here.
                      </a>
                    </span>
                  </div>
                </label>
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
                <div className="flex w-full flex-col md:flex-row gap-2 md:gap-4 justify-center items-center w-64 mx-auto">
                  <a
                    role="button"
                    href="/register/"
                    className="btn btn-outline btn-primary"
                  >
                    Sign Up
                  </a>
                  <button
                    type="submit"
                    role="button"
                    className="btn btn-primary"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex ">
            <img src={login} alt="login" className="h-[500px]" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
