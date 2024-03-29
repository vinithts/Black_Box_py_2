import {
  SETLEGS,
  SETLEGSLEVEL,
  SETSTRATEGYSTART,
  SET_STRATEGY_DETAILS_BY_STRATEGY_ID,
  SET_STRATEGY_LIST_BY_BASKET_ID,
} from "../types/StrategyTypes";

const initialState = {
  start: {
    type: "",
    strategyName: "",
    orderType: "",
    entryTime: "",
    exitTime: "",
    runOnDays: "",
    entryDate: new Date(),
    exitDate: new Date(),
  },

  legs: {
    type: "",
    index: "Banknifty",
    bs: "",
    cepe: "",
    totalLegs: 1,
    expiryDate: new Date(),
    strikeSelection: "",
    waitTrade: false,
    ORB: false,
    reEntry: false,
    reExecute: false,
    repeat: "none",
  },
  legsLevel: [],
  strategy_list_by_basketId: [],
  strategy_details_by_strategyId: [],
};

export default function StrategyReducer(state = initialState, action) {
  switch (action.type) {
    case SETSTRATEGYSTART:
      return { ...state, start: action.payload };
    case SETLEGS:
      return { ...state, legs: action.payload };
    case SETLEGSLEVEL:
      return { ...state, legsLevel: action.payload };
    case SET_STRATEGY_LIST_BY_BASKET_ID:
      return { ...state, strategy_list_by_basketId: action.payload };
    case SET_STRATEGY_DETAILS_BY_STRATEGY_ID:
      return { ...state, strategy_details_by_strategyId: action.payload };
    default:
      return { ...state };
  }
}
