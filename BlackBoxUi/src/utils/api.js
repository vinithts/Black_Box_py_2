import axios from "axios";
export const url = "http://localhost:8000/algoTradingApp/strategy/builder/";
// export const url = "http://139.59.92.44:8888/algoTradingApp/strategy/builder/";
export const instance = axios.create({
  baseURL: url,
});
