import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import RootReducers from "./reducer/rootReducers";
const middleWare = [thunk];

const store = createStore(RootReducers, applyMiddleware(...middleWare));

export default store;
