import {
  errorAlert,
  successAlert,
} from "../../components/notification/ToastNotification";
import { instance } from "../../utils/api";
import { SET_BASKET_DETAILS } from "../types/BasketTypes";

const create_basket =
  ({ baskerDetails, after }) =>
  async () => {
    try {
      await instance.post(`create_basket/`, baskerDetails);
      await after();
      successAlert("Basket created !!");
      return true;
    } catch (error) {
      errorAlert(error.response.data.res);
      return false;
    }
  };

const get_basket_by_userId = () => async (dispatch) => {
  try {
    const data = await sessionStorage.getItem("user");
    const userId = JSON.parse(data).userId;
    const response = await instance.get(`get_baskets/${userId}`);
    dispatch({ type: SET_BASKET_DETAILS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

const update_basket_by_basketId =
  ({ updatedBasketData, after }) =>
  async () => {
    console.log(updatedBasketData);
    try {
      const response = await instance.put(
        `edit_basket/${updatedBasketData.basketId}`,
        updatedBasketData
      );
      await after();
      successAlert(response.data);
      return true;
    } catch (error) {
      console.log(error);
      errorAlert("something went wrong");
      return false;
    }
  };

const delete_basket_by_basketId =
  ({ basketId, after }) =>
  async () => {
    try {
      const response = await instance.delete(`delete_basket/${basketId}`);
      await after();
      successAlert(response.data.res);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.res);
    }
  };
export {
  create_basket,
  get_basket_by_userId,
  update_basket_by_basketId,
  delete_basket_by_basketId,
};
