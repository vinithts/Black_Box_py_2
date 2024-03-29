// reducers.js
import { combineReducers } from "redux";
import StrategyReducer from "./StrategyReducer";
import BasketReducer from "./BasketReducer";

const RootReducers = combineReducers({
  Baskets: BasketReducer,
  StrategyReducer: StrategyReducer,
});

export default RootReducers;
