import {
  errorAlert,
  successAlert,
} from "../../components/notification/ToastNotification";
import { instance } from "../../utils/api";

const RegisterUser = (userDetails, after) => async () => {
  console.log(userDetails);
  try {
    await instance.post(`create_user/`, userDetails);
    await after();
    successAlert("Registered Successfully !!");
    return true;
  } catch (error) {
    errorAlert(error.response.data.res);
    return false;
  }
};

const LoginAction =
  ({ contactNumber, password }) =>
  async () => {
    try {
      const response = await instance.get(
        `login/+91${contactNumber}/${password}`
      );
      await sessionStorage.setItem("user", JSON.stringify(response.data[0]));
      successAlert("Logged in Successfully !!");
      return true;
    } catch (error) {
      errorAlert(error.response.data.res);
      return false;
    }
  };

export { RegisterUser, LoginAction };
