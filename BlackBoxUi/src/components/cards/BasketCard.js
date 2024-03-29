import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router";
import { primary_colors } from "../../controller/colors";
import moment from "moment/moment";
import { connect } from "react-redux";
import React, { useState } from "react";
import CreateBasket from "../modal/CreateBasket";
import AlertDialogBox from "../dialogBox/AlertDialogBox";
import { get_all_strategies_by_basketId } from "../../redux/action/strategyAction";

// ----------------------------------------------------------------------

function BasketCard({ e, get_all_strategies_by_basketId }) {
  const [open, setOpen] = useState(false);
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);

  const navigate = useNavigate();
  const {
    createdAt,
    basketId,
    basketName,
    type,
    totalStrategy,
    dropdown,
    capital,
  } = e;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = async () => {
    navigate("/BlackBox/basket/strategy", { state: basketId });
    sessionStorage.setItem("bId", basketId);
  };

  return (
    <React.Fragment>
      {open && (
        <CreateBasket open={open} handleClose={handleClose} updateBasket={e} />
      )}
      {isAlertDialogOpen && (
        <AlertDialogBox
          open={isAlertDialogOpen}
          setOpen={setAlertDialogOpen}
          basketId={basketId}
        />
      )}
      <Card
        sx={{ bgcolor: primary_colors.blue, px: "1%", borderRadius: "5px" }}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant="body2" sx={{ color: "white" }}>
            Created on :{" "}
            {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a") || "--"}
          </Typography>
          <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
            {basketName || "--"}
          </Typography>
          <Stack display={"flex"} flexDirection={"row"} my={1}>
            {type?.map((e, i) => (
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
          </Stack>
          <Typography variant="body2" sx={{ color: "white" }}>
            Total Strategy : {totalStrategy || "--"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Typography variant="caption" sx={{ color: "white" }}>
                Drawdown
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="caption" sx={{ color: "white" }}>
                min. captial
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Typography
                variant="body1"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                {dropdown || "--"}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography
                variant="body1"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                {capital || "--"}
              </Typography>
            </Grid>
          </Grid>
          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <IconButton onClick={() => setAlertDialogOpen(true)}>
                <AiFillDelete
                  size={20}
                  color="white"
                  style={{
                    background: "#1D3880",
                    padding: 3,
                    borderRadius: 10,
                  }}
                />
              </IconButton>
              <IconButton onClick={handleOpen}>
                <AiFillEdit
                  size={20}
                  color="white"
                  style={{
                    background: "#1D3880",
                    padding: 3,
                    marginLeft: 5,
                    borderRadius: 10,
                  }}
                />
              </IconButton>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{ bgcolor: "#15B642", height: 30, fontSize: 12 }}
              >
                Deploy
              </Button>

              <Button
                variant="contained"
                sx={{ bgcolor: "#2E6BE8", height: 30, fontSize: 12, ml: 1 }}
                onClick={handleClick}
              >
                Know more
              </Button>
            </Box>
          </Stack>
        </Box>
      </Card>
    </React.Fragment>
  );
}

export default connect(null, { get_all_strategies_by_basketId })(BasketCard);
