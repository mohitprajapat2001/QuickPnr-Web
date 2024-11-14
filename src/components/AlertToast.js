/**Alert Toast Component */
import { useEffect } from "react";
import $ from "jquery";
import { RiInformation2Line } from "react-icons/ri";
function AlertToast({ message }) {
  /**Custom Alert Toast Component Daisy UI */
  useEffect(() => {
    setTimeout(() => {
      alertFadeOut();
    }, 5000);
  }, []);
  const alertFadeOut = () => {
    $("#alert").fadeOut();
  };
  return (
    <>
      <div className="fixed top-0 right-0 p-5">
        <div role="alert" className="alert flex" id="alert">
          <RiInformation2Line className="text-info text-2xl" />
          <span>{message}</span>
          <div>
            <button
              onClick={() => alertFadeOut()}
              className="btn btn-sm btn-circle btn-ghost delay-50 transition-all duration-250 hover:scale-125 scale-95 hover:rotate-90"
              tabIndex="0"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AlertToast;
