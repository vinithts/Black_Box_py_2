import { Box, Button, Card, Divider, IconButton, Menu, MenuItem, Popover, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  my_deployment_card_colors,
  my_subscription_card_colors,
  primary_colors,
  top_navigation_colors,
} from "../../controller/colors";
import { BsBasket3Fill } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight, MdAdd } from "react-icons/md";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import { account_menu_font, profile_menu } from "../../controller/fontSize";
import { SlOptionsVertical } from "react-icons/sl";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import { BiDuplicate } from "react-icons/bi";
import { CgEditBlackPoint } from "react-icons/cg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MainModal from "../../components/modal/Legs/MainModal";
import { connect } from "react-redux";
import {
  delete_strategy,
  get_all_strategies_by_basketId,
} from "../../redux/action/strategyAction";
import { useLocation, useNavigate } from "react-router";
import moment from "moment";
import CreateBasket from "../../components/modal/CreateBasket";
import { get_basket_by_userId } from "../../redux/action/BasketAction";

const Strategy = ({
  strategy_list_by_basketId,
  get_all_strategies_by_basketId,
  delete_strategy,
  basketDetails,
  get_basket_by_userId,
}) => {
  const location = useLocation();
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [show, setShow] = useState(false);
  const [isCreateBasketOpen, setCreateBasketOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl1(null);
  };

  const open1 = Boolean(anchorEl1);

  const getStategyDetails = (id) => {
    const basketId = location.state;
    if (id) {
      {
        get_all_strategies_by_basketId(id);
      }
    } else if (basketId) {
      {
        get_all_strategies_by_basketId(basketId);
      }
    } else {
      get_all_strategies_by_basketId(sessionStorage.getItem("bId"));
    }
  };
  useEffect(() => {
    const data = sessionStorage.getItem("user");
    const userId = JSON.parse(data)?.userId;
    if (userId) {
      get_basket_by_userId();
    }
    getStategyDetails();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        paddingTop: "5%",
        background: primary_colors.black,
      }}
    >
      {basketDetails?.length > 0 && (
        <>
          {show && (
            <MainModal
              handleClose={() => {
                setShow(false);
              }}
              open={show}
              basketId={sessionStorage.getItem("bId")}
            />
          )}
          {isCreateBasketOpen && (
            <CreateBasket
              open={isCreateBasketOpen}
              handleClose={() => setCreateBasketOpen(false)}
            />
          )}
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box sx={{ flexGrow: 2 }}>
              <Box
                sx={{
                  p: "2.5%",
                  height: "47vh",
                  overflowY: "hidden",
                  width: 230,
                  mx: 1,
                  mt: 2,
                  borderRadius: 1,
                  bgcolor: top_navigation_colors.background,
                }}
              >
                <Stack
                  display={"flex"}
                  flexDirection={"row"}
                  sx={{ alignItems: "center", p: ".5%" }}
                >
                  <BsBasket3Fill color={"#2E6BE8"} size={25} />
                  <Typography variant="h6" color={"#fff"} sx={{ mx: 1 }}>
                    {"Basket"}
                  </Typography>
                </Stack>
                <Divider sx={{ my: 1, bgcolor: "white" }} />

                <Button
                  variant="contained"
                  onClick={() => setCreateBasketOpen(true)}
                  fullWidth
                  sx={{ bgcolor: "#2E6BE8" }}
                  startIcon={<MdAdd color={"#fff"} />}
                >
                  Create new Basket
                </Button>
                <Box
                  sx={{
                    p: "2.5%",
                    overflowY: "scroll",
                    height: "80%",
                  }}
                >
                  {basketDetails?.map((e) => (
                    <div onClick={() => getStategyDetails(e.basketId)}>
                      <Stack
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        my={1.3}
                        sx={{ cursor: "pointer" }}
                        key={e.basketId}
                      >
                        <Typography variant="body6" sx={{ color: "gray" }}>
                          {e.basketName}
                        </Typography>
                        <MdOutlineKeyboardArrowRight color={"gray"} />
                      </Stack>
                    </div>
                  ))}
                </Box>
              </Box>
              <Box
                sx={{
                  p: "2.5%",
                  marginTop: "1.5%",
                  height: "37vh",
                  overflowY: "hidden",
                  width: 230,
                  mx: 1,
                  borderRadius: 1,
                  bgcolor: top_navigation_colors.background,
                }}
              >
                <Stack
                  display={"flex"}
                  flexDirection={"row"}
                  sx={{ alignItems: "center", p: ".5%" }}
                >
                  <CandlestickChartIcon
                    size={25}
                    style={{ color: "#3e6ae0" }}
                  />
                  <Typography variant="h6" color={"#fff"} sx={{ mx: 1 }}>
                    {"Plugin"}
                  </Typography>
                </Stack>
                <Divider sx={{ my: 1, bgcolor: "white" }} />
                <Box
                  sx={{
                    p: "2.5%",
                  }}
                >
                  {["Multi Legs", "Charting Bridge", "Menu 3"].map((e) => (
                    <Stack
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      my={1.3}
                      sx={{ cursor: "pointer" }}
                    >
                      <Typography variant="body6" sx={{ color: "gray" }}>
                        {e}
                      </Typography>
                    </Stack>
                  ))}
                </Box>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, width: "90%", mt: 2, mx: 2 }}>
              <Box display={"flex "}>
                <Typography
                  variant="h5"
                  sx={{ color: primary_colors.white, fontWeight: "bold" }}
                >
                  Lorem Ipsum
                </Typography>
                <Button
                  variant="contained"
                  sx={{ bgcolor: my_subscription_card_colors.buttonBg, mx: 2 }}
                >
                  Deploy Basket
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  background: my_subscription_card_colors.labelBg,
                  my: 2,
                  minHeight: "3rem",
                  // alignItems: "center",
                  // justifyContent: "space-between",
                  borderRadius: "5px",
                }}
              >
                <Stack
                  sx={{ p: 1, flex: 1 }}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                >
                  <TextField
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline:focus": {
                        borderColor: "transparent",
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderWidth: 1,
                        },
                    }}
                    placeholder="Search"
                    inputProps={{
                      style: {
                        color: primary_colors.white,
                      },
                    }}
                  />
                  <Button
                    sx={{
                      bordeRadius: "5px",
                      background: my_deployment_card_colors.buttonBg,
                      color: "#fff",
                      mx: 1,
                      width: 250,
                    }}
                    variant="contained"
                    onClick={handleClick}
                  >
                    Build Strategy &nbsp; <ExpandMoreIcon />
                  </Button>

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl1}
                    open={open1}
                    onClose={handleClose}
                    sx={{ mt: 1 }}
                    PaperProps={{
                      style: {
                        width: 200,
                      },
                    }}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      sx={{ fontSize: account_menu_font.menuItems }}
                      onClick={() => {
                        setShow(true);
                        handleClose();
                      }}
                    >
                      <CgEditBlackPoint
                        color={my_deployment_card_colors.buttonBg}
                      />
                      &nbsp;Create Legs
                    </MenuItem>
                    <MenuItem
                      sx={{ fontSize: account_menu_font.menuItems }}
                      onClick={() => {
                        setShow(true);
                        handleClose();
                      }}
                    >
                      <CgEditBlackPoint
                        color={my_deployment_card_colors.buttonBg}
                      />
                      &nbsp;Charting Bridge
                    </MenuItem>
                    <MenuItem
                      sx={{ fontSize: account_menu_font.menuItems }}
                      onClick={() => {
                        setShow(true);
                        handleClose();
                      }}
                    >
                      <CgEditBlackPoint
                        color={my_deployment_card_colors.buttonBg}
                      />
                      &nbsp;Menu 3
                    </MenuItem>
                    <MenuItem
                      sx={{ fontSize: account_menu_font.menuItems }}
                      onClick={() => {
                        setShow(true);
                        handleClose();
                      }}
                    >
                      <CgEditBlackPoint
                        color={my_deployment_card_colors.buttonBg}
                      />
                      &nbsp;Menu 4
                    </MenuItem>
                  </Menu>
                </Stack>
              </Box>
              {strategy_list_by_basketId.length > 0 &&
                strategy_list_by_basketId?.map((e) => {
                  return (
                    <StrategyCard
                      e={e}
                      key={e.strategyId}
                      setShow={setShow}
                      show={show}
                    />
                  );
                })}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

const StrategyCard = ({ e }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [edit, setEdit] = useState(false);
  const [clone, setClone] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl1(null);
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const refreshData = async () => {
    await get_all_strategies_by_basketId(sessionStorage.getItem("bId"));
    handleClose();
  };
  const {
    strategyId,
    strategyName,
    index,
    segment,
    orderType,
    createdAt,
    ENTRY_DATE,
    EXIT_DATE,
    DAY_OF_WEEK,
    legs,
    drawdown,
    capital,
    strategyShortDescription,
  } = e;
  return (
    <>
      {show && (
        <MainModal
          handleClose={() => {
            setShow(false);
            setEdit(false);
            setClone(false);
          }}
          open={show}
          clone={clone}
          edit={edit}
          basketId={sessionStorage.getItem("bId")}
        />
      )}
      <Card
        sx={{
          minHeight: 200,
          bgcolor: primary_colors.blue,
          my: 1,
          position: "relative",
        }}
        key={e.strategyId}
      >
        <IconButton
          style={{
            position: "absolute",
            right: 10,
            top: 20,
            cursor: "pointer",
          }}
          onClick={handleMenuClick}
        >
          <SlOptionsVertical color={primary_colors.white} size={15} />
        </IconButton>
        <Box sx={{ p: 2 }}>
          <Typography
            sx={{
              color: primary_colors.white,
              fontSize: account_menu_font.menuItems,
            }}
          >
            Created on:{" "}
            {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a") || "--"}
          </Typography>
          <Typography
            sx={{
              color: primary_colors.white,
              fontSize: profile_menu.subTitle,
              fontWeight: "bold",
            }}
          >
            {strategyName}
          </Typography>
          <Divider sx={{ bgcolor: primary_colors.gray, my: 1 }} />
          {/* ================= details ===================*/}
          <Stack display={"flex"} flexDirection={"row"}>
            <Box>
              <Typography
                sx={{
                  color: primary_colors.white,
                  fontSize: account_menu_font.menuItems,
                }}
              >
                {"Total Legs"}
              </Typography>
              <Typography
                sx={{
                  color: primary_colors.white,
                  fontWeight: "bold",
                  fontSize: account_menu_font.menuItems,
                }}
              >
                {legs?.length || "--"}
              </Typography>
            </Box>
            <Box sx={{ mx: 3, ml: 6 }}>
              <Typography
                sx={{
                  color: primary_colors.white,
                  fontSize: account_menu_font.menuItems,
                }}
              >
                {"Symbol"}
              </Typography>
              <Typography
                sx={{
                  color: primary_colors.white,
                  fontWeight: "bold",
                  fontSize: account_menu_font.menuItems,
                }}
              >
                {index}
              </Typography>
            </Box>
            <Box sx={{ mx: 3 }}>
              <Typography
                sx={{
                  color: primary_colors.white,
                  fontSize: account_menu_font.menuItems,
                }}
              >
                {"Segment"}
              </Typography>
              <Typography
                sx={{
                  color: primary_colors.white,
                  fontWeight: "bold",
                  fontSize: account_menu_font.menuItems,
                }}
              >
                {segment}
              </Typography>
            </Box>
            <Box sx={{ mx: 3 }}>
              <Typography
                sx={{
                  color: primary_colors.white,
                  fontSize: account_menu_font.menuItems,
                }}
              >
                {"Type"}
              </Typography>
              <Typography
                sx={{
                  color: primary_colors.white,
                  fontWeight: "bold",
                  fontSize: account_menu_font.menuItems,
                }}
              >
                {orderType}
              </Typography>
            </Box>
            <Box sx={{ mx: 3 }}>
              <Typography
                sx={{
                  color: primary_colors.white,
                  fontSize: account_menu_font.menuItems,
                }}
              >
                {"Capital"}
              </Typography>
              <Typography
                sx={{
                  color: primary_colors.white,
                  fontWeight: "bold",
                  fontSize: account_menu_font.menuItems,
                }}
              >
                {capital || "--"}
              </Typography>
            </Box>
            <Box sx={{ mx: 3 }}>
              <Typography
                sx={{
                  color: primary_colors.white,
                  fontSize: account_menu_font.menuItems,
                }}
              >
                {"Drawdown"}
              </Typography>
              <Typography
                sx={{
                  color: primary_colors.white,
                  fontWeight: "bold",
                  fontSize: account_menu_font.menuItems,
                }}
              >
                {drawdown || "--"}
              </Typography>
            </Box>
          </Stack>
          <Stack display={"flex"} flexDirection={"row"} my={1}>
            {DAY_OF_WEEK?.split(",")?.map((e, i) => (
              <Typography
                key={i}
                variant="body2"
                sx={{
                  bgcolor: "#1D3880",
                  px: 1.2,
                  py: 0.5,
                  mx: 0.5,
                  borderRadius: 4,
                  color: "white",
                }}
              >
                {e}
              </Typography>
            ))}
            {ENTRY_DATE && EXIT_DATE ? (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    bgcolor: "#1D3880",
                    px: 1.2,
                    py: 0.5,
                    mx: 0.5,
                    borderRadius: 4,
                    color: "white",
                  }}
                >
                  Entry&nbsp;:&nbsp;
                  {moment(new Date(ENTRY_DATE)).format("DD MMMM  YYYY")}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    bgcolor: "#1D3880",
                    px: 1.2,
                    py: 0.5,
                    mx: 0.5,
                    borderRadius: 4,
                    color: "white",
                  }}
                >
                  Exit&nbsp;:&nbsp;{" "}
                  {moment(new Date(EXIT_DATE)).format("DD MMMM  YYYY")}
                </Typography>
              </>
            ) : (
              <></>
            )}
          </Stack>

          <Typography variant="caption" sx={{ color: primary_colors.white }}>
            {strategyShortDescription || "--"}
          </Typography>
        </Box>
        <Popover
          key={e.strategyId}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            onClick={() => {
              handlePopoverClose();
              setClone(false);
              setEdit(e);
              setShow(true);
            }}
          >
            <FiEdit size={15} />
            &nbsp;&nbsp;
            <Typography sx={{ fontSize: 14 }}>Edit</Typography>
          </MenuItem>
          <MenuItem onClick={() => delete_strategy(strategyId, refreshData)}>
            <RiDeleteBin4Line size={16} />
            &nbsp;&nbsp;
            <Typography sx={{ fontSize: 14 }}>Delete</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handlePopoverClose();
              setClone(e);
              setEdit(false);
              setShow(true);
            }}
          >
            <BiDuplicate size={16} />
            &nbsp;&nbsp;
            <Typography sx={{ fontSize: 14 }}>Duplicate</Typography>
          </MenuItem>
        </Popover>
      </Card>
    </>
  );
};
const mapStateToProps = (state) => ({
  strategy_list_by_basketId: state.StrategyReducer.strategy_list_by_basketId,
  basketDetails: state.Baskets.basketDetails,
});

export default connect(mapStateToProps, {
  get_all_strategies_by_basketId,
  delete_strategy,
  get_basket_by_userId,
})(Strategy);
