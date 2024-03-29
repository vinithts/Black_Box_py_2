import { Route, Routes } from "react-router";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/navigation/NavigationBar";
import Basket from "./users/endUser/Basket";
import Dashboard from "./users/endUser/Dashboard";
import Account from "./users/endUser/Account";
import Strategy from "./users/endUser/Strategy";
import Logs from "./users/endUser/Logs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/pageLoader/Loader";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/Register"} element={<Register />} />
          <Route path={"/ForgetPassword"} element={<ForgetPassword />} />
          <Route path="/BlackBox" element={<NavigationBar />}>
          <Route path={"/BlackBox/basket"} element={<Basket />} />
          <Route path={"/BlackBox/basket/strategy"} element={<Strategy />} />
          <Route path={"/BlackBox/account"} element={<Account />} />
          <Route path={"/BlackBox/dashboard"} element={<Dashboard />} />
          <Route path={"/BlackBox/Logs"} element={<Logs />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        limit={3}
        pauseOnHover={false}
        theme="light"
        style={{ padding: "1%" }}
      />
      <Loader />
    </BrowserRouter>
  );
}

export default App;
