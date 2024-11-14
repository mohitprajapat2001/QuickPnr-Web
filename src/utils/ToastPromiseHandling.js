/**Exception Handling Toast*/
import { toast } from "react-toastify";

const UpdateToast = (toast_id, message, type) => {
  toast.update(toast_id, {
    render: message,
    type: type,
    isLoading: false,
    autoClose: 7000,
    draggable: true,
    closeButton: true,
  });
};
export const ExceptionHandling = (toast_id, errors) => {
  Object.values(errors.response.data).forEach((error) => {
    if (typeof error == "string") {
      UpdateToast(toast_id, error, "error");
    } else {
      error.forEach((err) => {
        UpdateToast(toast_id, err, "error");
      });
    }
  });
};

export const LoadingToast = (message, options) => {
  return toast.loading(message, options);
};

export const ErrorToast = (toast_id, message) => {
  UpdateToast(toast_id, message, "error");
};

export const SuccessToast = (toast_id, message, successUrl) => {
  UpdateToast(toast_id, message, "success");

  successUrl &&
    setTimeout(() => {
      window.location.href = successUrl;
    }, 8000);
};
