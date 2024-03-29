import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BasketCard from "../../components/cards/BasketCard";
import {
  my_deployment_card_colors,
  primary_colors,
  top_navigation_colors,
} from "../../controller/colors";
import { BsBasket3Fill } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight, MdAdd } from "react-icons/md";
import CreateBasket from "../../components/modal/CreateBasket";
import AddIcon from "@mui/icons-material/Add";
import MyDeploymentCard from "../../components/cards/MyDeploymentCard";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import SubscriptionCard from "../../components/cards/SubscriptionCard";
import { basket_details } from "../../controller/data";
import MyDeploymentSearchBar from "../../components/elements/MyDeploymentSearchBar";
import { connect } from "react-redux";
import { get_basket_by_userId } from "../../redux/action/BasketAction";

const Basket = ({ get_basket_by_userId, basketDetails }) => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const data = sessionStorage.getItem("user");
    const userId = JSON.parse(data)?.userId;
    if (userId) {
      get_basket_by_userId();
    }
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
      <Box
        sx={{
          display: "flex",
        }}
      >
        <CreateBasket open={open} handleClose={handleClose} />

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
              <BsBasket3Fill
                color={my_deployment_card_colors.buttonBg}
                size={25}
              />
              <Typography variant="h6" color={"#fff"} sx={{ mx: 1 }}>
                {"Basket"}
              </Typography>
            </Stack>
            <Divider sx={{ my: 1, bgcolor: "white" }} />

            <Button
              variant="contained"
              onClick={handleOpen}
              fullWidth
              sx={{ bgcolor: my_deployment_card_colors.buttonBg }}
              startIcon={<MdAdd color={"#fff"} />}
            >
              Create new Basket
            </Button>
            <Box
              sx={{
                p: "2.5%",
              }}
            >
              {[
                "Sagam Lorem",
                "Lorem Ipsom",
                "Passive Income",
                "Lorem Sagam",
              ].map((e) => (
                <Stack
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  my={1.3}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography
                    variant="body6"
                    sx={{ color: primary_colors.gray }}
                  >
                    {e}
                  </Typography>
                  <MdOutlineKeyboardArrowRight color={primary_colors.gray} />
                </Stack>
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
              <CandlestickChartIcon size={25} style={{ color: "#3e6ae0" }} />
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

        <Box sx={{ flexGrow: 1, width: "90%" }}>
          <Box
            sx={{
              display: "flex",
              background: "#121d3a",
              mx: 1,

              mt: 2,
              minHeight: "3rem",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "60%",
                justifyContent: "space-evenly",
              }}
            >
              <Typography
                onClick={() => setShow(1)}
                sx={{
                  color: show === 1 ? "#FB3" : "#fff",
                  borderRight: "1px solid #fff",
                  px: "5%",
                  fontSize: "18px",
                  fontWeight: show === 1 && 500,
                  background: "none",
                  cursor: "pointer",
                }}
              >
                MY BASKET
              </Typography>
              <Typography
                onClick={() => setShow(2)}
                sx={{
                  color: show === 2 ? "#FB3" : "#fff",
                  borderRight: "1px solid #fff",
                  px: "5%",
                  fontSize: "18px",
                  fontWeight: show === 2 && 500,
                  cursor: "pointer",
                }}
              >
                MY SUBSCRIPTION
              </Typography>
              <Typography
                sx={{
                  color: show === 3 ? "#FB3" : "#fff",
                  px: "5%",
                  fontSize: "18px",
                  fontWeight: show === 3 && 500,
                  cursor: "pointer",
                }}
                onClick={() => setShow(3)}
              >
                MY DEPLOYMENT
              </Typography>
            </Box>
            <Box sx={{ p: 1 }}>
              <Button
                sx={{
                  bordeRadius: "5px",
                  background: "#2E6BE8",
                  color: "#fff",
                  padding: "12px 13px",
                }}
                variant="contained"
                endIcon={<AddIcon size={20} />}
                onClick={handleOpen}
              >
                Create Basket
              </Button>
            </Box>
          </Box>
          <br />
          {show === 1 && (
            <Grid container spacing={1} sx={{ width: "100%" }}>
              {basketDetails.length > 0 &&
                basketDetails?.map((e) => (
                  <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                    <BasketCard e={e} />
                  </Grid>
                ))}
            </Grid>
          )}
          {show === 2 && (
            <Grid container spacing={1} sx={{ width: "100%" }}>
              {basket_details.map((e) => (
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <SubscriptionCard e={e} />
                </Grid>
              ))}
            </Grid>
          )}
          {show === 3 && (
            <Box sx={{ px: ".5%" }}>
              <MyDeploymentSearchBar />
              {[1, 2, 3].map((e) => (
                <>
                  <MyDeploymentCard />
                  <br />
                </>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
const mapStateToProps = (state) => ({
  basketDetails: state.Baskets.basketDetails,
});

export default connect(mapStateToProps, { get_basket_by_userId })(Basket);
