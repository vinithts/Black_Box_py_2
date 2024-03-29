import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { navigation_config } from "../../controller/navigationConfig";
import NavSection from "./NavSection";
import { top_navigation_colors } from "../../controller/colors";
import { Avatar, Badge, Tooltip, alpha, styled } from "@mui/material";
import { top_navigation_font } from "../../controller/fontSize";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import AccountMenu from "./AccountMenu";
import AddBroker from "../modal/AddBroker";
import ThemeSwitch from "../elements/ThemeSwitch";

const drawerWidth = 240;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

function NavigationBar(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isAddBrokerBoxOpen, setAddBrokerBoxOpen] = useState(false);
  const handleClose = () => {
    setAccountMenuOpen(false);
  };
  const { window } = props;
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box>
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        {/* <Logo /> */}
      </Box>
      <Box sx={{ mb: 5, mx: 2.5 }}>
        <StyledAccount
          sx={{
            background: "#a0c4ff",
            boxShadow: "6px -7px 10px -5px #00000026 inset",
          }}
        >
          <Avatar>J</Avatar>

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
              {"Jhon Doe"}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {"Super Admin"}
            </Typography>
          </Box>
        </StyledAccount>
      </Box>
      <NavSection data={navigation_config} />

      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const menuMethods = {
    addBroker: () => setAddBrokerBoxOpen(true),
  };
  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <CssBaseline />
      <AccountMenu
        isAccountMenuOpen={isAccountMenuOpen}
        handleClose={handleClose}
        menuMethods={menuMethods}
      />
      <AppBar
        component="nav"
        sx={{ background: top_navigation_colors.background, width: "100%" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: top_navigation_font.header,
                fontWeight: top_navigation_font.headerWeight,
                color: top_navigation_colors.text,
                fontFamily: "Roboto",
                flexGrow: 1,
                flexBasis: 0,
              }}
            >
              BlackBox
            </Typography>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 2,
              }}
            >
              {navigation_config.map((item) => (
                <Link
                  style={{
                    textDecoration: "none",
                    display: "block",
                    flexGrow: 0.5,
                  }}
                  to={item?.path}
                >
                  <Typography
                    key={item.title}
                    sx={{
                      fontSize: 16,
                      fontWeight:
                        location.pathname === item?.path &&
                        top_navigation_font.itemsWeight,
                      color:
                        location.pathname === item?.path
                          ? "#FB3"
                          : top_navigation_colors.text,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Link>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flexGrow: 1,
                flexBasis: 0,
              }}
            >
              <ThemeSwitch />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                flexGrow: 1,
                flexBasis: 0,
              }}
            >
              <Badge
                badgeContent={4}
                color="success"
                sx={{ display: "block", px: 0 }}
              >
                <NotificationsNoneIcon
                  color="action"
                  sx={{ color: top_navigation_colors.icon }}
                />
              </Badge>
              <Box mx={1} />
              <Box sx={{ cursor: "pointer", px: 1 }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={() => setAccountMenuOpen((prev) => !prev)}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={
                      isAccountMenuOpen ? "account-menu" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={isAccountMenuOpen ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>H</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <AddBroker
        open={isAddBrokerBoxOpen}
        handleClose={() => setAddBrokerBoxOpen(false)}
      />
      <Outlet />
    </Box>
  );
}

NavigationBar.propTypes = {

  window: PropTypes.func,
};

export default NavigationBar;
