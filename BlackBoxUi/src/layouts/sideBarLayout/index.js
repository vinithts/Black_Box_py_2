import React from "react";
import SideBar from "./SideBar";
import Content from "./Content";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar></SideBar>
      <Content></Content>
    </Box>
  );
};

export default Layout;
