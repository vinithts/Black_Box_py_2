import { toast } from "react-toastify";

export const infoAlert = (val) => {
  toast.info(val, {
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const successAlert = (val) => {
  toast.success(val, {
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const warningAlert = (val) => {
  toast.warning(val, {
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const errorAlert = (val) => {
  toast.error(val, {
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const processAlert = (val) => {
  toast.promise(val, {
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
