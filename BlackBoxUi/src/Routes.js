import React from "react";
import { Route, Routes as PageRoutes, BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/navigation/NavigationBar";
import Basket from "./users/endUser/Basket";
import Dashboard from "./users/endUser/Dashboard";

const Routes = () => {
  return (
    <>
      {/* <ScrollToTop /> */}
      <BrowserRouter>
        <PageRoutes>
          <Route path="/" element={<NavigationBar />}>
            <Route path="/basket" element={<Basket />} />
            <Route path={"/dashboard"} element={<Dashboard />} />
          </Route>
        </PageRoutes>
      </BrowserRouter>
    </>
  );
};

export default Routes;
