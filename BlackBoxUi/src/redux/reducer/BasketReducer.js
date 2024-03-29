import { SET_BASKET_DETAILS } from "../types/BasketTypes";

const initialState = {
  basketDetails: {},
};

export default function BasketReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BASKET_DETAILS:
      return {
        ...state,
        basketDetails: action.payload,
      };
    default:
      return { ...state };
  }
}
