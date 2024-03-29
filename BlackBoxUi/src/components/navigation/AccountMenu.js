import { Logout } from "@mui/icons-material";
import { Divider, ListItemIcon, Menu } from "@mui/material";
import React from "react";
import { AccountMenuItem } from "../../controller/styles";
import { useNavigate } from "react-router";


const AccountMenu = ({ handleClose, isAccountMenuOpen, menuMethods }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
    handleClose();
  };
  return (
    <Menu
      anchorEl={isAccountMenuOpen}
      id="account-menu"
      open={isAccountMenuOpen}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
      <AccountMenuItem onClick={handleClose}>Jhon doe</AccountMenuItem>
      <AccountMenuItem onClick={handleClose}>jhondoe@gmail.com</AccountMenuItem>
      <Divider />
      <AccountMenuItem onClick={() => navigate("/BlackBox/account")}>
        My Account
      </AccountMenuItem>
      <AccountMenuItem onClick={handleClose}>My Subscription</AccountMenuItem>
      <AccountMenuItem onClick={handleClose}>Change Password</AccountMenuItem>
      <AccountMenuItem
        onClick={() => {
          menuMethods.addBroker();
          handleClose();
        }}
      >
        Add Broker
      </AccountMenuItem>
      <AccountMenuItem onClick={handleClose}>Settings</AccountMenuItem>
      <Divider />

      <AccountMenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </AccountMenuItem>
    </Menu>
  );
};

export default AccountMenu;
